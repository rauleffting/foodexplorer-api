const knex = require("../database/knex");

class FoodsController {
  async create(request, response) {
    const { category, name, ingredients, price, description } = request.body;

    await knex("foods").insert({
      category,
      name,
      ingredients,
      price,
      description
    });

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const food = await knex("foods").where({ id }).first();

    return response.json({
      ...food
    });
  }
}

module.exports = FoodsController;