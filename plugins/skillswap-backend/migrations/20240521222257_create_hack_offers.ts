import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('hack_offers', table => {
    table.string('author_ref').notNullable().index();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.enum('level', ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).notNullable();
    table.increments('id').primary();
  });

  await knex.schema.createTable('hack_offer_assigned_topics', table => {
    table
      .integer('hack_offer_id')
      .notNullable()
      .references('hack_offers.id')
      .onDelete('CASCADE');
    table
      .integer('topic_id')
      .notNullable()
      .references('hack_offer_topics.id')
      .onDelete('CASCADE');
    table.primary(['hack_offer_id', 'topic_id']);
  });

  await knex.schema.createTable('hack_offer_topics', table => {
    table.string('topic').notNullable().index().unique();
    table.increments('id').primary();
  });

  await knex.schema.createTable('hack_offer_meetings', table => {
    table.datetime('start_date').notNullable();
    table.datetime('end_date').notNullable();
    table.string('location').notNullable();
    table
      .integer('hack_offer_id')
      .notNullable()
      .references('hack_offers.id')
      .onDelete('CASCADE');
    table.increments('id').primary();
  });

  await knex.schema.createTable('hack_offer_meeting_attendees', table => {
    table
      .integer('hack_offer_meeting_id')
      .notNullable()
      .references('hack_offer_meetings.id')
      .onDelete('CASCADE');
    table.string('attendee_ref').notNullable();
    table.integer('id').primary();
    table.unique(['hack_offer_meeting_id', 'attendee_ref']);
    table.enum('status', ['PENDING', 'ACCEPTED', 'REJECTED']).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('hack_offers');
  await knex.schema.dropTable('hack_offer_assigned_topics');
  await knex.schema.dropTable('hack_offer_topics');
  await knex.schema.dropTable('hack_offer_meetings');
  await knex.schema.dropTable('hack_offer_meeting_attendees');
}
