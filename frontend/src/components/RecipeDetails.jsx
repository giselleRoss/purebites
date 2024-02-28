import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg, 
  Button
} from "reactstrap";

const RecipeDetails = ({featuredRecipe, handleHomeClick}) => {

  let list = (
    <div>
      <CardTitle tag="h5" className="title">
        Ingredients:
      </CardTitle>
      <ol type="1">
        {featuredRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ol>
    </div>
  );
  
  let instructionsList = (
    <div>
      <CardTitle tag="h5" className="title">
        Instructions:
      </CardTitle>
      <ol type="1">
        {featuredRecipe.instructions.split('\n').map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );

  return (
    <>
      <Card className="my-2" style={{ textAlign: 'left' }}>
        <CardImg
          alt={featuredRecipe.name}
          src={featuredRecipe.image_url}
          className="recipe-image"
        />
        <CardBody>
          <CardTitle tag="h5" className="title">
            {featuredRecipe.name}
          </CardTitle>
          <CardText className="text">
            Allergens: {featuredRecipe.allergens}
          </CardText>
        </CardBody>
      </Card>
      <Card className="my-2" style={{ textAlign: 'left' }}>
        <CardBody>
          {list}
          {instructionsList}
          <CardText className="text">
            <small className="text-muted">
              Calories: {featuredRecipe.calories}
            </small>
          </CardText>
        </CardBody>
        <Button onClick={handleHomeClick}>Return home</Button>
      </Card>
    </>
  );
};


export default RecipeDetails;