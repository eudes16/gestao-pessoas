export interface Configuration {
    port: number;
    mode: "development" | "production";
    secret: string;
}
