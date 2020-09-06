import { GET_DECKS, SAVE_DECK_TITLE, ADD_CARD_TO_DECK } from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case SAVE_DECK_TITLE:
      return {
        ...state,
        ...action.deck,
      };  
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          questions: state[action.deck].questions.concat(action.card),
        },
      };
    default:
      return state;
  }
}

export default decks;
