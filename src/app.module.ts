import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DespesasModule } from './despesas/despesas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TweetsModule,
    MongooseModule.forRoot(process.env.MONGO_DSN),
    DespesasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
