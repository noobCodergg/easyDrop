/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable("transactions", function (table) {
      table.increments("id").primary(); // Auto-increment ID
      table.date("date").notNullable(); // Transaction date
      table.string("category_name").notNullable(); // Category ID (FK)
      table.decimal("credit", 10, 2).defaultTo(0.00); // Credit amount
      table.decimal("debit", 10, 2).defaultTo(0.00); // Debit amount
      table.string("type").notNullable(); // Transaction type (credit/debit)
      table.string("remarks", 255).nullable(); // Remarks
      table.integer("created_by").unsigned().notNullable(); // Created by (User ID)
      table.timestamp("created_at").defaultTo(knex.fn.now()); // Created time
      table.integer("updated_by").unsigned().nullable().defaultTo(null); // Updated by (User ID), default NULL
      table.timestamp("updated_at").nullable().defaultTo(null); // Updated time, default NULL
      table.boolean("status").defaultTo(true); // Status (active/inactive)
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("transactions");
  };