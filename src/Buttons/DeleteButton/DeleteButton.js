import React from "react";
import { IoIosClose } from "react-icons/io";
import "./DeleteButton.css";
import Aux from "../../Aux/Aux";
const DeleteButton = props => {
  return (
    <Aux>
      <button className={"delete-button"} onClick={props.delete}>
        <IoIosClose className="delete-icon" />
        <p>
          <b>Delete {props.type}</b>
        </p>
      </button>
    </Aux>
  );
};

export default DeleteButton;
