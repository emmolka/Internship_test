import React, { Component } from "react";
import { TiUser } from "react-icons/ti";
import { TiKeyOutline } from "react-icons/ti";
import "./Login.css";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  addEmailToState = event => {
    this.setState({ email: event.target.value });
  };
  addPasswordToState = event => {
    this.setState({ password: event.target.value });
  };
  logIn = async event => {
    event.preventDefault();

    try {
      const data = await axios.post(
        "https://api.shipments.test-y-sbm.com/login",
        {
          email: this.state.email,
          password: this.state.password
        }
      );
      const result = data.data.data[0];

      localStorage.setItem(
        "token",
        JSON.stringify(result.token).replace(/\"/g, "")
      );

      this.props.history.push("/main");
    } catch (e) {
      alert("Username or password incorrect");
    }
  };
  render() {
    return (
      <div className="form-div">
        <form>
          <p className="form-p"> Member Login</p>
          <div className="email-box">
            <TiUser className="icon" />
            <input placeholder="e-mail" onChange={this.addEmailToState} />
          </div>
          <div className="password-box">
            <TiKeyOutline className="icon" />
            <input
              placeholder="************"
              type="password"
              onChange={this.addPasswordToState}
            />
          </div>
          <button className="form-button" onClick={this.logIn}>
            Login
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
