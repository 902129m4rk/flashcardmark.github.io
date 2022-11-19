import { Request, Response } from "express";
import Deck from '../models/Deck';

export async function createCardforDeckController(req: Request, res: Response){
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if(!deck) return res.status(400).send('No ID');
    const { text } = req.body;

    deck.cards.push(text);
    await deck.save();

    const newDeck = new Deck({
        title: req.body.title,
    });
   const createdDeck = await newDeck.save();
   res.json(createdDeck);
}