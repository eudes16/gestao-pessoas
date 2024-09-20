import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
    log: ["info", "query"]
})
.$extends({
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                if (
                    operation === "findMany" || operation === "aggregate" || operation === "count" || operation === "findFirst" 
                    || operation === "findUnique" || operation === "findFirstOrThrow" || operation === "findUniqueOrThrow"
                ) {
                    args.where = {
                        ...args.where,
                        deletedAt: null,
                    }
                }
                return query(args)
            },
        },
    },
})

export default prismaClient;