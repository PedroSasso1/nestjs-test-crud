import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';

describe('Tweet - Unit Tests', () => {
  describe('Tweet Class', () => {
    it('should create a tweet', () => {
      const tweet = new Tweet({
        content: 'oi bia gatinha',
        screen_name: 'pedro gatinho',
      });

      expect(tweet.content).toBe('oi bia gatinha');
      expect(tweet.screen_name).toBe('pedro gatinho');
    });
  });

  describe('Using MongoDB', () => {
    let conn: mongoose.Mongoose;

    beforeEach(async () => {
      conn = await mongoose.connect(
        'mongodb://root:root@localhost:27017/tweets_entity_test?authSource=admin',
      );
    });

    afterEach(async () => {
      await conn.disconnect();
    });
    it('should create a tweet document', async () => {
      const TweetModel = conn.model('Tweet', TweetSchema);

      const tweet = new TweetModel({
        content: 'oi bia gatinha',
        screen_name: 'pedro gatinho',
      });

      await tweet.save();
      const createdTweet = await TweetModel.findById(tweet._id);

      expect(createdTweet.content).toBe('oi bia gatinha');
      expect(createdTweet.screen_name).toBe('pedro gatinho');
    });
  });
});
