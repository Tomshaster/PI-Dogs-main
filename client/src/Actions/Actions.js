const axios = require("axios");
export const GET_ALL_RACES = "GET_ALL_RACES";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const SEARCH_RACES = "SEARCH_RACES";

export function getAllRaces() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/dogs")
      .then((races) => dispatch({ type: GET_ALL_RACES, payload: races.data }));
  };
}

export function getAllTemperaments() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/temperament")
      .then((temperaments) =>
        dispatch({ type: GET_ALL_TEMPERAMENTS, payload: temperaments.data })
      );
  };
}

export function searchRaces(race) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/dogs?name=${race}`)
      .then((races) => dispatch({ type: SEARCH_RACES, payload: races.data }));
  };
}
