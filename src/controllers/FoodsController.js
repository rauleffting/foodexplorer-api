const knex = require("../database/knex");

class FoodsController {
  async create(request, response) {
    const { category, name, ingredients, price, description } = request.body;

    const food_id = await knex("foods").insert({
      category,
      name,
      price,
      description
    });

    const ingredientsInsert = ingredients.map(name => {
      return {
        food_id,
        name
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const food = await knex("foods").where({ id }).first();
    const ingredients = await knex("ingredients").where({ food_id: id}).orderBy("name");

    return response.json({
      ...food,
      ingredients
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("foods").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { name, ingredients } = request.query;

    let foods;

    if(ingredients) {

      const filterIngredients = ingredients.split(',').map(tag => tag.trim());

      foods = await knex("ingredients")
        .select([
          "foods.id",
          "foods.name",
        ])
        .whereLike("foods.name", `%${name}%`)
        .whereIn("name", filterIngredients) 
        .innerJoin("foods", "foods.id", "ingredients.food_id")
        .orderBy("foods.name")
    } else {
      foods = await knex("foods")
      .whereLike("name", `%${name}%`)
    }

    const foodsIngredients = await knex("ingredients");
    const foodsWithIngredients = foods.map(food => {
      const foodIngredient = foodsIngredients.filter(ingredient => ingredient.food_id === food.id);

      return {
        ...food,
        ingredients: foodIngredient
      }
    })

    return response.json(foodsWithIngredients);
  }
}

module.exports = FoodsController;