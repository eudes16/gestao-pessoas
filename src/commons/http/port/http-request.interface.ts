export interface HttpRequest<T = any> {
    url: string;
    data?: T;
    headers?: Record<string, string>; 
}