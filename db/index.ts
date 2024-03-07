import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationConnection = postgres(process.env.DB_URL!, { max: 1 });
const queryConnection = postgres(process.env.DB_URL!);

const db = drizzle(queryConnection);

migrate(drizzle(migrationConnection), { migrationsFolder: "drizzle" });
migrationConnection.end();

export  default db;
