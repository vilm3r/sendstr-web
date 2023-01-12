type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export const Button = ({ children, disabled, onClick, className }: ButtonProps) => {
  return (
    <div className={className}>
      <button className="btn-main" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  )
}
