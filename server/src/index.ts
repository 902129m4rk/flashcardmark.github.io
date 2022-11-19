import express, { Request, Response } from "express";
import mongoose  from "mongoose";
import { config } from 'dotenv';
config();
import cors from 'cors';
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardforDeckController } from "./controllers/createCardforDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardonDeckController } from "./controllers/deleteCardonDeckController";

const PORT = 5000;//localhost port

//cors
const app = express();
app.use(cors({
    origin: '*'
}));

app.use(express.json());//middleware function

//fetch all decks / get api
app.get("/decks", getDecksController)
//delete api
app.delete("/decks/:deckId", deleteDeckController);
//post api
app.post('/decks', createDeckController);
//create card for Deck
app.post('/decks/:deckId/cards', createCardforDeckController);
//get cards
app.get('/decks/:deckId', getDeckController);
//delete cards
app.delete('/decks/:deckId/card/:index', deleteCardonDeckController);
// connect to database
mongoose.connect(process.env.MONGO_URL!).then(() =>{
console.log(`listening to port: ${PORT}`); 
app.listen(PORT);
});
