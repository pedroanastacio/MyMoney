import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BillingCycleModule } from './billing-cycle/billing-cycle.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        // eslint-disable-next-line prettier/prettier
        uri: `mongodb://${config.get('DB_USER')}:${config.get('DB_PASSWORD')}@${config.get('DB_HOST')}:${config.get('DB_DOCKER_PORT')}/${config.get('DB_DATABASE')}?authSource=admin`,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    BillingCycleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
