// prisma.config.ts
import 'dotenv/config';
import { defineConfig, env } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    seed: 'node prisma/seed.js',  // 👈 This tells Prisma how to run your seed script
  },
});