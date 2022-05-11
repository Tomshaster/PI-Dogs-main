import {
  GET_ALL_RACES,
  GET_ALL_TEMPERAMENTS,
  SEARCH_RACES,
} from "../Actions/Actions.js";

const initialState = {
  races: [],
  temperaments: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RACES:
      return {
        ...state,
        races: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
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
    default:
      return { ...state };
  }
}
