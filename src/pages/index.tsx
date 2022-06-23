import React, { useState } from "react"
import Head from "next/head"

import { Header } from "../components/header"
import { Button } from "../components/button"
import { Card } from "../components/card"
import { SendView } from "../views/send"
import { ReceiveView } from "../views/receive"
import { NostrEventType, NostrType } from "../types"

type HomeProps = {
  nostr: NostrType
  event: NostrEventType
}

export default function Home({ nostr, event }: HomeProps) {
  const [clientType, setClientType] = useState("")

  const LandingView = () => (
    <div className="max-w-[64rem] m-auto">
      <Card>
        <div className="p-10">
          <h1 className="text-2xl text-bold pb-5">Open source e2e encrypted shared clipboard</h1>
          <p className="pb-10">
            Sendstr is an open source end-to-end encrypted shared clipboard app built on top of{" "}
            <a className="underline" href="https://github.com/nostr-protocol/nostr" target="_blank">
              Nostr
            </a>
            . No login needed, new throwaway encryption keys are generated on page load, and the
            default relay deletes messages after 1 hour. To get started open this page on another
            device and choose one of the options below.
          </p>
          <div className="flex w-full">
            <Button className="w-1/2 px-4" onClick={() => setClientType("send")}>
              Send
            </Button>
            <Button className="w-1/2 px-4" onClick={() => setClientType("receive")}>
              Receive
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  const Page = () => {
    switch (true) {
      case clientType === "send":
        return <SendView nostr={nostr} />
      case clientType === "receive":
        return <ReceiveView nostr={nostr} event={event} />
      default:
        return <LandingView />
    }
  }

  return (
    <>
      <Head>
        <title>Sendstr</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Sendstr is an open source end-to-end encrypted shared clipboard app
            built on top of Nostr. No login needed, new throwaway encryption keys are generated on
            page load, and the default relay deletes messages after 1 hour."
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
      </Head>
      <div className="bg-custom-green-dark min-h-screen">
        <div className="p-5">
          <div className="max-w-[80rem] mx-auto">
            <Header />
          </div>
          <main>
            <Page />
          </main>
        </div>
      </div>
    </>
  )
}
