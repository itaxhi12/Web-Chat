/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector } from "react-redux";
import ThemeChanger from "../../Utilities/ThemeChanger";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSnackbar } from "react-simple-snackbar";
document.addEventListener(
  "invalid",
  (function () {
    return function (e) {
      e.target.focus();
    };
  })(),
  true
);
const Login = () => {
  const [input, setInput] = useState({});
  const [checkbox, setCheckbox] = useState(false);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkmode.darkmode);
  const [openSnackbar] = useSnackbar({
    position: "bottom-center",
    style: {
      backgroundColor: isDarkMode ? "#131c21" : "#ededed",
      color: isDarkMode ? "white" : "black",
      textAlign: "center",
    },
    closeStyle: {
      color: isDarkMode ? "white" : "black",
    },
  });
  const handleInput = (e) => {
    const { id, value } = e.target;

    setInput((state) => {
      return {
        ...state,
        [id]: value,
      };
    });
  };
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", input)
      .then((res) => {
        if (checkbox) {
          const data = [res.data];
          localStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", data: data });
        } else {
          const data = [res.data];
          sessionStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", data: data });
        }
      })
      .catch(() => openSnackbar("Invalid username or password"));
  };
  return (
    <div className="container-form">
      <form onSubmit={login} className="container-form-form">
        <h2 className="container-form-header">Login</h2>
        <div className="container-form-form-input">
          <input
            type="text"
            id="username"
            autoComplete="off"
            required="required"
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
        <div className="container-form-checkbox">
          <p>
            Remember me?
            <Checkbox
              style={{ color: `${isDarkMode ? "#00af9c" : "#2386c8"}` }}
              id="signedin?"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
            />
          </p>
        </div>
        <div className="container-form-submit">
          <input type="submit" value="Log In" />
        </div>
        <div className="container-form-redirect">
          <p>
            Don't have an account yet?{" "}
            <Link
              to="/register"
              style={{
                color: `${isDarkMode ? "#00af9c" : "#2386c8"}`,
              }}
            >
              Register
            </Link>
          </p>
        </div>
        <ThemeChanger size={40} />
      </form>
    </div>
  );
};

export default Login;
