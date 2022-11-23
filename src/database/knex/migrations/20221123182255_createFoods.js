exports.up = knex => knex.schema.createTable("foods", table => {
  table.increments("id");
  table.text("category");
  table.text("picture");
  table.text("name");
  table.text("ingredients");
  table.decimal("price", 10,2);
  table.text("description");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("foods");