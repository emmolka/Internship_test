import React from "react";
import { Redirect } from "react-router";
import Shipment from "../Shipment/Shipment";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
class Main extends React.Component {
  state = {
    shipments: [],
    newId: "",
    newName: ""
  };
  newShipmentId = event => {
    this.setState({
      newId: event.target.value
    });
  };
  newShipmentName = event => {
    this.setState({
      newName: event.target.value
    });
  };
  addShipmentToState = () => {
    const ship = {
      id: this.state.newId,
      name: this.state.newName,
      items: []
    };
    //{ id: "46", shipment_id: "45", name: "Maciek", code: "Maciek" }
    const currentArray = [...this.state.shipments];
    const newArray = currentArray;
    newArray.push(ship);
    this.setState({
      shipments: newArray
    });
  };
  removeShipmentFromState = id => {
    console.log(id);
    const currentArray = [...this.state.shipments];
    const newArray = currentArray.filter(item => item.id !== id);
    this.setState({
      shipments: newArray
    });
  };

  async componentDidMount() {
    try {
      const data = await axios.get(
        `https://api.shipments.test-y-sbm.com/shipment`,
        {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        }
      );
      const list = data.data.data.shipments;
      console.log(list);
      this.setState({
        shipments: list
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { props, state } = this;
    console.log(state);
    if (!props.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        {state.shipments.map(item => (
          <Shipment
            shipment={item}
            id={item.id}
            name={item.name}
            removeShipmentFromState={this.removeShipmentFromState}
          />
        ))}
        <div className="add-shipment-div">
          <button
            className="add-shipment"
            onClick={async event => {
              this.addShipmentToState();

              try {
                await axios.post(
                  `https://api.shipments.test-y-sbm.com/shipment`,
                  {
                    id: this.state.newId,
                    name: this.state.newName
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
            <p>Add shipment</p>
          </button>
          <div className="shipment-inputs">
            <input placeholder="id" onChange={this.newShipmentId} />
            <input placeholder="name" onChange={this.newShipmentName} />
          </div>
        </div>
      </div>
    );
  }
}
//this.addShipmentToState
export default Main;
