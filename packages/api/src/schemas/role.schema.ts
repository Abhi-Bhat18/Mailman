import { Generated, Selectable, Insertable, Updateable } from 'kysely';

export interface RoleTable {
  id: Generated<number>;
  name: string;
  description: string;
}

export type Role = Selectable<RoleTable>;
export type NewRole = Insertable<RoleTable>;
export type RoleUpdate = Updateable<RoleTable>;
