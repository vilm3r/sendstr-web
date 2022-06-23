import { forwardRef, LegacyRef } from "react"

type IconButtonProps = {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export const IconButton = forwardRef(
  (
    { children, onClick, className }: IconButtonProps,
    ref: LegacyRef<HTMLButtonElement> | undefined,
  ) => {
    return (
      <div className={className}>
        <button
          ref={ref}
          className="bg-custom-black w-full h-full rounded-lg flex justify-center items-center"
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    )
  },
)
