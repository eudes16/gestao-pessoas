export interface Configuration {
    port: number;
    mode: "development" | "production";
    secret: string;
    cep_api_url: string;
}
