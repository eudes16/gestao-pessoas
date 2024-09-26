export interface HttpResponse<T = any> {
    status?: boolean;
    code: number;
    message?: string[];
    data?: T;
}