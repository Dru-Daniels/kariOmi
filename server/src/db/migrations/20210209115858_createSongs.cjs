/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('songs', table => {
      table.bigIncrements('id')
      table.string('songTitle').notNullable()
      table.string('karaokeVideoId')
      table.string('lyricVideoId')
      table.text('lyrics')
      table.text('practiceNotes')
      table.boolean('performanceReady').notNullable()
      table.bigInteger('artistId').notNullable().unsigned().index().references('artists.id')
      table.bigInteger('userId').notNullable().unsigned().index().references('users.id')
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
    })
}

/**
* @param {Knex} knex
*/
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('songs')
}