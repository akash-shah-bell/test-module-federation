import React from "react";

export interface ButtonProps {
  title: string
  onClick?: () => void
}
export type ButtonPropsType = {
  title: string
  onClick?: () => void
}

export const Button2 = (props: ButtonProps) => {
  const onClick = () => props?.onClick && props?.onClick()
  return <button onClick={onClick}>{props.title}</button>
}