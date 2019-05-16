import React, { Component } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import "./Shipment.css";
import Item from "../Item/Item";
import axios from "axios";

class Shipment extends Component {
  state = {
    items: this.props.shipment.items,
    newId: "",
    newCode: ""
  };
  addItem = async event => {
    try {
      await axios.post(
        `https://api.shipments.test-y-sbm.com/item`,
        {
          id: this.state.newId,
          code: this.state.newCode,
          shipment_id: this.props.id,
          name: this.props.name
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        }
      );
      this.addItemToState();
      this.clearInputs();
    } catch (e) {
      console.log(e);
    }
  };

  addItemToState = () => {
    const item = {
      id: this.state.newId,
      code: this.state.newCode
    };
    const currentArray = [...this.state.items];
    const newArray = currentArray;
    newArray.push(item);
    this.setState({
      items: newArray
    });
  };

  deleteShipment = async event => {
    this.props.removeShipmentFromState(this.props.id);
    this.setState({
      items: []
    });
    try {
      await axios.delete(
        `https://api.shipments.test-y-sbm.com/shipment/${this.props.id}`,
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
  removeItemFromState = id => {
    const currentArray = [...this.state.items];
    const newArray = currentArray.filter(item => item.id !== id);
    this.setState({
      items: newArray
    });
  };
  newItemId = event => {
    this.setState({
      newId: event.target.value
    });
  };
  newItemCode = event => {
    this.setState({
      newCode: event.target.value
    });
  };
  clearInputs = () => {
    this.setState({
      newId: "",
      newCode: ""
    });
  };

  render() {
    const { props, state } = this;

    return (
      <div>
        <div className="shipment">
          <p>
            Shipment id: <b>{props.id}</b>
          </p>
          <p>Shipment name: {props.name}</p>
          {state.items.map(item => (
            <Item
              id={item.id}
              code={item.code}
              removeItemFromState={this.removeItemFromState}
            />
          ))}
          <button className="delete-shipment" onClick={this.deleteShipment}>
            <IoIosClose className="delete-icon" />
            <p>Delete shipment</p>
          </button>
          <div className="add-item-div">
            <button className="add-item" onClick={this.addItem}>
              <IoIosAddCircleOutline className="add-icon" />
              <p>Add item</p>
            </button>
            <div className="item-inputs">
              <input
                placeholder="id"
                onChange={this.newItemId}
                value={this.state.newId}
              />
              <input
                placeholder="name"
                onChange={this.newItemCode}
                value={this.state.newCode}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shipment;
