import RecipeItems from './RecipeItems'

const Recipes = ({recipes, getSingleRecipe}) => {
    return recipes.map((recipe, index) => (
        <RecipeItems recipe={recipe} key={recipe.id} getSingleRecipe={getSingleRecipe} />
    ))
}

export default Recipes