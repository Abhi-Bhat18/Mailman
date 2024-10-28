import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { randomBytes } from 'crypto';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { generateUlid } from '@/utils/generators';

@Injectable()
export class ApiService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  async generateAndInsertAPIKey(
    userId: string,
    projectId: string,
    expiresInDays: number = 365,
  ) {
    const apiKey = this.createUniqueApiKey();

    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + expiresInDays);

    await this.db
      .insertInto('api_keyes')
      .values({
        id: generateUlid(),
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
      .selectFrom('api_keyes')
      .where('api_key', '=', apiKey)
      .select(['api_key', 'expires_at', 'is_active', 'project_id'])
      .executeTakeFirst();

    // check is api key is valid or not
    const now = new Date();
    const isValid = result.is_active && new Date(result.expires_at) > now;

    if (isValid) {
      return isValid && result.project_id === projectId;
    }

    return isValid;
  }

  async invokeAPIKey(id: string) {}

  private createUniqueApiKey(): string {
    // Generate a random string of 32 bytes and convert it to a hex string
    return randomBytes(32).toString('hex');
  }
}
