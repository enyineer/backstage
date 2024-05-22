import { getVoidLogger } from '@backstage/backend-common';
import { TestDatabases, mockServices } from '@backstage/backend-test-utils';
import express from 'express';
import request from 'supertest';

import { createRouter } from './router';

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const databaseClient = await TestDatabases.create().init('POSTGRES_16');

    const router = await createRouter({
      logger: getVoidLogger(),
      databaseClient,
      discovery: mockServices.discovery(),
      httpAuth: mockServices.httpAuth(),
      userInfo: mockServices.userInfo(),
    });
    
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /health', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
