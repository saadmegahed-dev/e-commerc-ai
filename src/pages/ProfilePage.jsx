// pages/ProfilePage.jsx
import { useState, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  PersonOutlineIcon,
  ShoppingBagOutlinedIcon,
  FavoriteBorderIcon,
  AutoAwesomeIcon,
} from "../icons";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/common/AnimatedSection";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { formatPrice } from "../data/products";

// ─── useProfileImage ──────────────────────────────────────────────────────────
// Self-contained hook. To share the image with Header/other components,
// move this to hooks/useProfileImage.js and import it from there.

const STORAGE_KEY = "aether_profile_image";
const MAX_BYTES   = 3 * 1024 * 1024; // 3 MB
const ACCEPT      = ["image/jpeg", "image/png", "image/webp"];

function useProfileImage() {
  // Lazy initialiser — reads localStorage once on mount, so image is
  // available immediately without a flicker after page reload.
  const [image,   setImage  ] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || null; }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError  ] = useState(null);

  const upload = useCallback((file) => {
    setError(null);
    if (!file) return;

    // Type check
    if (!ACCEPT.includes(file.type)) {
      setError("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }
    // Size check
    if (file.size > MAX_BYTES) {
      setError("Image must be smaller than 3 MB.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target.result; // "data:image/jpeg;base64,..."
      try { localStorage.setItem(STORAGE_KEY, b64); } catch { /* storage full */ }
      setImage(b64);
      setLoading(false);
    };
    reader.onerror = () => {
      setError("Could not read file.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const clear = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setImage(null);
    setError(null);
  }, []);

  return { image, loading, error, upload, clear, dismissError: () => setError(null) };
}
// ─────────────────────────────────────────────────────────────────────────────


export default function ProfilePage() {
  const { count: cartCount, total } = useCart();
  const { count: wishlistCount }    = useWishlist();

  const { image, loading, error, upload, clear, dismissError } = useProfileImage();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({ name: "Guest Member", email: "guest@aether.com" });
  const [editing, setEditing] = useState(false);
  const [form,    setForm   ] = useState(profile);

  const handleSave = () => { setProfile(form); setEditing(false); };

  const quickLinks = [
    {
      icon: <ShoppingBagOutlinedIcon />,
      label: "Cart",
      path: "/cart",
      detail: `${cartCount} items · ${formatPrice(total)}`,
    },
    {
      icon: <FavoriteBorderIcon />,
      label: "Wishlist",
      path: "/wishlist",
      detail: `${wishlistCount} saved items`,
    },
    {
      icon: <AutoAwesomeIcon />,
      label: "AI Concierge",
      path: "/ai",
      detail: "Personal shopping assistant",
    },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">

        {/* ── Hero / Avatar ──────────────────────────────────────────── */}
        <AnimatedSection sx={{ mb: 6, textAlign: "center" }}>

          {/* Hidden file input — triggered by avatar click */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT.join(",")}
            style={{ display: "none" }}
            onChange={(e) => {
              upload(e.target.files?.[0]);
              e.target.value = ""; // allow re-selecting the same file
            }}
          />

          {/* Clickable avatar */}
          <Tooltip title="Click to change photo" arrow placement="top">
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                position: "relative",
                display: "inline-block",
                mx: "auto",
                mb: 2,
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.05)" },
                "&:hover .av-overlay": { opacity: 1 },
              }}
            >
              {/* Framer Motion cross-fade when image changes */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={image || "default"}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.82 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <Avatar
                    src={image || undefined}
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "secondary.main",
                      border: "2px solid",
                      borderColor: "primary.main",
                      // Keep large images contained
                      "& img": { objectFit: "cover" },
                    }}
                  >
                    {!image && <PersonOutlineIcon sx={{ fontSize: 36 }} />}
                  </Avatar>
                </motion.div>
              </AnimatePresence>

              {/* Hover overlay with "Edit" label */}
              <Box
                className="av-overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  bgcolor: "rgba(0,0,0,0.42)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  pointerEvents: "none",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                  }}
                >
                  Edit
                </Typography>
              </Box>

              {/* Spinner ring while file is converting */}
              {loading && (
                <CircularProgress
                  size={88}
                  thickness={2}
                  sx={{
                    position: "absolute",
                    top: -4,
                    left: -4,
                    color: "primary.main",
                    pointerEvents: "none",
                  }}
                />
              )}
            </Box>
          </Tooltip>

          <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
            {profile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.email}
          </Typography>

          {/* Remove photo link — only shown when a custom image exists */}
          {image && (
            <Button
              size="small"
              color="error"
              onClick={clear}
              sx={{ mt: 1, fontSize: "0.72rem", opacity: 0.65 }}
            >
              Remove photo
            </Button>
          )}
        </AnimatedSection>

        {/* ── Cards ──────────────────────────────────────────────────── */}
        <Grid container spacing={4}>

          {/* Account Details — original logic preserved exactly */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: "8px" }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}
              >
                <Typography variant="h6" sx={{ letterSpacing: "0.1em" }}>
                  Account Details
                </Typography>
                <Button
                  size="small"
                  onClick={() => (editing ? handleSave() : setEditing(true))}
                >
                  {editing ? "Save" : "Edit"}
                </Button>
              </Box>

              {editing ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    size="small"
                  />
                  <TextField
                    label="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    size="small"
                  />
                </Box>
              ) : (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Name
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Email
                  </Typography>
                  <Typography variant="body1">{profile.email}</Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Quick Access — original logic preserved exactly */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: "8px" }}
            >
              <Typography variant="h6" sx={{ mb: 2, letterSpacing: "0.1em" }}>
                Quick Access
              </Typography>
              <List disablePadding>
                {quickLinks.map((link, i) => (
                  <Box key={link.path}>
                    <ListItem
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        px: 0,
                        color: "inherit",
                        transition: "color 0.3s",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
                        {link.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={link.label}
                        secondary={link.detail}
                        primaryTypographyProps={{ variant: "body1" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    {i < quickLinks.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* ── Error toast ────────────────────────────────────────────── */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={dismissError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={dismissError} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}