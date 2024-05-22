import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';
import { applyDatabaseMigrations } from './database/migrations';
import { Model } from 'objection';

/**
 * skillswapPlugin backend plugin
 *
 * @public
 */
export const skillswapPlugin = createBackendPlugin({
  pluginId: 'skillswap',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        database: coreServices.database,
        httpAuth: coreServices.httpAuth,
        userInfo: coreServices.userInfo,
        discovery: coreServices.discovery,
      },
      async init({
        httpRouter,
        logger,
        database,
        httpAuth,
        userInfo,
        discovery,
      }) {
        const databaseClient = await database.getClient();

        Model.knex(databaseClient);

        // apply the migration(s)
        if (!database.migrations?.skip) {
          logger.info("Applying db migrations for SkillSwap")
          await applyDatabaseMigrations(databaseClient);
          logger.info("Done applying db migrations for SkillSwap")
        }

        httpRouter.use(
          await createRouter({
            logger,
            databaseClient,
            httpAuth,
            userInfo,
            discovery,
          }),
        );

        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
