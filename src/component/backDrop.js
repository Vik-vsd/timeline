import React from "react";

const BD = (props) => {
  const closeOptions = () => {
    props.closeTheOption();
  };
  return props.show ? (
    <div className="BackDrop" onClick={closeOptions}>
      {props.children}
    </div>
  ) : null;
};
export default BD;
