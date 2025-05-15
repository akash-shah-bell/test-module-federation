export interface ButtonProps {
  title: string
  onClick?: () => void
}

const Button = (props: ButtonProps) => {
  const onClick = () => props?.onClick && props?.onClick()
  return <button onClick={onClick}>{props.title}</button>
}

export default Button