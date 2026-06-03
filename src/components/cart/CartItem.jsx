import { Box, Typography, IconButton, Divider } from '@mui/material';
import { DeleteOutlineIcon, AddIcon, RemoveIcon } from '../../icons';
import { formatPrice } from '../../data/products';

export default function CartItem({ item, onUpdate, onRemove }) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdate(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdate(item.id, item.quantity + 1);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        gap: 3,
        py: 3,
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src={item.image}
        alt={item.name}
        sx={{
          width: 100,
          height: 120,
          objectFit: 'cover',
          bgcolor: 'background.default',
          borderRadius: '6px',
        }}
      />

      {/* Product Info */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            {item.category}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '1rem', mb: 1 }}>
            {item.name}
          </Typography>

          <Typography variant="body2" color="primary.main">
            {formatPrice(item.price)}
          </Typography>
        </Box>

        {/* Quantity Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={handleDecrease}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <RemoveIcon sx={{ fontSize: 16 }} />
          </IconButton>

          {/* Quantity Display */}
          <Typography
            sx={{
              width: 32,
              textAlign: 'center',
              fontSize: '0.9rem',
            }}
          >
            {item.quantity}
          </Typography>

          <IconButton
            size="small"
            onClick={handleIncrease}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <AddIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Price + Delete */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <IconButton size="small" onClick={() => onRemove(item.id)}>
          <DeleteOutlineIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Typography variant="body1" color="primary.main">
          {formatPrice(item.price * item.quantity)}
        </Typography>
      </Box>

      <Divider
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </Box>
  );
}