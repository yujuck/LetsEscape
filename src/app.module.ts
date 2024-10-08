import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrawlingModule } from './crawling/crawling.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get('MYSQL_HOST'),
    //     port: configService.get('MYSQL_PORT'),
    //     username: configService.get('MYSQL_USERNAME'),
    //     password: configService.get('MYSQL_PASSWORD'),
    //     database: configService.get('MYSQL_DATABASE'),
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    CrawlingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
