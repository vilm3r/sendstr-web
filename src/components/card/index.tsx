interface CardProps {
  children: React.ReactNode
}

export const Card = ({ children }: CardProps) => {
  return <div className="bg-custom-green-light rounded-xl shadow-md">{children}</div>
}
