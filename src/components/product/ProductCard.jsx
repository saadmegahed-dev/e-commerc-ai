import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import {
  FavoriteBorderIcon,
  FavoriteIcon,
  AddShoppingCartIcon,
} from '../../icons';
import { motion } from 'framer-motion';
import { formatPrice } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { useIsInWishlist, useWishlist } from '../../hooks/useWishlist';

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { toggle } = useWishlist();
  const inWishlist = useIsInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  return (
    <Card
      component={motion.div}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        component={RouterLink}
        to={`/product/${product.id}`}
        sx={{ display: 'block', color: 'inherit' }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="320"
            image={product.image}
            alt={product.name}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
              '.MuiCard-root:hover &': { transform: 'scale(1.04)' },
            }}
          />
          {product.tags?.length > 0 && (
            <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 0.5 }}>
              {product.tags.slice(0, 1).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(10,10,10,0.7)',
                    color: 'primary.main',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    height: 22,
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
        <CardContent sx={{ pt: 2.5, pb: '16px !important' }}>
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            {product.category}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, mb: 1, fontSize: '1rem' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="primary.main">
            {formatPrice(product.price)}
          </Typography>
        </CardContent>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 12,
          display: 'flex',
          gap: 0.5,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          '.MuiCard-root:hover &': { opacity: 1 },
        }}
      >
        <IconButton
          size="small"
          onClick={handleToggleWishlist}
          sx={{
            bgcolor: 'rgba(10,10,10,0.8)',
            '&:hover': { bgcolor: 'rgba(10,10,10,0.95)' },
          }}
        >
          {inWishlist ? (
            <FavoriteIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 18 }} />
          )}
        </IconButton>
        <IconButton
          size="small"
          onClick={handleAddToCart}
          sx={{
            bgcolor: 'rgba(10,10,10,0.8)',
            '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' },
          }}
        >
          <AddShoppingCartIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Card>
  );
}
