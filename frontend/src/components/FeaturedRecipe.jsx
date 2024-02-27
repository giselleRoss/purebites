import React, { useState,useEffect } from "react";


const FeaturedRecipe = ({recipes, setFeaturedRecipe, featuredRecipe}) => {
    //take the recipes we fetch, select a random one when page is rendered to feature
    useEffect(() => {
        getFeaturedRecipes();
      }, []);
    
      const getFeaturedRecipes = async (id) => {
        try {
          const res = await fetch(`http://localhost:3000/api/recipes/${id}/featured`);
          const data = await res.json();
          console.log(data);
          setFeaturedRecipe(data);
        } 
        catch (err) {
          console.log("Couldn't get data!");
        }
      };

      const handleFeaturedClick = async (e) => {
        try {
          // Check if there is already a featured recipe
          if (featuredRecipe) {
            const id = recipes.id;
            const data = await getFeaturedRecipes(id);
            setFeaturedRecipe(data);
          }
        } catch (error) {
          console.log("Error fetching featured recipe:", error);
        }
      };
      
      
      

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
          {featuredRecipe && (
            <>
              <img src={featuredRecipe.image_url} alt={featuredRecipe.name} style={imageStyle} />
              <h2>{featuredRecipe.name}</h2>
              <p>Allergens: {featuredRecipe.allergens}</p>
            </>
          )}
        </div>
      );

}

export default FeaturedRecipe;