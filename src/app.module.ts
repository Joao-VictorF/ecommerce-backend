import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AccessJwtAuthGuard } from './auth/access-jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessJwtAuthGuard,
    },
  ],
})
export class AppModule {}
