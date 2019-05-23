import React, { Component } from "react";

import "./Shipment.css";
import Item from "../Item/Item";
import AddButton from "../Buttons/AddButton/AddButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import axios from "axios";
import Aux from "../Aux/Aux";
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
    try {
      await axios.delete(
        `https://api.shipments.test-y-sbm.com/shipment/${this.props.id}`,
        {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        }
      );
      this.props.removeShipmentFromState(this.props.id);
      this.setState({
        items: []
      });
    } catch (e) {
      console.log(e);
    }
  };
  deleteItem = async id => {
    try {
      await axios.delete(`https://api.shipments.test-y-sbm.com/item/${id}`, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      });
      this.removeItemFromState(id);
    } catch (e) {
      console.log(e);
    }
  };
  removeItemFromState = id => {
    console.log(id);
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
      <Aux>
        <div className="shipment">
          <p>
            Shipment id: <b>{props.id}</b>
          </p>
          <p>Shipment name: {props.name}</p>
          {state.items.map(item => (
            <Item
              id={item.id}
              code={item.code}
              deleteItem={() => this.deleteItem(item.id)}
            />
          ))}
          <DeleteButton delete={this.deleteShipment} type={"Shipment"} />
          <div className="add-item-div">
            <AddButton type={"Item"} add={this.addItem} />
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
      </Aux>
    );
  }
}

export default Shipment;
