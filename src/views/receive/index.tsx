import { QRCodeSVG } from "qrcode.react"
import { useEffect, useRef, useState } from "react"
import Toastify from "toastify-js"
import { Button } from "../../components/button"
import { Card } from "../../components/card"
import { getLatestEvent, getReceivePeerKey, sendEncryptedMessage, subscribe } from "../../lib/nostr"
import { debounce } from "../../lib/utils"
import { NostrEventType, NostrKeysType, NostrType } from "../../types"

type MessageProps = {
  message: string
  onChange: (x: string) => void
}

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

type ReceiveViewProps = {
  keys: NostrKeysType
}

export const ReceiveView = ({ keys }: ReceiveViewProps) => {
  const [peerKey, setPeerKey] = useState("")
  const [message, setMessage] = useState("")
  const events = useRef<{ [k: string]: NostrEventType } | null>(null)
  const nostr = useRef<NostrType | null>(null)

  const processEvent = (event: NostrEventType) => {
    events.current = { ...events.current, ...{ [event.id]: event } }
    setMessage(getLatestEvent(events?.current)?.message || "")
    setPeerKey(getReceivePeerKey(events.current) || "")
  }

  useEffect(() => {
    void (async () => {
      const sub = await subscribe(keys, peerKey, processEvent)
      nostr.current = { ...sub, ...keys }
      return () => {
        nostr?.current?.sub?.unsub()
      }
    })()
  }, [peerKey])

  const sendMessage = useRef(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    debounce(async (peerKey: string, message: string) => {
      if (nostr?.current?.pool) {
        await sendEncryptedMessage({ ...nostr.current, peerKey, message })
      }
    }, 500),
  ).current

  const onMessageChange = (message: string) => {
    setMessage(message)
    sendMessage(peerKey, message)
  }

  return (
    <div className="max-w-[64rem] m-auto">
      <Card>
        <div className="p-10">
          <div className="flex flex-col lg:flex-row">
            {peerKey === "" && (
              <div className="overflow-visible py-5 max-w-[20rem] mx-auto lg:pr-5">
                <QRCodeSVG
                  value={keys.pub}
                  level="H"
                  bgColor="transparent"
                  fgColor="#3C3744"
                  includeMargin={false}
                  width="100%"
                  height="100%"
                />
              </div>
            )}
            <div className="flex flex-col items-center justify-center w-full">
              <div>
                <label className="flex flex-grow text-left">My pubkey:</label>
                <div
                  id="mypubkey"
                  className="border-2 border-custom-black rounded-md p-2 bg-custom-green-dark break-all"
                >
                  {keys.pub}
                </div>
                <div className="py-6 max-w-[20rem] m-auto">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(keys.pub).catch(console.warn)
                      Toastify({
                        text: "Pubkey copied",
                        duration: 2000,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        stopOnFocus: false,
                        className:
                          "flex fixed bottom-0 bg-custom-black p-2 rounded left-[45%] z-50",
                      }).showToast()
                    }}
                  >
                    Copy Pubkey
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>{peerKey !== '' && <Message message={message} onChange={onMessageChange} />}</div>
        </div>
      </Card>
    </div>
  )
}
