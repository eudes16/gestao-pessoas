import { HttpRequest } from "./http-request.interface";
import { HttpResponse } from "./http-response.interface";

export interface HttpClient {
    get(request: HttpRequest): Promise<HttpResponse>;
    post(request: HttpRequest): Promise<HttpResponse>;
    put(request: HttpRequest): Promise<HttpResponse>;
    delete(request: HttpRequest): Promise<HttpResponse>;
}