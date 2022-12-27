import { getRelays } from "./localStorage"
import { NostrEventType, NostrKeysType, NostrPoolType } from "../types"
import { Relay, Sub } from "nostr-tools"

export const getLatestEvent = (events: Record<string, NostrEventType>) =>
  Object.entries(events).reduce((acc, x) => {
    if (acc === null) return x[1]
    if (new Date(acc.created_at) < new Date(x[1].created_at)) return x[1]
    return acc
  }, null as NostrEventType | null)

export const getReceivePeerKey = (events: Record<string, NostrEventType>) =>
  Object.entries(events).reduce((acc, x) => {
    if (acc === null) return x[1]
    if (new Date(acc.created_at) > new Date(x[1].created_at)) return x[1]
    return acc
  }, null as NostrEventType | null)?.pubkey

export const subscribe = async (
  keys: NostrKeysType,
  peerKey: string,
  cb: (event: NostrEventType) => void,
) => {
  const { nip04, relayInit } = await import("nostr-tools")
  const relays = getRelays()
    .filter((x) => x.enabled)
    .map((x) => relayInit(x.url))
  await Promise.allSettled(relays.map((x) => x.connect()))
  relays.forEach((relay) =>
    relay.on("error", () => console.error(`Failed to connect to relay ${relay.url}`)),
  )
  const subs = relays.map((relay) =>
    relay.sub([{ "#p": [keys.pub, peerKey] }, { authors: [keys.pub, peerKey] }]),
  )
  subs.forEach((x) =>
    x.on("event", async (event: NostrEventType) => {
      const p = event.tags.find(([tag]) => tag === "p") || ["p", ""]
      const pubkey = event.pubkey === keys.pub ? p[1] : event.pubkey
      const message = await nip04.decrypt(keys.priv, pubkey, event.content)
      cb({ ...event, message })
    }),
  )
  return { subs, relays }
}

type SendEncryptedMessage = {
  relays: Relay[]
  subs: Sub[]
  priv: string
  pub: string
  peerKey: string
  message: string
}

export const sendEncryptedMessage = async ({
  relays,
  priv,
  pub,
  peerKey,
  message,
}: SendEncryptedMessage) => {
  const { nip04, getEventHash, signEvent } = await import("nostr-tools")
  relays.map((relay) => {
    nip04
      .encrypt(priv, peerKey, message)
      .then((content) => {
        const event = {
          pubkey: pub,
          created_at: Math.round(Date.now() / 1000),
          kind: 4,
          tags: [["p", peerKey]],
          content,
        }
        const id = getEventHash(event)
        const sig = signEvent(event, priv)
        relay.publish({ ...event, id, sig })
      })
      .catch((e) => console.error(`Failed to send message to relay ${relay.url}`, e))
  })
}
