import {
  DESELECT_TEMPERAMENT,
  GET_ALL_RACES,
  GET_ALL_TEMPERAMENTS,
  GET_DETAILS,
  SEARCH_RACES,
  SELECT_TEMPERAMENT,
} from "../Actions/Actions.js";

const initialState = {
  races: [],
  temperaments: [],
  selectedTemps: [],
  details: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RACES:
      return {
        ...state,
        races: action.payload,
      };
    case SEARCH_RACES:
      if (action.payload === "No se encontraron los perros buscados :c") {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          races: action.payload,
        };
      }
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case SELECT_TEMPERAMENT:
      let aux = state.selectedTemps;
      aux.push(action.payload);
      return {
        ...state,
        selectedTemps: aux,
      };
    case DESELECT_TEMPERAMENT:
      let aux2 = state.selectedTemps;
      let index = aux2.indexOf(action.payload);
      aux2.splice(index, 1);
      // aux2.filter((t) => t !== action.payload);
      return {
        ...state,
        selectedTemps: aux2,
      };
    default:
      return { ...state };
  }
}
