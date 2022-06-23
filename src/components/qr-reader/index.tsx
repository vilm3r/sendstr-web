import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser"
import { useEffect, useRef } from "react"

export const QrReader = ({ onResult }: { onResult: (result: string) => void }) => {
  const controlsRef = useRef<IScannerControls | null>(null)

  const constraints = {
    video: {
      facingMode: {
        ideal: "environment",
      },
    },
  }

  useEffect(() => {
    const reader = new BrowserQRCodeReader(undefined, {
      delayBetweenScanAttempts: 300,
    })

    reader
      .decodeFromConstraints(constraints, "video", (result, error, controls) => {
        controlsRef.current = controls
        if (result) {
          controls.stop()
          onResult(result.getText())
        }
      })
      .catch(console.warn)
    return () => controlsRef?.current?.stop()
  }, [])

  return <video id="video"></video>
}
