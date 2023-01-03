import { createRef, useEffect, useState } from "react"
import { Button } from "../../components/button"
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
import { useTheme } from "next-themes"

type SettingsState = {
  relays: SettingsRelay[]
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState>({
    relays: typeof window !== "undefined" ? getRelays() : [],
  })
  const newPool = createRef<HTMLInputElement>()
  const { theme, systemTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const ThemeToggle = () => {
    if (!mounted) return null

    const currentTheme = theme === "system" ? systemTheme : theme
    const isDark = currentTheme === "dark"

    const toggleHandler = () => setTheme(isDark ? "light" : "dark")

    return (
      <div onClick={toggleHandler} className="cursor-pointer">
        <h2 className="text-2xl pb-5">Theme</h2>
        <div className="flex justify-between">
          <p className="lg:text-lg">Dark mode</p>
          <div className="flex justify-center">
            <div>
              <div className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={isDark}
                  readOnly
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary focus:outline-none peer-focus-visible:ring-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Sendstr - Settings</title>
        <meta name="title" content="Sendstr - Settings" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Sendstr is an open source end-to-end encrypted bi-directional clipboard app
            built on top of Nostr. No login needed, new throwaway encryption keys are generated on
            page load, and the default relay deletes messages after 1 hour."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sendstr.com/settings" />
        <meta property="og:title" content="Sendstr - Settings" />
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
      <div className="min-h-screen">
        <div className="p-5">
          <div className="max-w-[80rem] mx-auto">
            <Header />
            <main className="max-w-[64rem] m-auto">
              <div className="max-w-[30rem] m-auto p-10">
                <div className="pb-10">
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
                    className="pt-5 shadow-lg"
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
                <div className="pt-10">
                  <ThemeToggle />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
