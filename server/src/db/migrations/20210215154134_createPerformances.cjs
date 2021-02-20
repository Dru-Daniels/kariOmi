/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('performances', table => {
    table.bigIncrements('id')
    table.integer('stagePresence')
    table.integer('vocalPerformance')
    table.integer('audienceReaction')
    table.integer('numOfDrinks')
    table.string('venue')
    table.text('notes')
    table.text('videoFile')
    table.bigInteger('userId').notNullable().unsigned().index().references('users.id')
    table.bigInteger('songId').notNullable().unsigned().index().references('songs.id')
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('performances')
}