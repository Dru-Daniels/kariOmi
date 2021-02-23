/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('performances', (table) => {
    table.decimal('performanceScore')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('performances', (table) => {
    table.dropColumn('performanceScore')
  })
}