import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./AddButton.css";
const AddButton = props => {
  return (
    <>
      <button className="add-button" onClick={props.add}>
        <IoIosAddCircleOutline className="add-icon" />
        <p>
          <b>Add {props.type}</b>
        </p>
      </button>
    </>
  );
};

export default AddButton;
