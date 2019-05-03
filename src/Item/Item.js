import React, { Component } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./Item.css";
import axios from "axios";

class Item extends Component {
  render() {
    const { props } = this;
    console.log(props);

    return (
      <div>
        <div className="item">
          Item id: {props.id}
          <br />
          Item code: {props.code}
          <button
            className="delete-item"
            onClick={async event => {
              try {
                props.removeItemFromState(props.id);
                await axios.delete(
                  `https://api.shipments.test-y-sbm.com/item/${props.id}`,
                  {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }
                );
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <IoIosClose className="delete-icon" />
            <p>Delete item</p>
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
