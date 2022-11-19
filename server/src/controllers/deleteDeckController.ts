import { Request, Response } from "express";
import Deck from '../models/Deck';

export async function deleteDeckController(req: Request, res: Response){
     //get id and delete in mongodb, and return the deleted deck
     const deckId = req.params.deckId;
     const deck = await Deck.findByIdAndDelete(deckId);
     res.json(deck);
}