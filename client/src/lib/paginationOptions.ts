import { useState } from 'react';

interface PaginationOptions {
    maxPage: number;
    initialPage?: number;
}

const usePagination = ({ maxPage, initialPage = 0 }: PaginationOptions) => {
    const [page, setPage] = useState(initialPage);

    const handlePrevious = () => {
        setPage((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        if (page < maxPage) {
            setPage((prev) => prev + 1);
        }
    };

    return {
        page,
        handlePrevious,
        handleNext,
    };
};

export default usePagination;
