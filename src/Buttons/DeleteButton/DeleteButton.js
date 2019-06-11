import React from "react";
import { IoIosClose } from "react-icons/io";
import "./DeleteButton.css";
const DeleteButton = props => {
  return (
    <>
      <button
        //disabled={true}
        className={"delete-button"}
        onClick={props.delete}
      >
        <IoIosClose className="delete-icon" />
        <p>
          <b>Delete {props.type}</b>
        </p>
      </button>
    </>
  );
};

export default DeleteButton;
