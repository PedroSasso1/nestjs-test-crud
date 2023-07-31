import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, TweetSchema } from './entities/tweet.entity';

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;

  beforeEach(async () => {
    const uri =
      'mongodb://root:root@localhost:27017/tweets_service_test?authSource=admin';

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
    const tweet = await service.create({
      content: 'oi bia gatinha',
      screen_name: 'pedro gatinho',
    });

    expect(tweet.content).toBe('oi bia gatinha');
    expect(tweet.screen_name).toBe('pedro gatinho');
  });
});
