import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface ApiKeyTable {
  id: string;
  api_key: string;
  project_id: string | null;
  created_by: string;
  is_active: boolean;
  expires_at: ColumnType<Date, string | undefined, string>;
  updated_at: ColumnType<Date, string | undefined, string>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type ApiKey = Selectable<ApiKeyTable>;
export type NewApiKey = Insertable<ApiKeyTable>;
export type ApiKeyUpdate = Updateable<ApiKeyTable>;
