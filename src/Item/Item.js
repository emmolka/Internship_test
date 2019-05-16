import React, { Component } from "react";
import { IoIosClose } from "react-icons/io";

import "./Item.css";
import axios from "axios";

class Item extends Component {
  deleteItem = async event => {
    try {
      this.props.removeItemFromState(this.props.id);
      await axios.delete(
        `https://api.shipments.test-y-sbm.com/item/${this.props.id}`,
        {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { props } = this;

    return (
      <div>
        <div className="item">
          Item id: {props.id}
          <br />
          Item code: {props.code}
          <button className="delete-item" onClick={this.deleteItem}>
            <IoIosClose className="delete-icon" />
            <p>Delete item</p>
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
