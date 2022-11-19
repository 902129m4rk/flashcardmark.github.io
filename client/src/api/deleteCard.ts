import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function deleteCard (deckId: String, index: number): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/card/${index}`, {
        method: 'DELETE',
      });
    return response.json();
}