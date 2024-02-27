const RecipeItems = ({recipes, getSingleRecipe}) => {
    const handleClick = (e) => {
        const id = recipes.id;
        getSingleRecipe(id);
    }
    return (
        <div onClick={handleClick}>
            <h1>{recipes.name}</h1>
        </div>
    )
}

export default RecipeItems;