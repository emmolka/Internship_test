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
    newName: ""
  };

  addItemToState = () => {
    console.log(this.state);
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

  render() {
    const { props, state } = this;

    const items = props.shipment;
    console.log(items);
    return (
      <div>
        <div className="shipment">
          <p>Shipment id:{props.id}</p>
          <p>Shipment name:{props.name}</p>
          {state.items.map(item => (
            <Item
              id={item.id}
              code={item.code}
              removeItemFromState={this.removeItemFromState}
            />
          ))}
          <button
            className="delete-shipment"
            onClick={async event => {
              props.removeShipmentFromState(props.id);
              this.setState({
                items: []
              });
              try {
                await axios.delete(
                  `https://api.shipments.test-y-sbm.com/shipment/${props.id}`,
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
            <p>Delete shipment</p>
          </button>
          <div className="add-item-div">
            <button
              className="add-item"
              onClick={async event => {
                this.addItemToState();

                try {
                  await axios.post(
                    `https://api.shipments.test-y-sbm.com/item`,
                    {
                      id: this.state.newId,
                      code: this.state.newCode,
                      shipment_id: props.id,
                      name: props.name
                    },
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
              <IoIosAddCircleOutline className="add-icon" />
              <p>Add item</p>
            </button>
            <div className="item-inputs">
              <input placeholder="id" onChange={this.newItemId} />
              <input placeholder="name" onChange={this.newItemCode} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shipment;
