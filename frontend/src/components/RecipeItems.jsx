import React from "react";

const RecipeItems = ({recipe, getSingleRecipe}) => {
    const handleClick = (e) => {
        const id = recipe.id;
        getSingleRecipe(id);
    }
    return (
        <div onClick={handleClick}>
            <h1>{recipe.name}</h1>
            <h2>Calories: {recipe.calories} Allergens: {recipe.allergens}</h2>
        </div>
    )
}

export default RecipeItems;