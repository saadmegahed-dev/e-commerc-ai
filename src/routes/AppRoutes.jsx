import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import PageTransition from '../components/common/PageTransition';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import CheckoutPage from '../pages/CheckoutPage';
import AIPage from '../pages/AIPage';
import ProfilePage from '../pages/ProfilePage';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route
            index
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="shop"
            element={
              <PageTransition>
                <ShopPage />
              </PageTransition>
            }
          />
          <Route
            path="product/:id"
            element={
              <PageTransition>
                <ProductPage />
              </PageTransition>
            }
          />
          <Route
            path="cart"
            element={
              <PageTransition>
                <CartPage />
              </PageTransition>
            }
          />
          <Route
            path="wishlist"
            element={
              <PageTransition>
                <WishlistPage />
              </PageTransition>
            }
          />
          <Route
            path="checkout"
            element={
              <PageTransition>
                <CheckoutPage />
              </PageTransition>
            }
          />
          <Route
            path="ai"
            element={
              <PageTransition>
                <AIPage />
              </PageTransition>
            }
          />
          <Route
            path="profile"
            element={
              <PageTransition>
                <ProfilePage />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
