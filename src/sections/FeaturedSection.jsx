import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { ArrowForwardIcon } from '../icons';
import AnimatedSection from '../components/common/AnimatedSection';
import ProductGrid from '../components/product/ProductGrid';
import { useFeaturedProducts } from '../hooks/useProducts';

export default function FeaturedSection() {
  const featured = useFeaturedProducts();

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <AnimatedSection>
          <Grid container spacing={4} alignItems="flex-end" sx={{ mb: 6 }}>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Curated Selection
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
                Featured Pieces
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Button
                component={RouterLink}
                to="/shop"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: 'primary.main' }}
              >
                View All
              </Button>
            </Grid>
          </Grid>
        </AnimatedSection>
        <ProductGrid products={featured} />
      </Container>
    </Box>
  );
}
