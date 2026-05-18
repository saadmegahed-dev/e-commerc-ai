import {
  Box,
  Typography,
  IconButton,
  TextField,
  Divider,
} from '@mui/material';
import { DeleteOutlineIcon, AddIcon, RemoveIcon } from '../../icons';
import { formatPrice } from '../../data/products';

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <Box sx={{ position: 'relative', display: 'flex', gap: 3, py: 3 }}>
      <Box
        component="img"
        src={item.image}
        alt={item.name}
        sx={{
          width: 100,
          height: 120,
          objectFit: 'cover',
          bgcolor: 'background.default',
        }}
      />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            {item.category}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '1rem', mb: 1 }}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="primary.main">
            {formatPrice(item.price)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => onUpdate(item.id, item.quantity - 1)}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <RemoveIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <TextField
            value={item.quantity}
            size="small"
            inputProps={{
              readOnly: true,
              style: { textAlign: 'center', width: 32, padding: '4px 0' },
            }}
            sx={{ width: 56 }}
          />
          <IconButton
            size="small"
            onClick={() => onUpdate(item.id, item.quantity + 1)}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <AddIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <IconButton size="small" onClick={() => onRemove(item.id)}>
          <DeleteOutlineIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Typography variant="body1" color="primary.main">
          {formatPrice(item.price * item.quantity)}
        </Typography>
      </Box>
      <Divider sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </Box>
  );
}
