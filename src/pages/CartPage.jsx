import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { ArrowForwardIcon } from "../icons";
import AnimatedSection from "../components/common/AnimatedSection";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../data/products";

export default function CartPage() {
  const { items, total, update, remove } = useCart();

  if (items.length === 0) {
    return (
      <Container sx={{ py: 12, textAlign: "center" }}>
        <AnimatedSection>
          <Typography
            variant="h3"
            sx={{ mb: 2, fontSize: { xs: "1.6rem", md: "2rem" } }}
          >
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Discover our curated collection of exceptional pieces.
          </Typography>
          <Button component={RouterLink} to="/shop" variant="contained">
            Continue Shopping
          </Button>
        </AnimatedSection>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <AnimatedSection sx={{ mb: 6 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Shopping Bag
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.8rem" } }}
          >
            Cart ({items.length})
          </Typography>
        </AnimatedSection>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            {items.map((item) => (
              <Box key={item.id} sx={{ position: "relative" }}>
                <CartItem item={item} onUpdate={update} onRemove={remove} />
              </Box>
            ))}
          </Box>

          <Box sx={{ width: { md: 360 }, flexShrink: 0 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                position: { md: "sticky" },
                top: 96,
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, letterSpacing: "0.1em" }}>
                Order Summary
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body2">{formatPrice(total)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body2" color="primary.main">
                  Complimentary
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="body1">Total</Typography>
                <Typography variant="h6" color="primary.main">
                  {formatPrice(total)}
                </Typography>
              </Box>
              <Button
                component={RouterLink}
                to="/checkout"
                variant="contained"
                fullWidth
                size="large"
                sx={{ borderRadius: "8px" }}
                endIcon={<ArrowForwardIcon />}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
