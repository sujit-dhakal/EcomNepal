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
      className={`py-4 px-12 rounded bg-[#DB4444] hover:bg-[#E07575] text-base font-medium text-[#FAFAFA] ${className}`}
    >
      {text}
    </button>
  )
}

export default Button