import {
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { TransactionalService } from './transactional.services';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectService } from '../project/project.service';
import { Request } from 'express';
import { NewAPIKeyDto } from './dto/generateAPIKey.dto';
import { ProjectAccessGuard } from '../project-access/projectAccessGuard';

@Controller('transactionals')
@UseGuards(AuthGuard, ProjectAccessGuard)
export class TransactionalController {
  constructor(
    private readonly transactionalService: TransactionalService,
    private readonly projectService: ProjectService,
  ) {}

  @Get('api-keys')
  async getProjectApiKey(@Req() req: Request) {
    return await this.transactionalService.getAPIKeys(req.project_id);
  }

  @Post('api-key')
  async generateApiKey(@Body() body: NewAPIKeyDto, @Req() req: Request) {
    const apiKey = this.transactionalService.generateAndInsertAPIKey(
      req.user.id,
      req.project_id,
      body.expires_at,
    );
    return apiKey;
  }

  @Put('')
  async invokeAPIKey(@Body('api_key') api_key: string) {
    console.log('API Key', api_key);
  }
}
