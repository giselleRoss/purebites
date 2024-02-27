import React, { useState } from 'react';

const CreateRecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    allergens: '',
    calories: '',
    ingredients: '',
    instructions: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in recipeData) {
      formData.append(key, recipeData[key]);
    }

    try {
      const res = await fetch('http://localhost:3000/api/recipes/', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        console.log('Recipe created successfully');
        // Optionally, reset the form or handle success in other ways
      } else {
        console.log('Failed to create recipe');
      }
    } catch (err) {
      console.error('Error creating recipe:', err);
    }
  };

  return (
    <section className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="text-black">Name</label>
        <input
          type="text"
          name="name"
          value={recipeData.name}
          onChange={handleChange}
        />

        <label className="text-black">Allergens (optional)</label>
        <input
          type="text"
          name="allergens"
          value={recipeData.allergens}
          onChange={handleChange}
        />

        <label className="text-black">Calories (optional)</label>
        <input
          type="text"
          name="calories"
          value={recipeData.calories}
          onChange={handleChange}
        />

        <label className="text-black">Ingredients</label>
        <textarea
          name="ingredients"
          value={recipeData.ingredients}
          onChange={handleChange}
        ></textarea>

        <label className="text-black">Instructions</label>
        <textarea
          name="instructions"
          value={recipeData.instructions}
          onChange={handleChange}
        ></textarea>

        <label className="text-black">Image (optional)</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Create Recipe</button>
      </form>
    </section>
  );
};

export default CreateRecipeForm;
