import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@mui/material';
import {
  MenuIcon,
  CloseIcon,
  ShoppingBagOutlinedIcon,
  FavoriteBorderIcon,
  PersonOutlineIcon,
  AutoAwesomeIcon,
} from '../../icons';
import { useAppSelector } from '../../store/hooks';
import { selectCartCount } from '../../store/slices/cartSlice';
import { selectWishlistCount } from '../../store/slices/wishlistSlice';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'AI Concierge', path: '/ai' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <IconButton
            edge="start"
            sx={{ display: { md: 'none' }, mr: 1 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component={RouterLink}
            to="/"
            variant="h5"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 6 },
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '0.3em',
              fontWeight: 400,
              color: 'text.primary',
            }}
          >
            AETHER
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, flexGrow: 1 }}>
            {navLinks.map((link) => (
              <Typography
                key={link.path}
                component={RouterLink}
                to={link.path}
                variant="button"
                sx={{
                  color: isActive(link.path) ? 'primary.main' : 'text.secondary',
                  transition: 'color 0.3s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton component={RouterLink} to="/ai" size="small">
              <AutoAwesomeIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton component={RouterLink} to="/wishlist" size="small">
              <Badge badgeContent={wishlistCount} color="primary">
                <FavoriteBorderIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
            <IconButton component={RouterLink} to="/cart" size="small">
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingBagOutlinedIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
            <IconButton component={RouterLink} to="/profile" size="small">
              <PersonOutlineIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: 'background.paper' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', letterSpacing: '0.2em' }}>
            AETHER
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {[...navLinks, { label: 'Wishlist', path: '/wishlist' }, { label: 'Cart', path: '/cart' }, { label: 'Profile', path: '/profile' }].map((link) => (
            <ListItem
              key={link.path}
              component={RouterLink}
              to={link.path}
              onClick={() => setDrawerOpen(false)}
              sx={{
                borderLeft: isActive(link.path) ? '2px solid' : '2px solid transparent',
                borderColor: 'primary.main',
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ variant: 'button' }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
