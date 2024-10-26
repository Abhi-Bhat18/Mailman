import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiService } from './api-key.services';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectService } from '../project/project.service';
import { Request } from 'express';
import { ProjectAccessService } from '../project-access/projectAccess.service';

@Controller('api-key')
@UseGuards(AuthGuard)
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly projectService: ProjectService,
    private readonly projectAccessService: ProjectAccessService,
  ) {}

  @Get()
  async getProjectApiKey() {}

  @Post('')
  async generateApiKey(@Param() id: string, @Req() req: Request) {
    // check wether the project exists or user have access to the project
    const project = await this.projectService.getProjectById(id);

    if (!project)
      throw new HttpException(
        'Unable to find the project',
        HttpStatus.NOT_FOUND,
      );

    let canGenerateAPIKey;

    if (project.created_by === req.user.id) {
      canGenerateAPIKey = true;
    }

    if (!canGenerateAPIKey) {
      const projectAccess = await this.projectAccessService.getProjectAccess(
        project.id,
        req.user.id,
      );

      if (projectAccess && projectAccess.role_id > 2) {
        canGenerateAPIKey = true;
      }
    }

    if (!canGenerateAPIKey)
      throw new HttpException(
        'Not have enough permission',
        HttpStatus.UNAUTHORIZED,
      );

    const apiKey = this.apiService.generateAndInsertAPIKey(
      req.user.id,
      project.id,
    );
    return apiKey;
  }

  //   @Put('')
  //   async invokeAPIKey(@Body() body : ) {

  //   }
}
