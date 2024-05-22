import { errorHandler } from '@backstage/backend-common';
import { DiscoveryService, HttpAuthService, LoggerService, UserInfoService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { Knex } from 'knex';
import { getHackOffersRouter } from '../controllers/hackOffers';

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

  router.use(getHackOffersRouter({
    httpAuth,
    userInfo,
    logger,
  }));

  router.use(errorHandler());
  return router;
}
