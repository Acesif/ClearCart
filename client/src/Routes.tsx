import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/auth/Login';
import Signup from "@/pages/auth/Signup.tsx";
import HeroSection from "@/components/commons/HeroSection.tsx";
import ProductsPage from "@/pages/products/ProductsPage.tsx";
import ProtectedRoute from "@/components/auth/ProtectedRoutes.tsx";
import UserProfile from "@/pages/auth/UserProfile.tsx";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
                <UserProfile />
            </ProtectedRoute>
        } />
    </Routes>
);

export default AppRoutes;
