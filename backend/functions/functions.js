const axios = require("axios");
const buildingPersonsList = (parameter) => {
  let response = {};
  response = parameter.map((element) => {
    return element.name.first + " " + element.name.last;
  });
  response.sort();
  return response;
};

const countingLetters = (parameter) => {
  let strings = "";
  const auxiliarToCompare = [
    { letter: "a", times: 0 },
    { letter: "b", times: 0 },
    { letter: "c", times: 0 },
    { letter: "d", times: 0 },
    { letter: "e", times: 0 },
    { letter: "f", times: 0 },
    { letter: "g", times: 0 },
    { letter: "h", times: 0 },
    { letter: "i", times: 0 },
    { letter: "j", times: 0 },
    { letter: "k", times: 0 },
    { letter: "l", times: 0 },
    { letter: "m", times: 0 },
    { letter: "n", times: 0 },
    { letter: "o", times: 0 },
    { letter: "p", times: 0 },
    { letter: "q", times: 0 },
    { letter: "r", times: 0 },
    { letter: "s", times: 0 },
    { letter: "t", times: 0 },
    { letter: "u", times: 0 },
    { letter: "v", times: 0 },
    { letter: "w", times: 0 },
    { letter: "x", times: 0 },
    { letter: "y", times: 0 },
    { letter: "z", times: 0 },
  ];
  let maximumValue = { value: 0, index: 0 };
  parameter.forEach((element) => {
    strings += element.name.first.toLowerCase();
    strings += element.name.last.toLowerCase();
  });
  strings = strings.split("");
  strings.forEach((element) => {
    auxiliarToCompare.forEach((element2) => {
      if (element == element2.letter) element2.times++;
    });
  });
  auxiliarToCompare.forEach((element, index) => {
    if (element.times > maximumValue.value) {
      maximumValue.value = element.times;
      maximumValue.index = index;
    }
  });
  maximumValue.index = [maximumValue.index];
  auxiliarToCompare.forEach((element, index) => {
    if (
      element.times === maximumValue.value &&
      maximumValue.index[0] !== index
    ) {
      maximumValue.index.push(index);
    }
  });
  return {
    letter_count: auxiliarToCompare,
    max_repeat_letter: maximumValue.index.map((element) => {
      return auxiliarToCompare[element];
    }),
  };
};

const checkingIfShipInEpisode = (list,passangers) => {
  let episodes = [
    "http://swapi.dev/api/films/4/",
    "http://swapi.dev/api/films/5/",
    "http://swapi.dev/api/films/6/",
  ];
  let flag = false;

  list.films.forEach((element) => {
    episodes.forEach((secondElement) => {
      if (element === secondElement ) {
        flag = true;
      }
    });
  });
  if(!(list.passengers > passangers)) {
    flag = false
  }
  return flag;
};

const terrainValidator = (element, terrain) => {
  const comparators = element.terrain.split(", ");
  let flag = false;
  comparators.forEach((element) => {
    if (element === terrain) {
      flag = true;
    }
  });
  return flag;
};

const lookingThroughPages = async (url, validator, query) => {
  let myUrl = url;
  x = false;
  let response;
  let results = [];
  do {
    response = await axios.get(myUrl);
    if (response.status === 200) {
      response.data.results.forEach((element) => {
        if (validator(element, query)) {
          results.push(element);
        }
      });
      if (response.data.next !== null) {
        myUrl = response.data.next;
      } else {
        x = true;
      }
    }
  } while (x === false);
  return results;
};

const returningAnswer = (what,how) => {
  if (what.length > 1) {
    let auxiliar = { value: 0, index: 0 };
    what.forEach((element, index) => {
      if (parseInt(element[how]) > auxiliar.value) {
        auxiliar.value = parseInt(element[how]);
        auxiliar.index = index;
      }
    });
    return what[auxiliar.index].name;
  } else if (what.length === 1) {
    return what[0].name;
  } else {
    return "";
  }
}

const gettingShips = async (passengers) => {
  let ship = []
  let results = await lookingThroughPages("http://swapi.dev/api/starships", checkingIfShipInEpisode, passengers)
  results = results.map((element) => {
    if (
      element.MGLT !== "unknown" &&
      element.consumables !== "unknown"
    ) {
      if (element.consumables.includes("days")) {
        const regExp = /\d+/g;
        if (parseInt(element.consumables.match(regExp)) >= 7) {
          return element;
        }
      } else {
        return element;
      }
    }
  });
  results.forEach((element) => {
    if (element !== undefined) {
      ship.push(element);
    }
  });
  return returningAnswer(ship, 'MGLT')
};

const findingPlanet = async (terrain) => {
  let planets = await lookingThroughPages(
    "http://swapi.dev/api/planets",
    terrainValidator,
    terrain
  );
  return returningAnswer(planets,'population')
};
module.exports = {
  buildingPersonsList,
  countingLetters,
  gettingShips,
  findingPlanet
};
