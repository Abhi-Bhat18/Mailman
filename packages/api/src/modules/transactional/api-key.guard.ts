import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionalService } from './transactional.services';

import { Request } from 'express';

@Injectable()
export class ApiKey implements CanActivate {
  constructor(private transactionalService: TransactionalService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();

    const apiKey = request.headers['x-api-key'];

    if (typeof apiKey != 'string')
      throw new HttpException('Malformed API Key', HttpStatus.UNAUTHORIZED);

    const { projectId } = request.body;

    if (!apiKey || !projectId) throw new UnauthorizedException();

    return await this.transactionalService.validateAPIKey(apiKey, projectId);
  }
}
