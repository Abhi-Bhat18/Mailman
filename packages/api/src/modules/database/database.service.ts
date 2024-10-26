// src/database/database.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './database.types'; // Your database types
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private db: Kysely<Database>;
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const pool = new Pool({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_NAME'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
    });

    this.db = new Kysely<Database>({
      dialect: new PostgresDialect({ pool }),
    });
  }

  onModuleDestroy() {
    if (this.db) {
      this.db.destroy();
    }
  }

  getDb(): Kysely<Database> {
    return this.db;
  }
}
