import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import AnimatedSection from '../components/common/AnimatedSection';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../data/products';

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    clear();
    setTimeout(() => navigate('/'), 4000);
  };

  if (items.length === 0 && !submitted) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Nothing to checkout
        </Typography>
        <Button component={RouterLink} to="/shop" variant="contained">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  if (submitted) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <AnimatedSection>
          <Alert severity="success" sx={{ mb: 4, justifyContent: 'center' }}>
            Order placed successfully. Thank you for choosing AETHER.
          </Alert>
          <Typography variant="h3" sx={{ mb: 2, fontSize: '1.8rem' }}>
            Order Confirmed
          </Typography>
          <Typography color="text.secondary">
            A confirmation email will be sent to {form.email}.
          </Typography>
        </AnimatedSection>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <AnimatedSection sx={{ mb: 6 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Secure Checkout
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
            Complete Your Order
          </Typography>
        </AnimatedSection>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper
              component="form"
              onSubmit={handleSubmit}
              elevation={0}
              sx={{ p: { xs: 3, md: 4 }, border: '1px solid', borderColor: 'divider' }}
            >
              <Typography variant="h6" sx={{ mb: 3, letterSpacing: '0.1em' }}>
                Shipping Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" name="firstName" required value={form.firstName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" name="lastName" required value={form.lastName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" name="email" type="email" required value={form.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" name="address" required value={form.address} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" name="city" required value={form.city} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="ZIP Code" name="zip" required value={form.zip} onChange={handleChange} />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 4 }}>
                Place Order — {formatPrice(total)}
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ mb: 3, letterSpacing: '0.1em' }}>
                Order Summary
              </Typography>
              {items.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 56, height: 68, objectFit: 'cover' }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="primary.main">
                    {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Total</Typography>
                <Typography color="primary.main" variant="h6">
                  {formatPrice(total)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
