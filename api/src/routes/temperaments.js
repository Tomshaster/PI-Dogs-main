const { Router } = require("express");
const axios = require("axios");
const { Temperament, Op } = require("../db.js");
const { YOUR_API_KEY } = process.env;

const temperament = Router();
let populated = false;

temperament.get("/", async (req, res) => {
  try {
    let testData = await Temperament.findAll({
      where: { name: { [Op.not]: null } },
    });

    if (testData.length > 0) populated = true;
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
        if (apiRes[t] === null) {
          continue;
        }
        let temp = {
          name: apiRes[t],
        };
        await Temperament.create(temp);
      }
      populated = true;
    }
    let data = await Temperament.findAll({
      where: { name: { [Op.not]: null } },
    });

    data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

temperament.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    Temperament.create({ name: name });
    res.send("Temperament created succesfully");
  } catch (error) {
    console.log(error);
    res.send("Error creating temperament");
  }
});

module.exports = temperament;
