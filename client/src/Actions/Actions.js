const axios = require("axios");
export const GET_ALL_RACES = "GET_ALL_RACES";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";

export function getAllRaces() {
  return function (dispatch) {
    return axios
      .get("https://localhost3001/dogs")
      .then((races) => dispatch({ type: GET_ALL_RACES, payload: races.data }));
  };
}
