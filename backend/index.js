const { request } = require("express");
const express = require("express");
const cors = require("cors");
const config = require("config");
const axios = require("axios");
const {
  buildingPersonsList,
  countingLetters,
  gettingShips,
  findingPlanet,
} = require("./functions/functions");

const app = express();

app.use(cors());

app.get("/api/v1/ccxc/randomusers", (req, res) => {
  axios
    .get("https://randomuser.me/api/?inc=name&results=10&name=upper&nat=us")
    .then((results) => {
      res.status(200).json({
        persons: buildingPersonsList(results.data.results),
        letters: countingLetters(results.data.results),
      });
    })
    .catch((error) => {
      res.status(503).json({
        status: error.response.status,
        statusText: error.response.statusText,
      });
    });
});

app.get("/api/v1/ccxc/ships", async (req, res) => {
  if (req.query.passengers && req.query.passengers.match(/^\d+$/g)) {
    res.status(200).json({
      ship_name: await gettingShips(parseInt(req.query.passengers)),
    });
  } else {
    res.status(400).json({
      status: 400,
      statusText: "The passenger information is not entered or not a number.",
    });
  }
});

app.get("/api/v1/ccxc/planets", async (req, res) => {
    if(req.query.terrain && !req.query.terrain.match(/\d+/g)) {
        res.status(200).json({
            planet_name: await findingPlanet(req.query.terrain)
        })
    } else { res.status(400).json({
        status: 400,
        statusText: 'Terrain parameter missing or wrong'
    })}
});
app.listen(config.port, () => {
  console.log(`The server has been initialized in port ${config.port}`);
});
