import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AccessJwtAuthGuard } from './auth/access-jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';

import { UserModule } from './models/user/user.module';
import { ProductModule } from './models/product/product.module';
import { CategoryModule } from './models/category/category.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    ProductModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessJwtAuthGuard,
    },
  ],
})
export class AppModule {}
