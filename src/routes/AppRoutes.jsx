import { Routes, Route } from 'react-router-dom'
import { ROLES } from '../context/AuthContext'
import RoleRoute from './RoleRoute'

import StoreLayout from '../layouts/StoreLayout'
import ProductAdminLayout from '../layouts/ProductAdminLayout'
import FulfilmentLayout from '../layouts/FulfilmentLayout'

import HomePage from '../pages/customer/HomePage'
import ShopPage from '../pages/customer/ShopPage'
import ProductPage from '../pages/customer/ProductPage'
import CartPage from '../pages/customer/CartPage'
import CheckoutPage from '../pages/customer/CheckoutPage'
import CustomerOrdersPage from '../pages/customer/OrdersPage'
import ReturnsPage from '../pages/customer/ReturnsPage'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

import ProductDashboard from '../pages/admin/DashboardPage'
import ProductsPage from '../pages/admin/ProductsPage'
import ProductFormPage from '../pages/admin/ProductFormPage'
import CategoriesPage from '../pages/admin/CategoriesPage'
import InventoryPage from '../pages/admin/InventoryPage'
import PromotionsPage from '../pages/admin/PromotionsPage'

import FulfilmentDashboard from '../pages/fulfilment/DashboardPage'
import FulfilmentOrdersPage from '../pages/fulfilment/OrdersPage'
import FulfilmentOrderPage from '../pages/fulfilment/OrderPage'
import PickingPage from '../pages/fulfilment/PickingPage'
import PackingPage from '../pages/fulfilment/PackingPage'
import DispatchPage from '../pages/fulfilment/DispatchPage'
import CompletedPage from '../pages/fulfilment/CompletedPage'
import TrackShipmentPage from '../pages/fulfilment/TrackShipmentPage'

import NotFoundPage from '../pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<CustomerOrdersPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route
        element={
          <RoleRoute role={ROLES.PRODUCT_ADMIN}>
            <ProductAdminLayout />
          </RoleRoute>
        }
      >
        <Route path="/admin" element={<ProductDashboard />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/products/new" element={<ProductFormPage />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/inventory" element={<InventoryPage />} />
        <Route path="/admin/promotions" element={<PromotionsPage />} />
      </Route>

      <Route
        element={
          <RoleRoute role={ROLES.FULFILMENT}>
            <FulfilmentLayout />
          </RoleRoute>
        }
      >
        <Route path="/fulfilment" element={<FulfilmentDashboard />} />
        <Route path="/fulfilment/orders" element={<FulfilmentOrdersPage />} />
        <Route path="/fulfilment/order/:id" element={<FulfilmentOrderPage />} />
        <Route path="/fulfilment/picking" element={<PickingPage />} />
        <Route path="/fulfilment/packing" element={<PackingPage />} />
        <Route path="/fulfilment/dispatch" element={<DispatchPage />} />
        <Route path="/fulfilment/track" element={<TrackShipmentPage />} />
        <Route path="/fulfilment/completed" element={<CompletedPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
