import { Knex } from 'knex';
import { resolvePackagePath } from '@backstage/backend-plugin-api';

// To create new migrations, run knex migrate:make -x ts --migrations-directory migrations <migration_name>

export async function applyDatabaseMigrations(knex: Knex): Promise<void> {
  const migrationsDir = resolvePackagePath(
    '@internal/backstage-plugin-skillswap-backend',
    'migrations',
  );

  await knex.migrate.latest({
    directory: migrationsDir,
  });
}
