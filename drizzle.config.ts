import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: "src/drizzle/schema.ts",
  out: './src/drizzle/migrations',
  dialect: 'sqlite',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: 'D:/JS_workDev/Clinics/Clinics.db',
  }
});