export const RateIntervals = {
    PER_HOUR: "PER_HOUR",
    PER_DAY: "PER_DAY",
    PER_WEEK: "PER_WEEK",
    PER_MONTH: "PER_MONTH",
} as const;

export type RateInterval = keyof typeof RateIntervals;
