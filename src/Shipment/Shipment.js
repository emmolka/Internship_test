import React, { Component } from "react";
import "./Shipment.css";
import Item from "../Item/Item";
import AddButton from "../Buttons/AddButton/AddButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import axios from "axios";
import Aux from "../Aux/Aux";
import { IoMdMenu } from "react-icons/io";
import clearInputs from "../Modules/clearModule/Clear";
import openClose from "../Modules/openClose/openClose";
import newId from "../Modules/newId/newId";
class Shipment extends Component {
  state = {
    items: this.props.shipment.items,
    newId: "",
    newName: "",
    open: false
  };
  addItem = async event => {
    try {
      await axios.post(
        `https://api.shipments.test-y-sbm.com/item`,
        {
          id: this.state.newId,
          code: this.state.newName,
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
      clearInputs(this);
      newId(this);
    } catch (e) {
      alert("Adding item failed");
    }
  };

  addItemToState = () => {
    const item = {
      id: this.state.newId,
      code: this.state.newName
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
      alert("Deleting shipment failed");
      console.log(this.props.id);
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
      alert("Deleting item failed");
    }
  };
  removeItemFromState = id => {
    const currentArray = [...this.state.items];
    const newArray = currentArray.filter(item => item.id !== id);
    this.setState({
      items: newArray
    });
  };

  newItemCode = event => {
    this.setState({
      newName: event.target.value
    });
  };
  componentDidMount() {
    newId(this);
  }

  render() {
    const { props, state } = this;

    return (
      <Aux>
        <div className="shipment">
          <div className="xd">
            <IoMdMenu className="hamburger" onClick={() => openClose(this)} />
            <p>
              Shipment name: <b>{props.name}</b>
            </p>
          </div>
          <div
            className="items"
            style={{ display: this.state.open ? "block" : "none" }}
          >
            {state.items.map(item => (
              <Item
                code={item.code}
                deleteItem={() => this.deleteItem(item.id)}
              />
            ))}

            <div className="add-item-div">
              <AddButton type={"Item"} add={this.addItem} />
              <div className="item-input">
                <input
                  placeholder="name"
                  onChange={this.newItemCode}
                  value={this.state.newName}
                />
              </div>
            </div>
            <DeleteButton delete={this.deleteShipment} type={"Shipment"} />
          </div>
        </div>
      </Aux>
    );
  }
}

export default Shipment;
