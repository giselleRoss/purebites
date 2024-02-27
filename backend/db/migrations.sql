DROP TABLE IF EXISTS Recipes;

CREATE TABLE Recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    allergens VARCHAR(255),
    calories INTEGER,
    ingredients TEXT[] NOT NULL,
    instructions TEXT NOT NULL,
    image_url VARCHAR(255),
    is_default BOOLEAN DEFAULT false
);