import { createRef, useState } from "react"
import { Button } from "../../components/button"
import { Card } from "../../components/card"
import { Header } from "../../components/header"
import {
  SettingsRelay,
  getRelays,
  addRelay,
  toggleRelay,
  removeRelay,
} from "../../lib/localStorage"
import { Input } from "../../components/input"
import { MdDelete } from "react-icons/md"
import { Toggle } from "../../components/toggle"
import Head from "next/head"

type SettingsState = {
  relays: SettingsRelay[]
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState>({
    relays: typeof window !== "undefined" ? getRelays() : [],
  })
  const newPool = createRef<HTMLInputElement>()

  return (
    <>
      <Head>
        <title>Sendstr - Settings</title>
        <meta name="title" content="Sendstr - Settings"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Sendstr is an open source end-to-end encrypted bi-directional clipboard app
            built on top of Nostr. No login needed, new throwaway encryption keys are generated on
            page load, and the default relay deletes messages after 1 hour."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sendstr.com/settings" />
        <meta property="og:title" content="Senstr - Settings" />
        <meta
          property="og:description"
          content="Sendstr is an open source end-to-end encrypted bi-directional clipboard app built on top of Nostr. No login needed, new throwaway encryption keys are generated on page load, and the default relay deletes messages after 1 hour."
        />
        <meta property="og:image" content="/favicon-16x16.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sendstr.com/settings" />
        <meta property="twitter:title" content="Sendstr - Settings" />
        <meta
          property="twitter:description"
          content="Sendstr is an open source end-to-end encrypted bi-directional clipboard app built on top of Nostr. No login needed, new throwaway encryption keys are generated on page load, and the default relay deletes messages after 1 hour."
        />
        <meta property="twitter:image" content="/favicon-16x16.png" />
      </Head>
      <div className="bg-custom-green-dark min-h-screen">
        <div className="p-5">
          <div className="max-w-[80rem] mx-auto">
            <Header />
            <main className="max-w-[64rem] m-auto">
              <Card>
                <div className="max-w-[30rem] m-auto p-10">
                  <h2 className="text-2xl pb-5">Relays</h2>
                  <ul>
                    {settings.relays.map((relay) => (
                      <li key={relay.url}>
                        <div className="m-auto flex items-center pb-3">
                          <Toggle
                            checked={relay.enabled}
                            onChange={() => {
                              toggleRelay(relay.url)
                              setSettings({
                                ...settings,
                                relays: getRelays(),
                              })
                            }}
                          />
                          <label className="lg:text-lg flex-grow text-center p-2 truncate">
                            {relay.url}
                          </label>
                          <button
                            onClick={() => {
                              removeRelay(relay.url)
                              setSettings({
                                ...settings,
                                relays: getRelays(),
                              })
                            }}
                          >
                            <MdDelete className="text-2xl" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Input className="pt-5" ref={newPool} placeholder="Relay url" />
                  <Button
                    className="pt-5"
                    onClick={() => {
                      addRelay({
                        url: newPool?.current?.value || "",
                        enabled: true,
                      })
                      setSettings({
                        ...settings,
                        relays: getRelays(),
                      })
                    }}
                  >
                    Add Relay
                  </Button>
                </div>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
