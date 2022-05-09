const { Router } = require("express");
const axios = require("axios");
const { Race, Temperaments, Op } = require("../db.js");
const { YOUR_API_KEY } = process.env;

const dog = Router();

dog.get("/", async (req, res) => {
  const { name } = req.query;
  try {
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
    let dbRes = await Race.findAll({
      where: { name: { [Op.substring]: name } },
      include: [
        {
          model: Temperaments,
          attributes: ["name"],
        },
      ],
    });
    if (apiRes.length === 0 && dbRes.length === 0) {
      res.send("No se encontraron los perros buscados :c");
    }

    res.send([apiRes, dbRes]);
  } catch (error) {
    console.log(error);
    res.send("error 500");
  }
});

dog.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  try {
    if (isNaN(idRaza)) {
      const perri = await Race.findByPk(
        idRaza,
        {
          attributes: ["image", "name", "weight", "height", "life_span"],
        },
        {
          include: [
            {
              model: Temperaments,
              attributes: ["name"],
            },
          ],
        }
      );
      res.send(perri);
    } else {
      let response = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
      );
      let filteredResp = response.data.find((r) => (r.id = idRaza));
      res.send(filteredResp);
    }
  } catch (error) {
    console.log(error);
    res.sond("error 500");
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
