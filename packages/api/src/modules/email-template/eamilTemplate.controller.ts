import {
  Controller,
  Req,
  Body,
  Get,
  Query,
  Post,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { query, Request } from 'express';
import { EmailTemplateService } from './emailTemplate.service';
import { CreateEmailTemplateDto } from './dto/emailTemplate.dto';
import { generateUlid } from '@/utils/generators';
import { AuthGuard } from '../auth/auth.guard';
import {
  EmailSearchQueryDto,
  EmailTemplateQueryDto,
} from './dto/emailTemplateQuery.dto';
import { UpdateTemplateDto } from './dto/updateTemplate.dto';

@Controller('email-template')
@UseGuards(AuthGuard)
export class EmailTemplateController {
  constructor(private emailTemplateService: EmailTemplateService) {}

  @Get()
  async getTemplates(@Query() query: EmailTemplateQueryDto) {
    return await this.emailTemplateService.getAllTemplates(query);
  }

  @Get('search')
  async searchByName(@Query() query: EmailSearchQueryDto) {
    const { search } = query;
    return await this.emailTemplateService.searchByName(search);
  }

  @Post()
  async createNewTemplate(
    @Body() body: CreateEmailTemplateDto,
    @Req() req: Request,
  ) {
    return await this.emailTemplateService.insertTemplate({
      id: generateUlid(),
      ...body,
      created_by: req.user.id,
    });
  }

  @Put()
  async updateTemplate(@Body() body: UpdateTemplateDto) {
    const { template_id, html, json, name, project_id, status } = body;
    return await this.emailTemplateService.updateTemplate(
      {
        html,
        json,
        name,
        project_id,
        status,
      },
      template_id,
    );
  }

  @Get(':id')
  async getAnEmailTemplate(@Param('id') id: string) {
    return await this.emailTemplateService.getATemplateById(id);
  }
}
