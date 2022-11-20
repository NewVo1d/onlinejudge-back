// test/controller/user.test.ts
import {close, createApp, createHttpRequest} from '@midwayjs/mock';
import {Application, Framework} from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

  let app: Application;

  beforeAll(async () => {
    try {
      app = await createApp<Framework>();
    } catch(err) {
      throw err;
    }
  });

  afterAll(async () => {
    await close(app);
  });

  // get
  it('GET /api/test/get', async () => {
    const result = await createHttpRequest(app).get('/api/test/get');
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(100000);
    expect(result.body.msg).toBe('OK');
    expect(result.body.data).toBe('This is a GET Method');
  });

  // post
  it('POST /api/test/post', async () => {
    const result = await createHttpRequest(app).post('/api/test/post');
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(100000);
    expect(result.body.msg).toBe('OK');
    expect(result.body.data).toBe('This is a POST Method');
  });
});