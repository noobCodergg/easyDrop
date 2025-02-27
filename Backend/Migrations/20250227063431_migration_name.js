/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable("transactions", function (table) {
      table.increments("id").primary(); 
      table.date("date").notNullable(); // Transaction date
      table.integer("category_id").unsigned().notNullable(); 
      table.decimal("credit", 10, 2).defaultTo(0.00); 
      table.decimal("debit", 10, 2).defaultTo(0.00);
      table.string("type").notNullable(); 
      table.string("remarks", 255).nullable(); 
      table.integer("created_by").unsigned().notNullable(); 
      table.timestamp("created_at").defaultTo(knex.fn.now()); 
      table.integer("updated_by").unsigned().nullable().defaultTo(null); 
      table.timestamp("updated_at").nullable().defaultTo(null); 
      table.boolean("status").defaultTo(true); 
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("transactions");
  };
