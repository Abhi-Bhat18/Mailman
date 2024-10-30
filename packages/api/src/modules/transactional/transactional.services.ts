import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { randomBytes } from 'crypto';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';

@Injectable()
export class TransactionalService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  async getAPIKeys(project_id: string, limit: number = 10, offset: number = 0) {
    return await this.db
      .selectFrom('api_keys')
      .where('project_id', '=', project_id)
      .leftJoin('users', 'users.id', 'api_keys.created_by')
      .select([
        'api_key',
        'expires_at',
        'first_name',
        'last_name',
        'created_by',
        'api_keys.created_at',
      ])
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async generateAndInsertAPIKey(
    userId: string,
    projectId: string,
    expiry?: Date,
  ) {
    const apiKey = this.createUniqueApiKey();

    let expires_at = new Date();
    if (!expiry) {
      expires_at.setDate(expires_at.getDate() + 365);
    } else {
      expires_at = expiry;
    }

    await this.db
      .insertInto('api_keys')
      .values({
        api_key: apiKey,
        expires_at: expires_at.toISOString(),
        project_id: projectId,
        created_by: userId,
      })
      .execute();

    return apiKey;
  }

  async validateAPIKey(apiKey: string, projectId: string) {
    const result = await this.db
      .selectFrom('api_keys')
      .where('api_key', '=', apiKey)
      .select(['api_key', 'expires_at', 'project_id'])
      .executeTakeFirst();

    // check is api key is valid or not
    const now = new Date();
    const isValid = result && new Date(result.expires_at) > now;

    if (isValid) {
      return isValid && result.project_id === projectId;
    }

    return isValid;
  }

  async invokeAPIKey(api_key: string) {
    await this.db
      .deleteFrom('api_keys')
      .where('api_key', '=', api_key)
      .executeTakeFirst();
  }

  private createUniqueApiKey(): string {
    // Generate a random string of 32 bytes and convert it to a hex string
    return randomBytes(32).toString('hex');
  }
}
