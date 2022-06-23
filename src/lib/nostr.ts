import { getRelays } from "./localStorage"
import { NostrEventType, NostrKeysType, NostrPoolType } from "../types"

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
  const { decrypt } = await import("nostr-tools/nip04")
  const { relayPool } = await import("nostr-tools")
  const pool = relayPool()
  pool.setPrivateKey(keys.priv)
  const relays = getRelays()
  relays.forEach((relay) => relay.enabled && pool.addRelay(relay.url, { read: true, write: true }))
  const sub = pool.sub({
    cb: (event: NostrEventType) => {
      try {
        const p = event.tags.find(([tag]) => tag === "p") || ["p", ""]
        const pubkey = event.pubkey === keys.pub ? p[1] : event.pubkey
        const message = decrypt(keys.priv, pubkey, event.content)
        cb({ ...event, message })
      } catch (e) {
        console.warn(e)
      }
    },
    filter: [{ "#p": [keys.pub, peerKey] }, { authors: [keys.pub, peerKey] }],
  })
  return { sub, pool }
}

type SendEncryptedMessage = {
  pool: NostrPoolType | null
  priv: string
  pub: string
  peerKey: string
  message: string
}

export const sendEncryptedMessage = async ({
  pool,
  priv,
  pub,
  peerKey,
  message,
}: SendEncryptedMessage) => {
  const { encrypt } = await import("nostr-tools/nip04")
  return pool?.publish({
    pubkey: pub,
    created_at: Math.round(Date.now() / 1000),
    kind: 4,
    tags: [["p", peerKey]],
    content: encrypt(priv, peerKey, message),
  })
}
