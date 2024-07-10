export interface Paginate<T> {
    pageFrom: number;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalPage: number;
    hasPrevious: string;
    hasNext: number;
    products: T[];
}