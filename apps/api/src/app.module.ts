import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './common/supabase';
import { CrawlingModule } from './modules/crawling/crawling.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    SupabaseModule,
    CrawlingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
