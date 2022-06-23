import dynamic from "next/dynamic"

import { useEffect, useRef, useState } from "react"
import { isMobile } from "react-device-detect"
import { Input } from "../../components/input"
import { MdQrCodeScanner } from "react-icons/md"
import { IconButton } from "../../components/icon-button"
import { Card } from "../../components/card"
import { debounce } from "../../lib/utils"
import { NostrType } from "../../types"

type MessageProps = {
  message: string
  onChange: (x: string) => void
}

const isValidPeerKey = (peerKey: string) => peerKey.length === 64

const Message = ({ message, onChange }: MessageProps) => {
  return (
    <section className="p-4">
      <div className="border-0">
        <textarea
          className="bg-custom-green-dark border-2 border-custom-black rounded w-full min-h-[100px] max-h-[700px]"
          value={message}
          onChange={(e) => onChange(e.currentTarget.value || "")}
        />
      </div>
    </section>
  )
}

type PeerInputProps = {
  peerKey: string
  onChange: (x: string) => void
  setShowScan: (x: boolean) => void
}

const PeerInput = ({ peerKey, onChange, setShowScan }: PeerInputProps) => {
  return (
    <section className="mx-auto max-w-[40rem] p-4">
      <label>Peer pubkey:</label>
      <div className="relative">
        <Input value={peerKey} onChange={(e) => onChange(e?.currentTarget?.value || "")} />
        <div className="absolute right-0 top-0 h-full flex items-center">
          <IconButton className="w-10 h-10 mr-2" onClick={() => setShowScan(true)}>
            <div className="">
              <MdQrCodeScanner width="100%" height="auto" />
            </div>
          </IconButton>
        </div>
      </div>
    </section>
  )
}

export type SendViewProps = {
  nostr: NostrType
}

export const SendView = ({ nostr }: SendViewProps) => {
  const [showScan, setShowScan] = useState(false)
  const [peerKey, setPeerKey] = useState("")
  const [message, setMessage] = useState("")

  const ScanView = dynamic(async () => (await import("../scan")).ScanView)

  useEffect(() => {
    if (isMobile) {
      setShowScan(true)
    }
  }, [])

  const sendNostrMessage = useRef(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    debounce(async (m: string, p: string, n: NostrType) => {
      try {
        const { encrypt } = await import("nostr-tools/nip04")
        await n.pool?.publish({
          pubkey: n.pub,
          created_at: Math.round(Date.now() / 1000),
          kind: 4,
          tags: [["p", p]],
          content: encrypt(n.priv, p, m),
        })
      } catch (e) {
        console.warn(e)
      }
    }, 750),
  ).current

  const sendMessage = (message: string) => {
    setMessage(message)
    sendNostrMessage(message, peerKey, nostr)
  }

  return (
    <div>
      {showScan && (
        <ScanView
          close={() => setShowScan(false)}
          onScan={(x: string) => {
            setShowScan(false)
            setPeerKey(x)
          }}
        />
      )}
      <div className="mx-auto max-w-[64rem] flex flex-col gap-5">
        <Card>
          <div className="p-4">
            <PeerInput peerKey={peerKey} setShowScan={setShowScan} onChange={setPeerKey} />
            {isValidPeerKey(peerKey) && <Message message={message} onChange={sendMessage} />}
          </div>
        </Card>
      </div>
    </div>
  )
}
