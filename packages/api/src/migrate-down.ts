import * as path from 'path';
import { Pool } from 'pg';
import { promises as fs } from 'fs';
import { Database } from './modules/database/database.types';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';

async function migrateDown() {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: 'localhost',
        database: 'mail_man',
      }),
    }),
  });
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  });

  const { error, results } = await migrator.migrateDown();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was reverted successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to revert "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to revert migrations');
    console.error(error);
    process.exit(1);
  }
}

migrateDown();
