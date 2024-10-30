import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TransactionalController } from './transactional.controller';
import { TransactionalService } from './transactional.services';
import { ProjectModule } from '../project/project.module';
import { ProjectAccessModule } from '../project-access/projectAccess.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, ProjectModule, ProjectAccessModule, JwtModule],
  controllers: [TransactionalController],
  providers: [TransactionalService],
  exports: [TransactionalService],
})
export class TransactionalModule {}
