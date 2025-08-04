import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/commons/Navbar.tsx';
import AppRoutes from "@/Routes.tsx";

export function AppContent() {
    const location = useLocation();
    const hideNavbarPaths = ['/login', '/signup'];
    const hideNavbar = hideNavbarPaths.includes(location.pathname);

    return (
        <div>
            {!hideNavbar && (
                <div className="flex justify-center py-5 border-b border-gray-200">
                    <Navbar />
                </div>
            )}
            <div className="p-4">
                <AppRoutes />
            </div>
        </div>
    );
}