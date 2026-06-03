import { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import AnimatedSection from "../components/common/AnimatedSection";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="sm">
        <AnimatedSection sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Stay Connected
          </Typography>
          <Typography
            variant="h3"
            sx={{ mb: 2, fontSize: { xs: "1.6rem", md: "2rem" } }}
          >
            Join the AETHER Circle
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Exclusive access to new arrivals, private events, and curated
            recommendations.
          </Typography>

          {submitted ? (
            <Typography color="primary.main" variant="body1">
              Welcome to the circle. We will be in touch.
            </Typography>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
              }}
            >
              <TextField
                fullWidth
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: 40, // 👈 مهم
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 4,
                  borderRadius: "8px",
                  height: 40, // 👈 نفس الارتفاع
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </Button>
            </Box>
          )}
        </AnimatedSection>
      </Container>
    </Box>
  );
}
