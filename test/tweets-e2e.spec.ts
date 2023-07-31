import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('Tweet Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('POST /tweets', async () => {
    const response = await request(app.getHttpServer())
      .post('/tweets')
      .send({
        content: 'oi bia gatinha',
        screen_name: 'pedro gatinho',
      })
      .expect(201);

    expect(response.body._id).toBeDefined();
    expect(response.body).toMatchObject({
      content: 'oi bia gatinha',
      screen_name: 'pedro gatinho',
    });
  });
});
