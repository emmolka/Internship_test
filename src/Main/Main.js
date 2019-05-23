import React from "react";
import { Redirect } from "react-router";
import Shipment from "../Shipment/Shipment";
import axios from "axios";
import AddButton from "../Buttons/AddButton/AddButton";
import "./Main.css";

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
  addShipment = async event => {
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
      this.addShipmentToState();
      this.clearInputs();
    } catch (e) {
      console.log(e);
    }
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

      this.setState({
        shipments: list
      });
    } catch (e) {
      console.log(e);
    }
  }
  clearInputs = () => {
    this.setState({
      newId: "",
      newName: ""
    });
  };
  logOut = () => {
    this.props.history.push("/login");
    localStorage.clear();
  };

  render() {
    const { props, state } = this;

    if (!props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <div className="logout-div" onClick={this.logOut}>
          <button>
            <p>Log out</p>
          </button>
        </div>
        <div className="add-shipment-div">
          <AddButton type={"Shipment"} add={this.addShipment} />

          <div className="shipment-inputs">
            <input
              placeholder="id"
              onChange={this.newShipmentId}
              value={this.state.newId}
            />
            <input
              placeholder="name"
              onChange={this.newShipmentName}
              value={this.state.newName}
            />
          </div>
        </div>
        {state.shipments.map(item => (
          <Shipment
            shipment={item}
            id={item.id}
            name={item.name}
            removeShipmentFromState={this.removeShipmentFromState}
          />
        ))}
      </div>
    );
  }
}

export default Main;
