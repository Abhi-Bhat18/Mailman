import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('dashboard')
  async getDashBoardCounts() {
    return await this.analyticsService.getDashBoardCounts();
  }

  @Get('events')
  async getEventsGraph() {
    return await this.analyticsService.getEventsGraph();
  }
}
