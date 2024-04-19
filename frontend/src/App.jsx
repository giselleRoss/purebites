import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./App.css";
import Header from "./components/Header";
import FeaturedRecipe from "./components/FeaturedRecipe";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import CreateRecipeForm from "./components/CreateRecipeForm"


function App() {
  const [recipes, setRecipes] = useState([]);
  const [singleRecipe, setSingleRecipe] = useState(null);
  const [showCreateRecipeForm, setShowCreateRecipeForm] = useState(false);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [featuredClicked, setFeaturedClicked] = useState(false);
  const [showRecipeList, setShowRecipeList] = useState(false); 

const BASE_URL = import.meta.VITE_BACKEND_URL;
  
  const getSingleRecipe = async (id) => {
    const res = await fetch(`/api/recipes/${id}`);
    const data = await res.json();
    console.log("This is the data ", data)
    setSingleRecipe(data);
  };

  const getRecipes = async () => {
    try {
      const res = await fetch(`https://purebites-1.onrender.com/api/recipes`);
      console.log(res)
      const data = await res.json();
      console.log("This is the data ", data)
      setRecipes(data);
    } catch (err) {
      console.log("Couldn't get data!");
    }
  };
console.log("These are the recipes;", recipes)
  
  const getFeaturedRecipes = async () => {
    try {
      const res = await fetch(`https://purebites-1.onrender.com/api/recipes/:id/featured`);
      console.log(res)
      const data = await res.json();
      console.log("This is the data ", data)
      setFeaturedRecipe(data);
    } 
    catch (err) {
      console.log("Couldn't get data!");
    }
  };


  useEffect(() => {
    getRecipes();
  }, []);

  const createRecipe = async (recipe) => {
    try {
      const res = await fetch(`https://purebites-1.onrender.com/api/recipes`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Error creating recipe:", err);
    }
  }


  const handleFeaturedClick = () => {
    setFeaturedClicked(true);
  };

  const handleHomeClick = () => {
    setFeaturedClicked(false);
  };
  const handleMenuClick = (item) => {
    if (item.key === '1') {
      console.log('See all recipes clicked');
      setShowRecipeList(true);
      setFeaturedClicked(false);
    } else if (item.key === '2') {
      console.log('Add your own recipes clicked');
      setShowCreateRecipeForm(true);
      setFeaturedClicked(false);
    } else if (item.key === '3') {
      console.log('See your saved recipes');
    }
  };

  let mainContent;
  if (showRecipeList === true && !featuredClicked) {
    mainContent = <RecipeList recipes={recipes} />;
  } else if (showCreateRecipeForm) {
    mainContent = (
      <CreateRecipeForm
      createRecipe={createRecipe}
        featuredClicked={featuredClicked}
        setFeaturedClicked={setFeaturedClicked}
        featuredRecipe={featuredRecipe}
        setShowCreateRecipeForm={setShowCreateRecipeForm}
      />
    );
  } else if (featuredClicked) {
    mainContent = (
      <RecipeDetails
        handleHomeClick={handleHomeClick}
        featuredRecipe={featuredRecipe}
        setFeaturedClicked={setFeaturedClicked}
      />
    );
  } else {
    mainContent = (
      <div className="featured-recipe-container">
        <FeaturedRecipe
          handleHomeClick={handleHomeClick}
          setFeaturedRecipe={setFeaturedRecipe}
          getFeaturedRecipes={getFeaturedRecipes}
          featuredRecipe={featuredRecipe}
          handleFeaturedClick={handleFeaturedClick}
        />
      </div>
    );
  }


  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Sidebar
          className="sidebar"
          handleMenuClick={handleMenuClick}
          showRecipeList={showRecipeList}
          setShowRecipeList={setShowRecipeList}
          setSingleRecipe={getSingleRecipe}
          recipes={recipes}
          setRecipes={setRecipes}
          handleFeaturedClick={handleFeaturedClick}
        />
        {mainContent}
      </div>
      <Footer />
    </div>
  );
}
export default App;