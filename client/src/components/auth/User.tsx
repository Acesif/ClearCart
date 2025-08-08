import {useState} from "react";
import { Button } from '@/components/ui/button';
import LentProductsPage from "@/pages/products/userProducts/LentProductsPage.tsx";
import BorrowedProductsPage from "@/pages/products/userProducts/BorrowedProductsPage.tsx";
import BoughtProductsPage from '@/pages/products/userProducts/BoughtProductsPage';
import SoldProductsPage from "@/pages/products/userProducts/SoldProductsPage.tsx";
import UserProfileUpdate from "@/components/auth/UserProfileUpdate.tsx";

const tabs = ['Me', 'Lent', 'Borrowed', 'Bought', 'Sold'];

const User = () => {
    const [activeTab, setActiveTab] = useState('Me');

    return (
        <div className="w-[100%] h-[90vh] mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden">
            <div className="flex gap-6 border-b pb-4 mb-6">
                {tabs.map((tab) => (
                    <Button
                        variant="outline"
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-lg font-medium cursor-pointer px-4 py-2 transition-all duration-300 ${
                            activeTab === tab
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-blue-500'
                        }`}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className="mb-6 text-gray-700">
                {activeTab === 'Me' ? (
                    <div>
                        <UserProfileUpdate />
                    </div>
                ) : activeTab === 'Lent' ? (
                    <p className="text-lg font-semibold">
                        Showing your <strong>LENT</strong> items.
                        <LentProductsPage />
                    </p>
                ) : activeTab === 'Borrowed' ? (
                    <p className="text-lg font-semibold">
                        Showing your <strong>BORROWED</strong> items.
                        <BorrowedProductsPage />
                    </p>
                ) : activeTab === 'Bought' ? (
                    <p className="text-lg font-semibold">
                        Showing your <strong>BOUGHT</strong> items.
                        <BoughtProductsPage />
                    </p>
                ) : activeTab === 'Sold' ? (
                    <p className="text-lg font-semibold">
                        Showing your <strong>SOLD</strong> items.
                        <SoldProductsPage />
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default User;
