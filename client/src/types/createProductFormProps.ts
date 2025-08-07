import type {Dispatch, SetStateAction} from "react";
import type { FormData } from "@/types/FormData.ts";
import type {RateInterval} from "@/types/RateInterval.ts";

export type createProductFormProps = {
    step: number;
    title: string;
    description: string;
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    handleNext: () => void;
    handleBack: () => void;
    handleSubmit: (formData: FormData) => void;
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    categories: string[];
    price: number;
    setPrice: Dispatch<SetStateAction<number>>;
    rentAmount: number;
    setRentAmount: Dispatch<SetStateAction<number>>;
    rentOption: RateInterval;
    setRentOption: Dispatch<SetStateAction<RateInterval>>;
};