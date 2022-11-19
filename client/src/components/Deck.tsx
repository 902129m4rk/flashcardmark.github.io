import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createCard } from '../api/createCard';
import { TDeck } from '../api/getDecks';
import { getDeck } from '../api/getDeck';
import '../App.css'
import { deleteCard } from '../api/deleteCard';
export default function Deck(){

    const [deck, setDeck] = useState<TDeck | undefined>();
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState('');
    const { deckId } = useParams();
  
    //create
    async function handleCreateCard(e: React.FormEvent){
      e.preventDefault();
      const {cards: serverCards} = await createCard(deckId!, text);
      setCards(serverCards);
      setText("");
    }
  
  //delete deck
    async function handleDeleteCard(index: number) {
        if (!deckId) return;
      const newDeck = await deleteCard(deckId, index);
      setCards(newDeck.cards);
      //refetch or optimization update
    //   setDecks(decks.filter((deck) => deck._id !== deckId));
    }
  
  //display data in ui
    useEffect(() => {
      async function fetchDeck(){
        if(!deckId) return;
        const newDeck = await getDeck(deckId);
        setDeck(newDeck);
        setCards(newDeck.cards);
      };
      fetchDeck();
    }, [deckId]);
  
    return (
      <div className="App">
        <h1>{deck?.title}</h1>
       <ul className="cards">
          {cards.map((card, index) => (
              <li key={index}>
                <button onClick={() => handleDeleteCard(index)}>X</button>
                 {card}
                </li>
            ))}
      </ul>
  
        <form onSubmit={handleCreateCard} >
          <label htmlFor="card-text">Card Text </label>
          <div className="input-wrapper">
          <input 
          className="input"
          id="card-text" 
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //type save
          { 
            setText(e.target.value);
          }}
          />
          </div>
          <button>Create Deck</button>
        </form>
      </div>
    );
}