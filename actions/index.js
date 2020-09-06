export const GET_DECKS = 'GET_DECKS';
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  };
}

export function saveDeckTitle(deck) {
  return {
    type: SAVE_DECK_TITLE,
    deck,
  };
}

export function addCardToDeck(deck, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deck,
    card,
  };
}
