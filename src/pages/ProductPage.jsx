import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Breadcrumbs,
} from '@mui/material';
import { FavoriteBorderIcon, FavoriteIcon, ArrowBackIcon } from '../icons';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/common/AnimatedSection';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useIsInWishlist, useWishlist } from '../hooks/useWishlist';
import { formatPrice } from '../data/products';

export default function ProductPage() {
  const { product } = useProduct();
  const { add } = useCart();
  const { toggle } = useWishlist();
  const inWishlist = useIsInWishlist(product?.id);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Product not found
        </Typography>
        <Button component={RouterLink} to="/shop" startIcon={<ArrowBackIcon />}>
          Back to Shop
        </Button>
      </Container>
    );
  }

  const images = product.images || [product.image];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 4 }}>
          <Typography component={RouterLink} to="/shop" variant="body2" color="text.secondary">
            Shop
          </Typography>
          <Typography variant="body2" color="text.primary">
            {product.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={7}>
            <AnimatedSection>
              <Box
                component={motion.img}
                key={activeImage}
                src={images[activeImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                sx={{
                  width: '100%',
                  height: { xs: 400, md: 560 },
                  objectFit: 'cover',
                  bgcolor: 'background.paper',
                }}
              />
              {images.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                  {images.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      alt=""
                      onClick={() => setActiveImage(i)}
                      sx={{
                        width: 72,
                        height: 88,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        opacity: activeImage === i ? 1 : 0.5,
                        border: '1px solid',
                        borderColor: activeImage === i ? 'primary.main' : 'divider',
                        transition: 'all 0.3s',
                      }}
                    />
                  ))}
                </Box>
              )}
            </AnimatedSection>
          </Grid>

          <Grid item xs={12} md={5}>
            <AnimatedSection delay={0.15}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {product.category}
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 2 }}>
                {product.name}
              </Typography>
              <Typography variant="h4" color="primary.main" sx={{ mb: 3, fontWeight: 400 }}>
                {formatPrice(product.price)}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                {product.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => add(product)}
                  sx={{ flex: 1 }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  onClick={() => toggle(product)}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 0,
                    width: 52,
                    height: 52,
                  }}
                >
                  {inWishlist ? (
                    <FavoriteIcon color="primary" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>

              <Box sx={{ pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Complimentary worldwide shipping · 30-day returns · Certificate of authenticity
                </Typography>
              </Box>
            </AnimatedSection>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
