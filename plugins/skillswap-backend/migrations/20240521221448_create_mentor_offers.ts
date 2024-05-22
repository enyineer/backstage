import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('mentor_offers', table => {
    table.string('author_ref').notNullable().index();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.increments('id').primary();
  });

  await knex.schema.createTable('mentor_offer_assigned_topics', table => {
    table.integer('mentor_offer_id').references('mentor_offers.id').onDelete('CASCADE');
    table.integer('topic_id').references('mentor_offer_topics.id').onDelete('CASCADE');
    table.primary(['mentor_offer_id', 'topic_id']);
  });

  await knex.schema.createTable('mentor_offer_topics', table => {
    table.string('topic').notNullable().unique().index();
    table.increments('id').primary();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('mentor_offers');
  await knex.schema.dropTable('mentor_offer_assigned_topics');
  await knex.schema.dropTable('mentor_offer_topics');
}
