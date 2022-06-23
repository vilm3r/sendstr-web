type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export const Button = ({ children, disabled, onClick, className }: ButtonProps) => {
  return (
    <div className={className}>
      <button
        className="bg-custom-black rounded-md px-6 py-3 w-full h-full shadow"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  )
}
