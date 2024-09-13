export interface Configuration {
    port: number;
    mode: "development" | "production";
    secret: string;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
}
