import React, { useState } from "react";
import Child from './Child';
import axios from "axios";
function ShipsComponent() {
  const [value, setValue] = useState("");
  const [flag, setFlag] = useState(false);
  const [response, setResponse] = useState({});
  function onChangeEvent(e) {
    setValue({ value: e.target.value });
  }
  function onSubmitEvent(e) {
    e.preventDefault();
    if (value.value.match(/^\d+$/g) !== null) {
      axios
        .get(
          `http://localhost:3010/api/v1/ccxc/ships?passengers=${value.value}`
        )
        .then((result) => {
          setResponse({ response: result.data });
          setFlag(true);
        })
        .catch((error) => {
          console.log(error);
          setFlag(false);
          window.alert(
            "There was an internal problem while retrieving the information, try again"
          );
        });
    } else {
      window.alert("The information entered should be only numbers");
    }
  }
  function onResetClick(e) {
    e.preventDefault();
    setFlag(false);
  }
  return (
    <section>
      <div>
        <div className="mt-5 ml-5">
          <h1>Ships API</h1>
        </div>
        <div className="mt-5 ml-5">
          <p>
            By entering the number of passengers you want to transport, you can
            find the correct ship for the journey. If the ship name is empty
            means there is no a ship with a known consumables information nor
            MGLT information nor passengers capacity. ONLY numbers accepted.
          </p>
        </div>
        <div className="mt-2 ml-5">
          <form
            className="d-inline mr-2"
            onSubmit={(e) => {
              onSubmitEvent(e);
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                onChangeEvent(e);
              }}
            />
            <input type="Submit" className="btn btn-primary ml-2" />
          </form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              onResetClick(e);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <Child flag={flag} response={response}></Child>
    </section>
  );
}
export default ShipsComponent;
