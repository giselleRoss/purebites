const recipesInfo = (pool) => {
  //get all recipes
  const getAllRecipes = async (req, res, next) => {
    console.log("Getting recipes");
    const allRecipes = "SELECT * FROM recipes";
    try {
      const data = await pool.query(allRecipes);
      console.log(data.rows);
      res.json(data.rows);
    } catch (err) {
      next(err);
    }
  };

  //get recipes by ID
  const getSingleRecipes = async (req, res, next) => {
    let id = req.params.id;
    console.log("Getting recipe #", id);
    const selectRecipe = "SELECT * FROM recipes WHERE id = $1";
    try {
      const data = await pool.query(selectRecipe, [id]);
      console.log(data.rows);
      if (data.rows === 0) {
        res.sendStatus(404);
        return;
      }
      res.json(data.rows);
    } catch (err) {
      next(err);
    }
  };

  //add new recipes
  const createRecipe = async (req, res, next) => {
    const { name, allergens, instructions } = req.body;
    const ingredients = req.body.ingredients;
    const calories = Number.parseInt(req.body.calories);
    console.log(
      `Name: ${name}, Allergens: ${allergens}, Calories: ${calories}, Ingredients: ${ingredients}, Instructions: ${instructions}`
    );
    if (Number.isNaN(calories) || !Array.isArray(ingredients)) {
      res.sendStatus(400);
      return;
    }
    console.log(
      `Creating recipe with Name: ${name}, Allergens: ${allergens}, Calories: ${calories}, Ingredients: ${ingredients}, Instructions: ${instructions}`
    );
    const newRecipe = `INSERT INTO recipes (name, allergens, calories, ingredients, instructions)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    try {
      const data = await pool.query(newRecipe, [
        name,
        allergens,
        calories,
        ingredients,
        instructions,
      ]);
      console.log("Created new recipe:\n", data.rows[0]);
      const recipe = data.rows[0];
      res.json(recipe);
    } catch (err) {
      next(err);
    }
  };

  const updateRecipe = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    console.log(`Updating recipe with id: ${id}`);
    const { name, allergens, instructions, is_default } = req.body;
    const ingredients = req.body.ingredients;
    const calories = Number.parseInt(req.body.calories);
    console.log(
      `Name: ${name}, Allergens: ${allergens}, Calories: ${calories}, Ingredients: ${ingredients}, Instructions: ${instructions}`
    );
    if (Number.isNaN(calories) || !Array.isArray(ingredients)) {
      res.sendStatus(400);
      return;
    } else if (is_default) {
      res.sendStatus(403).json({ error: "Default recipe cannot be modified" });
      return;
    }
    console.log(`Updating recipe with ID: ${id}`);
    const recipeChange =
      "UPDATE recipes SET name = COALESCE($1, name), allergens = COALESCE($2, allergens), calories = COALESCE($3, calories), ingredients = COALESCE($4, ingredients), instructions = COALESCE($5, instructions) WHERE id = $6 RETURNING *";
    try {
      const data = await pool.query(recipeChange, [
        name,
        allergens,
        calories,
        ingredients,
        instructions,
        id,
      ]);
      if (data.rows.length === 0) {
        res.sendStatis(400);
        return;
      }
      console.log(`Updating recipe... ${data.rows[0]}`);
      res.json(data.rows[0]);
    } catch (err) {
      next(err);
    }
  };

  const deleteRecipe = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const recipe = await getRecipeById(id);
    console.log(id);
    if (Number.isNaN(id)) {
      res.sendStatus(400);
      return;
    }
    if (!recipe) {
      res.status(404).json({ error: "Recipe not found." });
      return;
    }

    if (recipe.is_default) {
      res.status(403).json({ error: "Default recipes cannot be deleted." });
      return;
    }
    console.log(`Deleting recipe with ID: ${id}`);

    const removeRecipe = "DELETE FROM recipes WHERE id = $1 RETURNING *";

    try {
      const data = await pool.query(removeRecipe, [id]);

      if (data.rows.length === 0) {
        console.log(`No recipes found with ID: ${id}`);
        res.sendStatus(404);
        return;
      }

      console.log(`Deleted recipe with ID: ${id}`);
      res.json(data.rows[0]);
    } catch (err) {
      console.error("Error deleting recipe:", err.message);
      next(err);
    }
  };

  const randomRecipe = async (req, res, next) => {
      try {
        const id = req.params.id;
        const selectRecipe = "SELECT * FROM recipes WHERE is_default = true ORDER BY RANDOM() LIMIT 1";
        const data = await pool.query(selectRecipe);
        if (data.rows.length === 0) {
          res.sendStatus(404);
          return;
        }
        res.json(data.rows[0]);
      } catch (err) {
        next(err);
      }
  };

  return {
    getAllRecipes,
    getSingleRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    randomRecipe
  };
};

export { recipesInfo };
