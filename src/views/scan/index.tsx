import { MdClose } from "react-icons/md"
import { QrReader } from "../../components/qr-reader"

interface ScanViewProps {
  close: () => void
  onScan: (x: string) => void
}

export const ScanView = ({ close, onScan }: ScanViewProps) => {
  return (
    <div className="bg-black h-screen w-screen fixed top-0 left-0 z-50 flex justify-center">
      <QrReader onResult={onScan} />
      <div className="absolute text-black top-0 right-0">
        <button className="bg-white rounded-3xl p-2 m-2" onClick={close}>
          <MdClose size="1rem" />
        </button>
      </div>
    </div>
  )
}
