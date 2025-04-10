// import { PrismaClient } from '@prisma/client'
// import 'dotenv/config'
// import { execSync } from 'node:child_process'
// import { randomUUID } from 'node:crypto'
// import { afterAll, beforeAll } from 'vitest'

// let prisma: PrismaClient

// function generateUniqueDatabaseUrl(schemaId: string) {
//     if(!process.env.DATABASE_URL) {
//         throw new Error('Env não informado')
//     }

//     const url = new URL(process.env.DATABASE_URL)

//     url.pathname = schemaId

//     return url.toString()
// }

// const schemaId = randomUUID()

// beforeAll(() => {

//     execSync(`mysql -u root -proot123 -e "CREATE DATABASE \`${schemaId}\`;"`)

//     const databaseUrl = generateUniqueDatabaseUrl(schemaId) 
//     process.env.DATABASE_URL = databaseUrl

//     execSync(`npx prisma migrate deploy`)

//     prisma = new PrismaClient()
// }, 20000)

// afterAll(async () => {
//     prisma.$disconnect()
//     execSync(`mysql -u root -proot123 -e "DROP DATABASE \`${schemaId}\`;"`)
// })