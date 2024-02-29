import { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const RecipeForm = ({createRecipe}) => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    calories: "",
    allergens: "",
    ingredients: [],
    instructions: "",
    // imageUrl: '',
  })

  
  const handleChange = (e) => {
    setNewRecipe({...newRecipe, [e.target.name]: e.target.value})
  };

  const handleSubmit = () => {
    createRecipe(newRecipe)
  };

  return (
    <div>

      <Form style={{ padding: '20px' }}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="name">Recipe Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter Recipe Name"
              type="text"
              value={newRecipe.name}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="calories">Calories</Label>
            <Input
              id="calories"
              name="calories"
              placeholder="Enter Calories"
              type="text"
              value={newRecipe.calories}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="allergens">Allergens</Label>
        <Input
          id="allergens"
          name="allergens"
          placeholder="Enter Allergens"
          type="text"
          value={newRecipe.allergens}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="ingredients">Ingredients</Label>
        <Input
          id="ingredients"
          name="ingredients"
          placeholder="Enter Ingredients"
          type="text"
          value={newRecipe.ingredients}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="instructions">Instructions</Label>
        <Input
          id="instructions"
          name="instructions"
          placeholder="Enter Instructions"
          type="text"
          value={newRecipe.instructions}
          onChange={handleChange}
        />
      </FormGroup>
      {/* <FormGroup>
        <Label for="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          placeholder="Enter Image URL"
          type="text"
          value={newRecipe.imageUrl}
          onChange={handleChange}
        />
      </FormGroup> */}
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
    </div>
  );
};

export default RecipeForm;
