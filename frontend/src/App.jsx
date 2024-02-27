import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CreateRecipeForm from './components/CreateRecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';
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

  return (
    <>
      <div className='featured'>
        <FeaturedRecipe recipes={recipes} setFeaturedRecipe={setFeaturedRecipe} featuredRecipe={featuredRecipe} />
      </div>
    </>
  );
}

export default App;