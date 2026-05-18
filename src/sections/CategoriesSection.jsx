import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import AnimatedSection from '../components/common/AnimatedSection';
import { categories } from '../data/categories';

export default function CategoriesSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <AnimatedSection sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Collections
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
            Shop by Category
          </Typography>
        </AnimatedSection>

        <Grid container spacing={3}>
          {categories.map((cat, i) => (
            <Grid item xs={12} sm={6} md={3} key={cat.id}>
              <AnimatedSection delay={i * 0.1}>
                <Card
                  component={RouterLink}
                  to={`/shop?category=${cat.id}`}
                  sx={{
                    display: 'block',
                    color: 'inherit',
                    overflow: 'hidden',
                    '&:hover .cat-image': { transform: 'scale(1.06)' },
                  }}
                >
                  <CardMedia
                    className="cat-image"
                    component="img"
                    height="280"
                    image={cat.image}
                    alt={cat.name}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      {cat.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
