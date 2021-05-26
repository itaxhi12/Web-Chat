/** @format */

import React, { useState } from "react";
import { ArrowBack } from "@material-ui/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "react-simple-snackbar";
const Changepass = ({ isOpen, changeOpen, username }) => {
  const [input, setInput] = useState({});
  const isDarkMode = useSelector((state) => state.darkmode.darkmode);
  const [openSnackbar] = useSnackbar({
    position: "bottom-left",
    style: {
      backgroundColor: isDarkMode ? "#131c21" : "#ededed",
      color: isDarkMode ? "white" : "black",
      textAlign: "center",
    },
    closeStyle: {
      color: isDarkMode ? "white" : "black",
    },
  });
  const changepass = (e) => {
    e.preventDefault();
    if (input.newpass === input.confpass) {
      axios
        .put(`http://localhost:4000/changepass/${username}`, {
          oldpass: input.oldpass,
          newpass: input.newpass,
        })
        .then((res) => openSnackbar(res.data.message))
        .catch(() => {
          openSnackbar("Invalid Password");
        });
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  return (
    <div
      className={
        isOpen ? "container-changepass active" : "container-changepass"
      }
    >
      <div className="container-changepass-header">
        <div className="container-changepass-header-arrow">
          <ArrowBack onClick={changeOpen} style={{ color: "white" }} />
        </div>
        <p>Change Password</p>
      </div>

      <form className="container-changepass-form" onSubmit={changepass}>
        <div className="container-changepass-form-input">
          <p>Old Password</p>
          <div>
            <input
              type="password"
              name="oldpass"
              placeholder="Old Password"
              onChange={handleInput}
              required
            />
          </div>
        </div>
        <div className="container-changepass-form-input">
          <p>New Password</p>
          <input
            type="password"
            name="newpass"
            placeholder="New Password"
            onChange={handleInput}
            required
          />
        </div>
        <div className="container-changepass-form-input">
          <p>Confirm Password</p>
          <input
            name="confpass"
            type="password"
            placeholder="Confirm New Password"
            onChange={handleInput}
            required
          />
        </div>
        <input
          className="container-changepass-form-submit"
          type="submit"
          value="Update Password"
        />
      </form>
    </div>
  );
};

export default Changepass;
