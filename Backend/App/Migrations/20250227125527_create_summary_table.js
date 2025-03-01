/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("summary", (table) => {
      table.integer("id").primary().defaultTo(1);
      table.decimal("total_credit", 10, 2).defaultTo(0);
      table.decimal("total_debit", 10, 2).defaultTo(0);
      table.decimal("total_balane",10,2).defaultTo(0)
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};