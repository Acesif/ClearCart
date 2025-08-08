import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage.tsx';
import SignupPage from "@/pages/auth/SignupPage.tsx";
import HeroSection from "@/components/commons/HeroSection.tsx";
import ProductsPage from "@/pages/products/ProductsPage.tsx";
import ProtectedRoute from "@/components/auth/ProtectedRoutes.tsx";
import UserProfilePage from "@/pages/auth/UserProfilePage.tsx";
import MyProductsPage from "@/pages/products/userProducts/MyProductsPage.tsx";
import AddProductPage from "@/pages/products/AddProductPage.tsx";
import ProductPage from "@/pages/products/ProductPage.tsx";
import NotFound from "@/components/commons/404.tsx";
import ProductEditPage from "@/pages/products/userProducts/ProductEditPage.tsx";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/browse/all" element={
            <ProtectedRoute>
                <ProductsPage />
            </ProtectedRoute>
        } />
        <Route path="/browse/:categoryId" element={
            <ProtectedRoute>
                <ProductsPage />
            </ProtectedRoute>
        } />
        <Route path="/me" element={
            <ProtectedRoute>
                <UserProfilePage />
            </ProtectedRoute>
        } />
        <Route path="/myproducts" element={
            <ProtectedRoute>
                <MyProductsPage />
            </ProtectedRoute>
        } />
        <Route path="/myproducts/create" element={
            <ProtectedRoute>
                <AddProductPage />
            </ProtectedRoute>
        } />
        <Route path="/products/:productId" element={
            <ProtectedRoute>
                <ProductPage />
            </ProtectedRoute>
        } />
        <Route path="/products/:productId/edit" element={
            <ProtectedRoute>
                <ProductEditPage />
            </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
