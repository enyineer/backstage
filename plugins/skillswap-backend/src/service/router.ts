import { errorHandler } from '@backstage/backend-common';
import { DiscoveryService, HttpAuthService, LoggerService, UserInfoService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { Knex } from 'knex';

export interface RouterOptions {
  logger: LoggerService;
  databaseClient: Knex;
  httpAuth: HttpAuthService;
  userInfo: UserInfoService;
  discovery: DiscoveryService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, httpAuth, userInfo } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/something', async (req, res) => {
    const credentials = await httpAuth.credentials(req, {
      // This rejects request from non-users. Only use this if your plugin needs to access the
      // user identity, most of the time it's enough to just call `httpAuth.credentials(req)`
      allow: ['user'],
    });

    const user = await userInfo.getUserInfo(credentials);
  });

  router.use(errorHandler());
  return router;
}
