import express from 'express';
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";
import { recipesInfo } from "./Routes/controlRecipes.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


pool.connect()
    .then((client) => {
        console.log(`Connected to postgres using connection string ${process.env.DATABASE_URL}`);
        client.release();
    })
    .catch((err)=>{
        console.log("Failed to connect to postgres: ", err.message);
    })


const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'https://purebites.vercel.app/'
}));

const recipes = recipesInfo(pool);

app.get("/api/recipes", recipes.getAllRecipes);
app.get("/api/recipes/:id", recipes.getSingleRecipes);
app.get("/api/recipes/:id/featured", recipes.randomRecipe);

app.post("/api/recipes", recipes.createRecipe);
app.patch("/api/recipes/:id", recipes.updateRecipe);

app.delete("/api/recipes/:id", recipes.deleteRecipe);

app.use((err, req, res, next) => {
    console.log("Something went wrong", err);
    res.sendStatus(500);
});

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
