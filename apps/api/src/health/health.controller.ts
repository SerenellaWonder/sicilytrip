import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.healthCheckService.check([
      async () => {
        await this.healthService.checkDatabase();

        return {
          database: {
            status: 'up',
          },
        };
      },
      async () => ({
        application: {
          status: 'up',
          environment: process.env.NODE_ENV ?? 'development',
          uptime: Math.floor(process.uptime()),
          timestamp: new Date().toISOString(),
        },
      }),
    ]);
  }
}
