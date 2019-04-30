import React from "react";
import { Redirect } from "react-router";
import Shipment from "../Shipment/Shipment";
import axios from "axios";

class Main extends React.Component {
  state = {
    shipments: []
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
    if (!props.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        {state.shipments.map(item => (
          <Shipment shipment={item} id={item.id} name={item.name} />
        ))}
      </div>
    );
  }
}

export default Main;
