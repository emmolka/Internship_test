import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./AddButton.css";
import Aux from "../../Aux/Aux";
const AddButton = props => {
  return (
    <Aux>
      <button className="add-button" onClick={props.add}>
        <IoIosAddCircleOutline className="add-icon" />
        <p>
          <b>Add {props.type}</b>
        </p>
      </button>
    </Aux>
  );
};

export default AddButton;
