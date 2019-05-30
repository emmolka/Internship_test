import React from "react";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import "./Item.css";
import Aux from "../Aux/Aux";

const Item = props => {
  return (
    <Aux>
      <div className="item">
        <p className="item-code-p">
          Item code: <b>{props.code}</b>
        </p>
        <DeleteButton delete={props.deleteItem} />
      </div>
    </Aux>
  );
};

export default Item;
