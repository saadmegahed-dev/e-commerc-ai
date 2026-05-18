import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Grid, Divider } from '@mui/material';

const footerLinks = {
  Shop: [
    { label: 'All Products', path: '/shop' },
    { label: 'Timepieces', path: '/shop?category=watches' },
    { label: 'Jewelry', path: '/shop?category=jewelry' },
    { label: 'Accessories', path: '/shop?category=accessories' },
    { label: 'Fragrance', path: '/shop?category=fragrance' },
  ],
  Company: [
    { label: 'About', path: '/' },
    { label: 'AI Concierge', path: '/ai' },
    { label: 'Contact', path: '/profile' },
  ],
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '0.3em',
                mb: 2,
              }}
            >
              AETHER
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, lineHeight: 1.8 }}>
              Curated luxury for the discerning. Timeless pieces, exceptional craftsmanship.
            </Typography>
          </Grid>
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} md={2} key={title}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {links.map((link) => (
                  <Typography
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      transition: 'color 0.3s',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '0.05em' }}>
          © {new Date().getFullYear()} AETHER. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
