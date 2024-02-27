import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CreateRecipeForm from './components/CreateRecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';
import Header from "./components/Header"
import FeaturedRecipe from './components/FeaturedRecipe'

function App() {
  const [recipes, setRecipes] = useState([]);
  const [singleRecipe, setSingleRecipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [featuredRecipe, setFeaturedRecipe] = useState(null)

  useEffect(() => {
    getRecipes();
  }, []);

  
  // const getSingleRecipe = async (id) => {
  //   const res = await fetch(`http://localhost:3000/api/recipes/${id}`);
  //   const data = await res.json();
  //   setSingleRecipe(data);
  // };

  const getRecipes = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/recipes`);
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.log("Couldn't get data!");
    }
  };

  const handleButtonClick = (buttonName) => {
    // Handle button click logic
    console.log(`Button Clicked: ${buttonName}`);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Sidebar className="sidebar" handleButtonClick={handleButtonClick} />
        <div className="featured-recipe-container">
          <FeaturedRecipe recipes={recipes} setFeaturedRecipe={setFeaturedRecipe} featuredRecipe={featuredRecipe} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;