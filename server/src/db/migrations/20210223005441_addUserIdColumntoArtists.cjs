/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('artists', (table) => {
    table.bigInteger('userId').notNullable().unsigned().index().references('artists.id')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('artists', (table) => {
    // table.dropColumn('performanceScore')
  })
}