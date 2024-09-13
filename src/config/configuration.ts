import { Configuration } from "./configuration.interface";

export default (): Configuration => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mode: process.env.NODE_ENV ? 'production' : 'development',
    secret: process.env.SECRET,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
})