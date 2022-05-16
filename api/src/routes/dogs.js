const { Router } = require("express");
const axios = require("axios");
const { Race, Temperament, Op } = require("../db.js");
const { YOUR_API_KEY } = process.env;

const dog = Router();

dog.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    //respuesta de la API

    let response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    let apiRes = response.data.map((r) => {
      return {
        api_id: r.id,
        name: r.name,
        image: r.image.url,
        temperament: r.temperament,
        weight: r.weight.metric + " Kg",
      };
    });
    if (name) {
      apiRes = apiRes.filter((d) => {
        if (d.name.toLowerCase().includes(name.toLowerCase())) return d;
      });
    }

    //respuesta de la DB

    let where = {};
    if (name) {
      where = { name: { [Op.substring]: name } };
    }
    let dbRes = await Race.findAll({
      where: where,
      include: [
        {
          model: Temperament,
          attributes: ["name"],
        },
      ],
    });

    if (apiRes.length === 0 && dbRes.length === 0) {
      return res.send([]);
    }
    let finalRes = apiRes.concat(dbRes);
    res.send(finalRes);
  } catch (error) {
    console.log(error);
    res.send("error 500");
  }
});

dog.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  try {
    if (isNaN(idRaza)) {
      const perri = await Race.findByPk(idRaza, {
        include: { model: Temperament, required: true },
      });
      if (perri) {
        res.send(perri);
      } else {
        res.send({ msg: "algo salió mal :(" });
      }
    } else {
      let response = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
      );
      let filteredResp = response.data.find((r) => r.id == idRaza);
      if (filteredResp) {
        res.send(filteredResp);
      } else {
        res.send({ msg: "algo salió mal :(" });
      }
    }
  } catch (error) {
    console.log(error);
    res.send("error 500");
  }
});

dog.post("/", async (req, res) => {
  const { race, temperaments } = req.body;
  console.log(temperaments);
  try {
    let newRace = await Race.create(race);

    temperaments.forEach(async (element) => {
      let aux = await Temperament.findOne({
        where: { name: element },
      });
      newRace.addTemperament(aux);
    });
    res.send(newRace);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

module.exports = dog;

// let testrace = {
//   breed_group: "Baset",
//   height: "20 - 84",
//   weight: "40 - 880",
//   name: "baset",
//   life_span: "1 - 952",
//   image: "55885588",
// };
// let testrac2 = {
//   breed_group: "Baset hound",
//   height: "20 - 84",
//   weight: "40 - 880",
//   name: "baset hound",
//   life_span: "1 - 952",
//   image: "55885588",
// };
// let test = await Race.create(testrace);
// let test2 = await Race.create(testrac2);
// let test2 = await Temperaments.create({ name: "Temperamento" });
// let test3 = await Temperaments.create({ name: "Temperamento2" });
// await test.addTemperaments(test2);
// await test.addTemperaments(test3);
