'use client'
import MenuIcon from '@mui/icons-material/Menu'
import {
  styled,
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { MouseEvent, useState } from 'react'

export function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <StyledAppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link href={'/'}>
            <StyledHomeTypography
              variant='h6'
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' }, // display: none on xs breakpoint
              }}
            >
              Dictionary
            </StyledHomeTypography>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              href='/vocabulary-books'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Vocabulary books
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => handleCloseNavMenu()}>
                <Link href={'/vocabulary-books'}>
                  <Typography textAlign='center'>Vocabulary books</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Link href={'/'}>
              <StyledHomeTypography
                variant='h5'
                noWrap
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                Dictionary
              </StyledHomeTypography>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  )
}

const StyledAppBar = styled(AppBar)`
  background-color: rgb(18, 18, 18);
`

const StyledHomeTypography = styled(Typography)`
  margin-right: 10px;
  font-family: monospace;
  font-weight: 700;
  letter-spacing: 0.3rem;
  color: white;
`
