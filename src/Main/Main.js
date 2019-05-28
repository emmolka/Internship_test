import React from "react";
import { Redirect } from "react-router";
import Shipment from "../Shipment/Shipment";
import axios from "axios";
import AddButton from "../Buttons/AddButton/AddButton";
import "./Main.css";
import LogOut from "../LogOut/LogOut";
import Aux from "../Aux/Aux";
import { IoIosAddCircleOutline } from "react-icons/io";
class Main extends React.Component {
  state = {
    shipments: [],
    newId: "",
    newName: "",
    open: false
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
      alert("Adding shipment failed");
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
      alert(e);
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
  openCloseFunc = () => {
    this.state.open
      ? this.setState({ open: false })
      : this.setState({ open: true });
  };

  render() {
    const { props, state } = this;

    if (!props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <Aux>
        <LogOut logOut={this.logOut} />
        <div className="add-shipment-div">
          <div className="xd">
            <IoIosAddCircleOutline
              className="openShip"
              onClick={this.openCloseFunc}
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
          <AddButton type={"Shipment"} add={this.addShipment} />
        </div>

        {state.shipments.map(shipment => (
          <Shipment
            shipment={shipment}
            id={shipment.id}
            name={shipment.name}
            removeShipmentFromState={this.removeShipmentFromState}
          />
        ))}
      </Aux>
    );
  }
}

export default Main;
