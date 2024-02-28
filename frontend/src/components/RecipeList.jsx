import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const RecipeList = ({ recipes, getSingleRecipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSeeRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };
  return (
    <>
      {recipes.map((recipeObject) => {
        return (
          <div className="card-flex" key={recipeObject.id}>
            <Card
              color="success"
              outline
              style={{
                width: '18rem',
              }}
            >
              <img alt={recipeObject.name} src={recipeObject.image_url} />
              <CardBody>
                <CardTitle tag="h5">{recipeObject.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Allergens: {recipeObject.allergens}
                </CardSubtitle>
                <CardText>Calories: {recipeObject.calories}</CardText>
                <Button onClick={() => handleSeeRecipeClick(recipeObject)}>
                  See Recipe
                </Button>
              </CardBody>
            </Card>
          </div>
        );
      })}

      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          // Pass any other props or data needed by RecipeDetails
        />
      )}
    </>
  );
};

export default RecipeList;