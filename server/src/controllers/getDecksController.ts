import { Request, Response } from "express";
import Deck from '../models/Deck';

export async function getDecksController(req: Request, res: Response){
 //fetch decks to mongodb
 const decks = await Deck.find();
 //send back the array to the ui
 res.json(decks);
}