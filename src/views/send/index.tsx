import dynamic from "next/dynamic"

import { useEffect, useRef, useState } from "react"
import { isMobile } from "react-device-detect"
import { Input } from "../../components/input"
import { MdQrCodeScanner } from "react-icons/md"
import { IconButton } from "../../components/icon-button"
import { Card } from "../../components/card"
import { debounce } from "../../lib/utils"
import { NostrEventType, NostrKeysType, NostrType } from "../../types"
import { subscribe, sendEncryptedMessage, getLatestEvent } from "../../lib/nostr"

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
            <div className="m-2">
              <MdQrCodeScanner size="100%" />
            </div>
          </IconButton>
        </div>
      </div>
    </section>
  )
}

export type SendViewProps = {
  keys: NostrKeysType
}

export const SendView = ({ keys }: SendViewProps) => {
  const [showScan, setShowScan] = useState(false)
  const [peerKey, setPeerKey] = useState("")
  const [message, setMessage] = useState("")
  const events = useRef<{ [k: string]: NostrEventType } | null>(null)
  const nostr = useRef<NostrType | null>(null)

  const ScanView = dynamic(async () => (await import("../scan")).ScanView)

  const processEvent = (event: NostrEventType) => {
    events.current = { ...events.current, ...{ [event.id]: event } }
    setMessage(getLatestEvent(events?.current)?.message || "")
  }

  useEffect(() => {
    void (async () => {
      if (isMobile) {
        setShowScan(true)
      }
      const sub = await subscribe(keys, peerKey, processEvent)
      nostr.current = { ...sub, ...keys }
      return () => {
        nostr?.current?.sub?.unsub()
      }
    })()
  }, [])

  const sendMessage = useRef(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    debounce(async (peerKey: string, message: string) => {
      if (nostr.current?.pool) {
        await sendEncryptedMessage({ ...nostr.current, peerKey, message })
      }
    }, 500),
  ).current

  const onMessageChange = (message: string) => {
    setMessage(message)
    sendMessage(peerKey, message)
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
            {isValidPeerKey(peerKey) && <Message message={message} onChange={onMessageChange} />}
          </div>
        </Card>
      </div>
    </div>
  )
}
