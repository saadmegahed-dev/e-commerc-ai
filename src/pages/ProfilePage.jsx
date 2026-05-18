import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  PersonOutlineIcon,
  ShoppingBagOutlinedIcon,
  FavoriteBorderIcon,
  AutoAwesomeIcon,
} from '../icons';
import { Link as RouterLink } from 'react-router-dom';
import AnimatedSection from '../components/common/AnimatedSection';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatPrice } from '../data/products';

export default function ProfilePage() {
  const { count: cartCount, total } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [profile, setProfile] = useState({
    name: 'Guest Member',
    email: 'guest@aether.com',
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  const quickLinks = [
    { icon: <ShoppingBagOutlinedIcon />, label: 'Cart', path: '/cart', detail: `${cartCount} items · ${formatPrice(total)}` },
    { icon: <FavoriteBorderIcon />, label: 'Wishlist', path: '/wishlist', detail: `${wishlistCount} saved items` },
    { icon: <AutoAwesomeIcon />, label: 'AI Concierge', path: '/ai', detail: 'Personal shopping assistant' },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <AnimatedSection sx={{ mb: 6, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              bgcolor: 'secondary.main',
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
            {profile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.email}
          </Typography>
        </AnimatedSection>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ letterSpacing: '0.1em' }}>
                  Account Details
                </Typography>
                <Button size="small" onClick={() => (editing ? handleSave() : setEditing(true))}>
                  {editing ? 'Save' : 'Edit'}
                </Button>
              </Box>
              {editing ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    size="small"
                  />
                  <TextField
                    label="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    size="small"
                  />
                </Box>
              ) : (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Name
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {profile.email}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ mb: 2, letterSpacing: '0.1em' }}>
                Quick Access
              </Typography>
              <List disablePadding>
                {quickLinks.map((link, i) => (
                  <Box key={link.path}>
                    <ListItem
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        px: 0,
                        color: 'inherit',
                        transition: 'color 0.3s',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                        {link.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={link.label}
                        secondary={link.detail}
                        primaryTypographyProps={{ variant: 'body1' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                    {i < quickLinks.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
