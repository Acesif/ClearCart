import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/auth/Login';
import Signup from "@/pages/auth/Signup.tsx";
import HeroSection from "@/components/commons/HeroSection.tsx";
import ProductsWrapper from "@/pages/products/ProductsWrapper.tsx";
import ProtectedRoute from "@/components/auth/ProtectedRoutes.tsx";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/browse/all" element={
            <ProtectedRoute>
                <ProductsWrapper />
            </ProtectedRoute>
        } />
    </Routes>
);

export default AppRoutes;
