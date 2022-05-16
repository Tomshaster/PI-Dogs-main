const axios = require("axios");
export const GET_ALL_RACES = "GET_ALL_RACES";
export const SEARCH_RACES = "SEARCH_RACES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const SELECT_TEMPERAMENT = "SELECT_TEMPERAMENT";
export const DESELECT_TEMPERAMENT = "DESELECT_TEMPERAMENT";
export const ADD_TEMPERAMENT = "ADD_TEMPERAMENT";
export const CLEAR_TEMPERAMENTS = "CLEAR_TEMPERAMENTS";
export const ADD_RACE = "ADD_RACE";

export function getAllRaces() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/dogs")
      .then((races) => dispatch({ type: GET_ALL_RACES, payload: races.data }));
  };
}

export function searchRaces(race) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/dogs?name=${race}`)
      .then((races) => dispatch({ type: SEARCH_RACES, payload: races.data }));
  };
}

export function getDetails(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/dogs/${id}`)
      .then((details) =>
        dispatch({ type: GET_DETAILS, payload: details.data })
      );
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

export function selectTemperament(temp) {
  return {
    type: SELECT_TEMPERAMENT,
    payload: temp,
  };
}

export function deselectTemperament(temp) {
  return {
    type: DESELECT_TEMPERAMENT,
    payload: temp,
  };
}

export function clearTemperaments() {
  return {
    type: CLEAR_TEMPERAMENTS,
    payload: null,
  };
}

export function addTemperament(temp) {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/temperament", { name: temp })
      .then((response) =>
        dispatch({ type: ADD_TEMPERAMENT, payload: response.data })
      );
  };
}

export function addRace(info) {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/dogs", {
        race: info.race,
        temperaments: info.temperaments,
      })
      .then((response) => {
        dispatch({ type: ADD_RACE, payload: response.data });
      });
  };
}
