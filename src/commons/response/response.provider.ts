export  default <T = any>(records: T, count: number, limit: number, page: number) => {
    const totalPages = Math.ceil(count / (limit ?? 10));
    const currentPage = +(page ?? 1);
    const nextPage = totalPages === currentPage ? null : +(page ?? 1) + 1;
    const prevPage = currentPage === 1 ? null : +(page ?? 1) - 1;
    return {
        records,
        pagination: {
            totalItems: count,
            totalPages,
            limit: +(limit ?? 10),
            prevPage,
            currentPage,
            nextPage
        }
    }
}