import React from "react";

function Child(props) {
  if (props.flag) {
    return (
      <section>
        <div className="w-75 ml-5 mt-2">
          <pre>{JSON.stringify(props.response.response, null,2)}</pre>
        </div>
      </section>
    );
  } else {
    return null;
  }
}

export default Child;
