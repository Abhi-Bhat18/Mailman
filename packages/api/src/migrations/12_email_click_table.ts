import { Database } from '@/modules/database/database.types';
import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .createTable('email_clicks')
    .addColumn('campaign_id', 'varchar', (col) => col.notNull())
    .addColumn('clicked_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();
};

export const down = async (db: Kysely<Database>) => {
  await db.schema.dropTable('email_clicks').execute();
};
