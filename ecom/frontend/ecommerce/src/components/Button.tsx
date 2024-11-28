interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'submit',
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-20 h-6 rounded bg-black hover:bg-opacity-70 text-xs font-medium text-[#FAFAFA] ${className}`}
    >
      {text}
    </button>
  )
}

export default Button