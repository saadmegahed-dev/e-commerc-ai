import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Stack,
} from "@mui/material";
import { SearchIcon } from "../icons";
import AnimatedSection from "../components/common/AnimatedSection";
import ProductGrid from "../components/product/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import { categories } from "../data/categories";

export default function 
ShopPage() {
  const { products, category } = useProducts();
  const [, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  const handleCategoryFilter = (catId) => {
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      setSearchParams({});
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  const activeCategory = categories.find((c) => c.id === category);

  return (
    <Box sx={{ py: { xs: 6, md: 10,} }}>
      <Container maxWidth="xl">
        <AnimatedSection sx={{ mb: 6 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Collection
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, mb: 1 }}
          >
            {activeCategory ? activeCategory.name : "All Products"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </Typography>
        </AnimatedSection>

        <Box
          sx={{
            mb: 5,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label="All"
              onClick={() => handleCategoryFilter(null)}
              variant={!category ? "filled" : "outlined"}
              color={!category ? "primary" : "default"}
              sx={{ borderRadius: 0 }}
            />
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.name}
                onClick={() => handleCategoryFilter(cat.id)}
                variant={category === cat.id ? "filled" : "outlined"}
                color={category === cat.id ? "primary" : "default"}
                sx={{ borderRadius: 0 }}
              />
            ))}
          </Stack>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ minWidth: { md: 280 } }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ fontSize: 20, color: "text.secondary" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 8 }}
          >
            No products found. Try adjusting your filters.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
