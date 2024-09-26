import { Inject, Injectable } from '@nestjs/common';
import { HttpClient } from './port/http-client.interface';
import { HttpRequest } from './port/http-request.interface';
import { HttpResponse } from './port/http-response.interface';
import { AxiosInstance, AxiosStatic } from 'axios';

@Injectable()
export class HttpClientProvider implements HttpClient {
    constructor(
        @Inject("AXIOS_PROVIDER") private client: AxiosInstance
    ) {
        // TODO: implement interceptors
    }

    async get(request: HttpRequest): Promise<HttpResponse> {
        try {
            const response = await this.client.get(
                request.url, {
                headers: request.headers,
            });

            return {
                status: true,
                code: response.status,
                data: response.data,
            };
        } catch (error) {
            return {
                status: false,
                code: error.response.status,
                message: error.response.data,
                data: null
            };
        }
    }

    async post(request: HttpRequest): Promise<HttpResponse> {
        try {

            const response = await this.client.post(
                request.url,
                request.data,
                {
                    headers: request.headers,
                }
            );

            return {
                status: true,
                code: response.status,
                data: response.data,
            };
        } catch (error) {
            return {
                status: false,
                code: error.response.status,
                message: error.response.data,
                data: null
            };
        }

    }

    async put(request: HttpRequest): Promise<HttpResponse> {
        try {

            const response = await this.client.put(
                request.url,
                request.data, {
                headers: request.headers,
            });

            return {
                status: true,
                code: response.status,
                data: response.data,
            };
        } catch (error) {
            return {
                status: false,
                code: error.response.status,
                message: error.response.data,
                data: null
            }
        }
    }

    async delete(request: HttpRequest): Promise<HttpResponse> {
        try {
            const response = await this.client.delete(
                request.url, 
                {
                headers: request.headers,
            });

            return {
                status: true,
                code: response.status,
                data: response.data,
            };
        } catch (error) {
            return {
                status: false,
                code: error.response.status,
                message: error.response.data,
                data: null
            }
        }
    }

}
