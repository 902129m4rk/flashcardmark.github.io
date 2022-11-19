import { Request, Response } from "express";
import Deck from '../models/Deck';

export async function getDeckController(req: Request, res: Response){
const { deckId } = req.params;
 //fetch decks to mongodb
 const deck = await Deck.findById(deckId);
 //send back the array to the ui
 res.json(deck);
}