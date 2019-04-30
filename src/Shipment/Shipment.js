import React, { Component } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import "./Shipment.css";
import Item from "../Item/Item";
import axios from "axios";

class Shipment extends Component {
  state = {
    items: this.props.shipment.items
  };

  removeItemFromState = id => {
    const currentArray = [...this.state.items];
    const newArray = currentArray.filter(item => item.id !== id);
    this.setState({
      items: newArray
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
            onClick={
              console.log("xd")

              //async event => {
              //   try {
              //     await axios.delete(
              //       `https://api.shipments.test-y-sbm.com/shipment/${props.id}`,
              //       {
              //         headers: {
              //           Authorization: `bearer ${localStorage.token}`
              //         }
              //       }
              //     );
              //   } catch (e) {
              //     console.log(e);
              //   }
            }
          >
            <IoIosClose className="delete-icon" />
            <p>Delete shipment</p>
          </button>
        </div>
        <button className="add-shipment">
          <IoIosAddCircleOutline className="add-icon" />
          <p>Add shipment</p>
        </button>
      </div>
    );
  }
}

export default Shipment;
