import { QRCodeSVG } from "qrcode.react"
import Toastify from "toastify-js"
import { Button } from "../../components/button"
import { Card } from "../../components/card"
import { NostrEventType, NostrType } from "../../types"

const Message = ({ event }: { event: NostrEventType }) => {
  return (
    <p className="bg-custom-green-dark border-2 border-custom-black rounded w-full p-3 whitespace-pre-wrap">
      {event.message}
    </p>
  )
}

type ReceiveViewProps = {
  nostr: NostrType
  event: NostrEventType
}

export const ReceiveView = ({ nostr, event }: ReceiveViewProps) => {
  return (
    <div className="max-w-[64rem] m-auto">
      <Card>
        <div className="p-10">
          <div className="flex flex-col lg:flex-row">
            {!event && (
              <div className="overflow-visible py-5 max-w-[20rem] mx-auto lg:pr-5">
                <QRCodeSVG
                  value={nostr.pub}
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
                  {nostr.pub}
                </div>
                <div className="py-6 max-w-[20rem] m-auto">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(nostr.pub).catch(console.warn)
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
          <div>{event && <Message event={event} />}</div>
        </div>
      </Card>
    </div>
  )
}
