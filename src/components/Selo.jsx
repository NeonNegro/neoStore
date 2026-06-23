function Selo({ children, tone = 'default' }) {
  return <span className={`selo selo--${tone}`}>{children}</span>
}

export default Selo
