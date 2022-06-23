import "../styles/global.css"
import { AppProps } from "next/app"
import { useEffect, useState } from "react"
// import { getRelays } from "../lib/localStorage"
// import { NostrEventType, NostrType } from "../types"

export default function App({ Component, pageProps }: AppProps) {
  // const [events, setEvents] = useState<{ [k: string]: NostrEventType }>({})
  // const [nostr, setNostr] = useState<NostrType>({
  //   priv: "",
  //   pub: "",
  //   pool: null,
  //   sub: null,
  // })
  const [keys, setKeys] = useState<{
    pub: string
    priv: string
  } | null>(null)

  // const updateEvents = async (pub: string, priv: string, event: NostrEventType) => {
  //   const { decrypt } = await import("nostr-tools/nip04")
  //   try {
  //     const p = event.tags.find(([tag]) => tag === "p") || ["p", ""]
  //     const pubkey = event.pubkey === pub ? p[1] : event.pubkey
  //     const message = decrypt(priv, pubkey, event.content)
  //     setEvents({
  //       ...events,
  //       ...{
  //         [event.id]: {
  //           ...event,
  //           message,
  //         },
  //       },
  //     })
  //   } catch (e) {
  //     console.warn(e)
  //   }
  // }

  useEffect(() => {
    void (async () => {
      const { generatePrivateKey, getPublicKey } = await import("nostr-tools")
      const priv = generatePrivateKey()
      const pub = getPublicKey(priv)
      setKeys({ priv, pub })
    })()
  }, [])

  // const getLatestEvent = (events: Record<string, NostrEventType>) =>
  //   Object.entries(events).reduce((acc, x) => {
  //     if (acc === null) return x[1]
  //     if (new Date(acc.created_at) < new Date(x[1].created_at)) return x[1]
  //     return acc
  //   }, null as NostrEventType | null)

  return <Component {...{ ...pageProps, keys }} />
}
