import { PrismaClient } from "@prisma/client"

const prisma = global.prisam || new PrismaClient()

if (process.env.NODE_ENV === "development") global.prisam = prisma

export default prisma

