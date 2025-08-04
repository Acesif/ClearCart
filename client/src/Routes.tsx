import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/auth/Login';
import Signup from "@/pages/auth/Signup.tsx";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
);

export default AppRoutes;
