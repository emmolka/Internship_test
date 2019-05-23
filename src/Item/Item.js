import React from "react";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import "./Item.css";
import Aux from "../Aux/Aux";

const Item = props => {
  return (
    <Aux>
      <div className="item">
        Item id: {props.id}
        <br />
        Item code: {props.code}
        <DeleteButton delete={props.deleteItem} type={"Item"} />
      </div>
    </Aux>
  );
};

export default Item;
