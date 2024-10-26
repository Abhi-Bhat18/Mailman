import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { CreateProjectAccessDto } from '../project/dto/create-project-access.dto';
import { generateUlid } from 'src/utils/generators';

@Injectable()
export class ProjectAccessService implements OnModuleInit {
  private db: Kysely<Database>;
  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  getProjectAccess = async (project_id: string, user_id: string) => {
    return await this.db
      .selectFrom('project_accesses')
      .where('project_id', '=', project_id)
      .where('user_id', '=', user_id)
      .innerJoin('roles', 'role_id', 'roles.id')
      .selectAll()
      .executeTakeFirst();
  };

  getAllProjectAccess = async (project_id: string) => {
    return await this.db
      .selectFrom('project_accesses')
      .where('project_id', '=', project_id)
      .leftJoin('users', 'users.id', 'user_id')
      .leftJoin('roles', 'roles.id', 'project_accesses.role_id')
      .select([
        'project_accesses.id as project_access_id',
        'user_id',
        'first_name',
        'last_name',
        'email',
        'roles.name as role',
      ])
      .execute();
  };

  getProjectAccessOfUser = async (user_id: string) => {
    return await this.db
      .selectFrom('project_accesses')
      .where('user_id', '=', user_id)
      .innerJoin('roles', 'role_id', 'roles.id')
      .selectAll()
      .execute();
  };

  getDefaultProjectAcccess = async (user_id: string) => {
    return await this.db
      .selectFrom('project_accesses')
      .where('user_id', '=', user_id)
      .innerJoin('roles as role', 'project_accesses.role_id', 'role.id')
      .innerJoin(
        'projects as project',
        'project_accesses.project_id',
        'project.id',
      )
      .select([
        'project_accesses.id as project_access_id',
        'project_accesses.role_id as role_id',
        'project.id as project_id',
        'project.name as project_name',
        'project.status as project_status',
        'role.name as project_role',
        'project.default_mail_from'
      ])
      .executeTakeFirst();
  };

  createProjectAccess = async (body: CreateProjectAccessDto) => {
    return await this.db
      .insertInto('project_accesses')
      .values({
        id: generateUlid(),
        project_id: body.projectId,
        role_id: body.roleId,
        user_id: body.userId,
      })
      .returningAll()
      .executeTakeFirst();
  };
}
