import type { RateInterval } from "@/types/RateInterval.ts";

export type ProductCardType = {
    id: string,
    title: string,
    description: string,
    price: number,
    productCategoryIds: string[],
    rate: number,
    interval: RateInterval,
    owner: string
}