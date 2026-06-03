import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import AnimatedSection from '../components/common/AnimatedSection';
import ProductGrid from '../components/product/ProductGrid';
import { useWishlist } from '../hooks/useWishlist';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <AnimatedSection sx={{ mb: 6 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Saved Items
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
            Wishlist ({items.length})
          </Typography>
        </AnimatedSection>

        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <AnimatedSection sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 400, fontSize: '1.4rem' }}>
              No saved items yet
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Save pieces you love by clicking the heart icon.
            </Typography>
            <Button  component={RouterLink} to="/shop" variant="contained" sx={{borderRadius:"8px"}}>
              Explore Collection
            </Button>
          </AnimatedSection>
        )}
      </Container>
    </Box>
  );
}
