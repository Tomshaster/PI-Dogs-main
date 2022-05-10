const { Router } = require("express");
const axios = require("axios");
const { Race, Temperaments, Op } = require("../db.js");
const { YOUR_API_KEY } = process.env;

const temperament = Router();

let populated = false;
temperament.get("/", async (req, res) => {
  try {
    if (!populated) {
      let response = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
      );
      let apiRes = response.data.map((r) => {
        if ("temperament" in r) {
          return r.temperament;
        }
      });

      apiRes = apiRes.flatMap((t) => {
        if (t) {
          return t.split(", ");
        }
      });

      apiRes = [...new Set(apiRes)]; // Removes duplicates from Array

      for (let t = 0; t < apiRes.length; t++) {
        let temp = {
          name: apiRes[t],
        };
        await Temperaments.create(temp);
      }
      populated = true;
    }
    let data = await Temperaments.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ msg: "algo salió mal :(" });
  }
});

module.exports = temperament;
