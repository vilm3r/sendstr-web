import { ChangeEvent, forwardRef, LegacyRef } from "react"

export interface InputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement> | undefined) => void
  value?: string
  placeholder?: string
  className?: string
}

export const Input = forwardRef(
  (
    { onChange, value, placeholder, className }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined,
  ) => {
    return (
      <div className={className}>
        <input
          className="border-2 border-custom-black rounded w-full p-3"
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    )
  },
)
