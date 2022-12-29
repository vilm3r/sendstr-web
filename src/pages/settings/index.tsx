import { createRef, useEffect, useState } from "react"
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

    let content: JSX.Element
    const currentTheme = theme === "system" ? systemTheme : theme
    const isDark = currentTheme === "dark"

    const toggleHandler = () => setTheme(isDark ? "light" : "dark")

    if (isDark) {
      content = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <title>Theme toggle</title>
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      )
    } else {
      content = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <title>Theme toggle</title>
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      )
    }

    return (
      <div onClick={toggleHandler} className="cursor-pointer">
        <h2 className="text-2xl pb-5">Light mode</h2>
        <div className="flex justify-between primary-hover">
          <p className="lg:text-lg">Toggle</p>
          {content}
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
