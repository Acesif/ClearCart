import { create } from 'zustand';

interface ProductStore {
    createdProductId: string | undefined;
    setCreatedProductId: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    createdProductId: undefined,
    setCreatedProductId: (id: string) => set({ createdProductId: id }),
}));
