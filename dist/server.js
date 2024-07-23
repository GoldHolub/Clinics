import express from 'express';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const sqlite = new Database('Clinics.db');
const db = drizzle(sqlite);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map