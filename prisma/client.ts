// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export default prisma

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

// https://authjs.dev/reference/adapter/prisma?_gl=1*nw08qj*_gcl_au*MjEyOTEzMDM4NC4xNzAzODQ3NTQz
// * npm i @next-auth/prisma-adapter instead of @auth/prisma-adapter