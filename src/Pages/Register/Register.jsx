/** @format */

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ThemeChanger from "../../Utilities/ThemeChanger";

document.addEventListener(
  "invalid",
  (function () {
    return function (e) {
      e.preventDefault();
      document.getElementById(e.target.id).focus();
      return;
    };
  })(),
  true
);

const Register = () => {
  const [input, setInput] = useState({});
  const isDarkMode = useSelector((state) => state.darkmode.darkmode);
  const history = useHistory();
  const handleInput = (e) => {
    const { id, value } = e.target;

    setInput((state) => {
      return {
        ...state,
        [id]: value,
      };
    });
  };

  const register = (e) => {
    e.preventDefault();
    if (input.username && input.password) {
      axios
        .post("http://localhost:4000/register", {
          username: input.username,
          password: input.password,
          name: "No name set",
          status:"Hey there i am using chat"
        })
        .then((res) => {
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container-form">
      <form onSubmit={register} className="container-form-form">
        <h2 className="container-form-header">Register</h2>
        <div className="container-form-form-input">
          <input
            type="text"
            id="username"
            required="required"
            autoComplete="off"
            onChange={handleInput}
          />
          <span>Username</span>
        </div>
        <div className="container-form-form-input">
          <input
            type="password"
            id="password"
            required="required"
            onChange={handleInput}
          />
          <span>Password</span>
        </div>
        <div className="container-form-form-input">
          <input
            type="password"
            id="confirm_password"
            required="required"
            onChange={handleInput}
          />
          <span>Confirm Password</span>
        </div>

        <div className="container-form-submit">
          <input type="submit" value="Sign Up" />
        </div>
        <div className="container-form-redirect">
          <p>
            Already have an account?{" "}
            <Link
              to="/"
              style={{
                color: `${isDarkMode ? "#00af9c" : "#2386c8"}`,
              }}
            >
              Login
            </Link>
          </p>
        </div>
        <ThemeChanger size={40} />
      </form>
    </div>
  );
};

export default Register;
