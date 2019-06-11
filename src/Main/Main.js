import React from "react";
import { Redirect } from "react-router";
import Shipment from "../Shipment/Shipment";
import axios from "axios";
import AddButton from "../Buttons/AddButton/AddButton";
import "./Main.css";
import LogOut from "../LogOut/LogOut";
import { IoIosAddCircleOutline } from "react-icons/io";
import clearInputs from "../Modules/clearModule/Clear";
import openClose from "../Modules/openClose/openClose";
import newId from "../Modules/newId/newId";
class Main extends React.Component {
  state = {
    shipments: [],
    newId: "",
    newName: "",
    open: false
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
      clearInputs(this);
      newId(this);
    } catch (e) {
      alert("Adding shipment failed");
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
    newId(this);
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
      this.props.history.push("/login");
      localStorage.clear();
    }
  }

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
      <>
        <LogOut logOut={this.logOut} />
        <div className="add-shipment-div">
          <div className="xd">
            <IoIosAddCircleOutline
              className="openShip"
              onClick={() => openClose(this)}
            />
            <p>
              <b>Add Shipment</b>
            </p>
          </div>
        </div>
        <div
          className="add-shipment-div"
          style={{ display: this.state.open ? "block" : "none" }}
        >
          <div className="shipment-input">
            <input
              placeholder="name"
              onChange={this.newShipmentName}
              value={this.state.newName}
            />
          </div>
          <AddButton type={"Shipment"} add={this.addShipment} />
        </div>

        {state.shipments.map(shipment => (
          <Shipment
            shipment={shipment}
            id={shipment.id}
            name={shipment.name}
            removeShipmentFromState={this.removeShipmentFromState}
            key={shipment.id}
          />
        ))}
      </>
    );
  }
}

export default Main;
