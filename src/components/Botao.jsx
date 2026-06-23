function Botao({
  children,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  variant = 'primary',
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`botao botao--${variant} ${className}`.trim()}
    >
      {children}
    </button>
  )
}

export default Botao
