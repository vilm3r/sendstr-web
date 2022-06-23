import "../styles/global.css"
import { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { getRelays } from "../lib/localStorage"
import { NostrEventType, NostrType } from "../types"

export default function App({ Component, pageProps }: AppProps) {
  const [events, setEvents] = useState<{ [k: string]: NostrEventType }>({})
  const [nostr, setNostr] = useState<NostrType>({
    priv: "",
    pub: "",
    pool: null,
    sub: null,
  })

  const updateEvents = async (pub: string, priv: string, event: NostrEventType) => {
    const { decrypt } = await import("nostr-tools/nip04")
    try {
      const p = event.tags.find(([tag]) => tag === "p") || ["p", ""]
      const pubkey = event.pubkey === pub ? p[1] : event.pubkey
      const message = decrypt(priv, pubkey, event.content)
      setEvents({
        ...events,
        ...{
          [event.id]: {
            ...event,
            message,
          },
        },
      })
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    let sub: {
      unsub: () => void
    }
    void (async () => {
      const { generatePrivateKey, relayPool, getPublicKey } = await import("nostr-tools")
      const priv = generatePrivateKey()
      const pub = getPublicKey(priv)
      const pool = relayPool()
      pool.setPrivateKey(priv)
      const relays = getRelays()
      relays.forEach(
        (relay) => relay.enabled && pool.addRelay(relay.url, { read: true, write: true }),
      )
      sub = pool.sub({
        cb: (event: NostrEventType) => updateEvents(pub, priv, event),
        filter: [{ "#p": [pub] }],
      })
      setNostr({ priv, pub, pool, sub })
    })()

    return () => {
      sub.unsub()
    }
  }, [])

  const getLatestEvent = (events: Record<string, NostrEventType>) =>
    Object.entries(events).reduce((acc, x) => {
      if (acc === null) return x[1]
      if (new Date(acc.created_at) < new Date(x[1].created_at)) return x[1]
      return acc
    }, null as NostrEventType | null)

  return <Component {...{ ...pageProps, nostr, event: getLatestEvent(events) }} />
}
