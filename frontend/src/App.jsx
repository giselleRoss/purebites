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

  const createRecipe = (recipe) => {

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