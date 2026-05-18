import { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(lineRef.current, {
        scaleX: 0,
        duration: 1.2,
        transformOrigin: "left center",
      })
        .from(titleRef.current, { y: 60, opacity: 0, duration: 1 }, "-=0.6")
        .from(
          subtitleRef.current,
          { y: 30, opacity: 0, duration: 0.8 },
          "-=0.5",
        )
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          imageRef.current,
          { scale: 1.15, opacity: 0, duration: 1.4 },
          "-=1",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: { xs: "85vh", md: "92vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        ref={imageRef}
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.85) 100%)",
          },
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 640 }}>
          <Box
            ref={lineRef}
            sx={{
              width: 48,
              height: 1,
              bgcolor: "primary.main",
              mb: 4,
            }}
          />
          <Typography
            ref={titleRef}
            variant="h1"
            sx={{
              fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4.5rem" },
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            Timeless
            <br />
            <Box component="span" sx={{ color: "primary.main" }}>
              Elegance
            </Box>
          </Typography>
          <Typography
            ref={subtitleRef}
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 420, mb: 5, fontSize: "1.05rem" }}
          >
            Discover curated luxury — timepieces, jewelry, and accessories
            crafted for those who appreciate the extraordinary.
          </Typography>
          <Box ref={ctaRef} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={RouterLink}
              to="/shop"
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: "8px" }}
            >
              Explore Collection
            </Button>
            <Button
              component={RouterLink}
              to="/ai"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ borderRadius: "8px" }}
            >
              AI Concierge
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
