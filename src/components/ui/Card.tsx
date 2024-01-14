'use client'
import { Card as MuiCard, CardContent } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

type Props = {
  children: React.ReactNode
  width?: string
  height?: string
}

export function Card({ children, width, height }: Props) {
  const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            width: width,
            height: height,
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MuiCard>
        <CardContent>{children}</CardContent>
      </MuiCard>
    </ThemeProvider>
  )
}
