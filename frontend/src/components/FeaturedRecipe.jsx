import React, { useState,useEffect } from "react";
import RecipeDetails from "./RecipeDetails";


const FeaturedRecipe = ({getFeaturedRecipes, featuredRecipe, featuredClicked, setFeaturedClicked, handleFeaturedClick, handleHomeClick}) => {

    //take the recipes we fetch, select a random one when page is rendered to feature
    useEffect(() => {
        getFeaturedRecipes();
      }, []);

    
      const recipeStyle = {
        border: '2px solid #ccc',
        borderRadius: '15px',
        padding: '20px',
        margin: '20px',
        width: '300px', 
        textAlign: 'center',
      };
    
      const imageStyle = {
        width: '100%',
        height: '200px', 
        objectFit: 'cover',
        borderRadius: '10px',
        marginBottom: '10px',
      };
    return (
      <div style={recipeStyle} onClick={handleFeaturedClick}>
      {featuredRecipe && !featuredClicked && (
        <>
          <img src={featuredRecipe.image_url} alt={featuredRecipe.name} style={imageStyle} />
          <h2>{featuredRecipe.name}</h2>
          <p>Allergens: {featuredRecipe.allergens}</p>
          <p>Calories: {featuredRecipe.calories}</p>
        </>
      )}
      {featuredClicked && <RecipeDetails featuredClicked={featuredClicked} setFeaturedClicked={setFeaturedClicked} featuredRecipe={featuredRecipe} />}
    </div>
    )

};

export default FeaturedRecipe;