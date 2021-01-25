import React, { useState } from "react";
import Child from "./Child";
import axios from "axios";
function UsersComponent() {
  const [response, setResponse] = useState({});
  const [flag, setFlag] = useState(false);
  function onGoClick(e) {
    e.preventDefault();
    axios
      .get("http://localhost:3010/api/v1/ccxc/randomusers")
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
  }
  function onResetClick(e) {
    e.preventDefault();
    setFlag(false);
  }

  return (
    <section>
      <div>
        <div className="mt-5 ml-5">
          <h1>Users API</h1>
        </div>
        <div className="mt-5 ml-5">
          <p>
            By clicking on Go you can fetch for 10 persons with the respective
            letter counting. With Reset the search is cleaned.
          </p>

        </div>
        <div className="mt-2 ml-5">
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={(e) => {
              onGoClick(e);
            }}
          >
            Go
          </button>
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

export default UsersComponent;
