import React from "react";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import "./Item.css";

const Item = props => {
  return (
    <>
      <div className="item">
        <p className="item-code-p">
          Item code: <b>{props.code}</b>
        </p>
        <DeleteButton delete={props.deleteItem} />
      </div>
    </>
  );
};

export default Item;
