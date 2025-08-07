import {createContext, type ReactNode, useContext, useState} from 'react';

interface ProductContextType {
    createdProductId: string | undefined;
    setCreatedProductId: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [createdProductId, setCreatedProductId] = useState<string | undefined>(undefined);

    return (
        <ProductContext.Provider value={{ createdProductId, setCreatedProductId }}>
            {children}
        </ProductContext.Provider>
    );
};
