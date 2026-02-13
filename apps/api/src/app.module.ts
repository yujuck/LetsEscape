import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './common/supabase';
import { CrawlingModule } from './modules/crawling/crawling.module';
import { StoresModule } from './modules/stores/stores.module';
import { ThemesModule } from './modules/themes/themes.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    SupabaseModule,
    CrawlingModule,
    StoresModule,
    ThemesModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
