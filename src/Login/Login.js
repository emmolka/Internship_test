import React, { Component } from "react";
import { TiUser } from "react-icons/ti";
import { TiKeyOutline } from "react-icons/ti";
import "./Login.css";
import axios from "axios";
import { Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";

const isLoggedIn = !!window.localStorage.getItem("token");

const Login = props => {
  return (
    <BrowserRouter>
      <div className="form-div">
        <form>
          <p className="form-p"> Member Login</p>
          <div className="email-box">
            <TiUser className="icon" />
            <input placeholder="e-mail" value="admin19@gmail.com" />
          </div>
          <div className="password-box">
            <TiKeyOutline className="icon" />
            <input placeholder="************" type="password" value="123" />
          </div>
          <button
            className="form-button"
            onClick={async event => {
              event.preventDefault();
              const email = document.querySelector(".email-box input").value;
              const password = document.querySelector(".password-box input")
                .value;
              try {
                const data = await axios.post(
                  "https://api.shipments.test-y-sbm.com/login",
                  {
                    email: `${email}`,
                    password: `${password}`
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
};
export default Login;
