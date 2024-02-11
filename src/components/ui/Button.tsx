import { Button as MuiButton } from '@mui/material'
import { ReactNode, MouseEvent } from 'react'

type Props = {
  children: ReactNode | string
  variant?: 'text' | 'outlined' | 'contained'
  startIcon?: ReactNode
  endIcon?: ReactNode
  size?: 'small' | 'medium' | 'large'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

export function Button({
  children,
  variant,
  startIcon,
  endIcon,
  size,
  color,
  disabled,
  onClick,
  type,
  href,
}: Props) {
  return (
    <MuiButton
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
      color={color}
      disabled={disabled}
      onClick={onClick}
      type={type}
      href={href}
    >
      {children}
    </MuiButton>
  )
}
