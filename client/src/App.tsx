import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { createDeck } from './api/createDeck';
import { deleteDeck } from './api/deleteDeck';
import { getDecks, TDeck } from './api/getDecks';
import './App.css'

function App() {

  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState('');

  //create
  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks,deck]);
    setTitle("");
  }

//delete deck
  async function handleDeleteDeck(deckId: String){
    await deleteDeck(deckId);
    //refetch or optimization update
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

//display data in ui
  useEffect(() => {
    async function fetchDecks(){
      const newDecks = await getDecks();
      setDecks(newDecks);
    };
    fetchDecks();
  }, [])

  return (
    <div className="container">
    <div className="App">
      <h1>Your Decks</h1>
      <div className="decks">
        {
          decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link> 
              </li>
          ))
        }
      </div>

      <form onSubmit={handleCreateDeck} >
        <label htmlFor="deck-title">Deck title </label>
        <div className="input-wrapper">
        <input 
        className="input"
        id="deck-title" 
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //type save
        { 
          setTitle(e.target.value);
        }}
        />
        </div>
        <button>Create Deck</button>
      </form>
    </div>
    </div>
  );
}

export default App
