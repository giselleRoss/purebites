import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./App.css";
import Header from "./components/Header";
import FeaturedRecipe from "./components/FeaturedRecipe";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [singleRecipe, setSingleRecipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [featuredClicked, setFeaturedClicked] = useState(false);


  useEffect(() => {
    getRecipes();
  }, []);

  
  const getSingleRecipe = async (id) => {
    const res = await fetch(`http://localhost:3000/api/recipes/${id}`);
    const data = await res.json();
    setSingleRecipe(data);
  };

  const getRecipes = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/recipes`);
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.log("Couldn't get data!");
    }
  };
  const getFeaturedRecipes = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/recipes/:id/featured`);
      const data = await res.json();
      console.log(data);
      setFeaturedRecipe(data);
    } 
    catch (err) {
      console.log("Couldn't get data!");
    }
  };

  const handleFeaturedClick = () => {
    setFeaturedClicked(true);
  };

  const handleHomeClick = () => {
    setFeaturedClicked(false);
  };



  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Sidebar
          className="sidebar"
          setSingleRecipe={getSingleRecipe}
          recipes={recipes}
          setRecipes={setRecipes}
          handleFeaturedClick={handleFeaturedClick}
        />
        {featuredClicked ? (
          <RecipeDetails
          handleHomeClick={handleHomeClick}
            featuredRecipe={featuredRecipe}
            setFeaturedClicked={setFeaturedClicked}
          />
        ) : (
          <div className="featured-recipe-container">
            <FeaturedRecipe
            handleHomeClick={handleHomeClick}
              setFeaturedRecipe={setFeaturedRecipe}
              getFeaturedRecipes={getFeaturedRecipes}
              featuredRecipe={featuredRecipe}
              handleFeaturedClick={handleFeaturedClick}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}


export default App;