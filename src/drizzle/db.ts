import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('D:/JS_workDev/Clinics/Clinics.db');
export const db = drizzle(sqlite);
