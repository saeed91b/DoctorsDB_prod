export interface Pagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

export class PaginatedResult<T> {
    data: T;
    pagination: Pagination;

    constructor(data: T, pagination: Pagination){
        this.data = data;
        this.pagination = pagination;
    }
}

export class PaginationParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 4){
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}