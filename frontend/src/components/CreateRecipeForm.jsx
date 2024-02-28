import { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    recipeName: '',
    calories: '',
    allergens: '',
    ingredients: [''],
    instructions: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Form>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="recipeName">Recipe Name</Label>
            <Input
              id="recipeName"
              name="recipeName"
              placeholder="Enter Recipe Name"
              type="text"
              value={formData.recipeName}
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
              value={formData.calories}
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
          value={formData.allergens}
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
          value={formData.ingredients}
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
          value={formData.instructions}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          placeholder="Enter Image URL"
          type="text"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </FormGroup>
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
  );
};

export default RecipeForm;
