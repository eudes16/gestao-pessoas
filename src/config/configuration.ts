import { Configuration } from "./configuration.interface";

export default (): Configuration => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mode: process.env.NODE_ENV ? 'production' : 'development',
    secret: process.env.APP_SECRET || 'secret',
})