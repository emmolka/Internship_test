import React, { Component } from "react";
import { TiUser } from "react-icons/ti";
import { TiKeyOutline } from "react-icons/ti";
import "./Login.css";
import axios from "axios";
import { Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";

const isLoggedIn = !!window.localStorage.getItem("token");

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  addEmailToState = event => {
    this.setState({ email: event.target.value });
  };
  addPasswordToState = event => {
    console.log(event.target.value);
    console.log(this.state);
    this.setState({ password: event.target.value });
  };
  render() {
    const { props } = this;

    return (
      <BrowserRouter>
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
            <button
              className="form-button"
              onClick={async event => {
                event.preventDefault();
                console.log(this.state.email);
                try {
                  const data = await axios.post(
                    "https://api.shipments.test-y-sbm.com/login",
                    {
                      email: this.state.email,
                      password: this.state.password
                    }
                  );
                  const x = data.data.data[0];
                  console.log(x);
                  localStorage.setItem(
                    "token",
                    JSON.stringify(x.token).replace(/\"/g, "")
                  );
                  console.log(localStorage.token);
                  props.history.push("/main");
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Login
            </button>
          </form>
        </div>
      </BrowserRouter>
    );
  }
}
export default Login;
