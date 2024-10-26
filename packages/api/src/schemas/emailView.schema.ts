import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface EmailViewTable {
  campaign_id: string;
  opened_at: ColumnType<Date, string | undefined, never>;
}

export type EmailView = Selectable<EmailViewTable>;
export type NewEmailView = Insertable<EmailViewTable>;

