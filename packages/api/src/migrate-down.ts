import * as path from 'path';
import { Pool } from 'pg';
import configuration from './config/configuration';
import { promises as fs } from 'fs';
import { Database } from './modules/database/database.types';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';
const env = configuration();

async function migrateDown() {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: env.database.host,
        database: env.database.database,
        port: env.database.port,
        user: env.database.user,
        password: env.database.password,
      }),
    }),
  });
 
}

migrateDown();
