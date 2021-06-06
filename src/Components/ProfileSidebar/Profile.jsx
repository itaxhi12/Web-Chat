/** @format */

import { ArrowBack } from "@material-ui/icons";
import React, { useState, useRef } from "react";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Profile = ({ isOpen, changeOpen }) => {
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user[0]);
  const imageInput = useRef(null);
  const [input, setInput] = useState({});
  const [file,setFile] = useState(null)
  const [inputDis, SetinputDis] = useState(true);
  const [textDis, setTextDis] = useState(true);
  const changeDisabled = () => {
    SetinputDis(!inputDis);
  };
  const changeDisabledText = () => {
    setTextDis(!textDis);
  };
  const changeName = () => {
    axios
      .put(
        `http://localhost:4000/changename/${user.user.username}`,
        { name: input.name },
        { headers: { Authorization: user.jwt } }
      )
      .then((res) => {
        const data = [res.data];
        if (localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", data: data });
        } else {
          sessionStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", data: data });
        }
        SetinputDis(!inputDis);
      })
      .catch((err) => console.log(err));
  };

  const changePfp = (img) => {
    setFile(img)
    const pfp = new FormData()
    pfp.append("pfp",img)
    axios
      .put(
        `http://localhost:4000/changepfp/${user.user.username}`,
        pfp,
        { headers: { Authorization: user.jwt } }
      )
      .then((res) => {
        setFile(null)
        const data = [res.data];
        if (localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", data: data });
        } else {
          sessionStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", data: data });
        }
      })
      .catch((err) => console.log(err));
  };
console.log(user.user.pfp)
  const changeStatus = () => {
    axios
      .put(
        `http://localhost:4000/changestatus/${user.user.username}`,
        { status: input.status },
        { headers: { Authorization: user.jwt } }
      )
      .then((res) => {
        const data = [res.data];
        if (localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", data: data });
        } else {
          sessionStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", data: data });
        }
        setTextDis(!textDis);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((state) => {
      return { ...state, [name]: value };
    });
  };
  return (
    <div className={isOpen ? "container-profile active" : "container-profile"}>
      <div className="container-profile-header">
        <div className="container-chatinfo-header-cross">
          <ArrowBack onClick={changeOpen} style={{ color: "white" }} />
        </div>
        <p>Profile</p>
      </div>
      <div className="container-profile-creds">
        <div className="container-profile-creds-pfp">
          <input
            ref={imageInput}
            type="file"
            style={{ display: "none" }}
            value = {file}
            onChange={(e) => changePfp(e.target.files[0])}
            accept="image/png, image/jpeg, image/jpg , image/jfif"
          />
          <img
            type="image"
            src={user.user.pfp?`http://localhost:4000/${user.user.pfp}`:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt=""
          />

          <div
            onClick={(e) => imageInput.current.click()}
            className="container-profile-creds-pfp-overlay"
          >
            <CameraAltIcon style={{ fontSize: "xxx-large", color: "white" }} />
            <p>Change Profile Picture</p>
          </div>
        </div>
        <div className="container-profile-creds-name">
          <p>Your Name</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              name="name"
              defaultValue={user.user.name}
              placeholder="Your Name"
              disabled={inputDis}
              onChange={handleChange}
            />
            {inputDis ? (
              <IconButton onClick={changeDisabled}>
                <CreateIcon
                  style={{ color: darkmode ? "#00af9c" : "#2386c8" }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={changeName}>
                <CheckIcon
                  style={{
                    color: darkmode ? "#00af9c" : "#2386c8",
                    fontWeight: 500,
                    fontSize: "larger",
                  }}
                />
              </IconButton>
            )}
          </div>
        </div>
        <div className="container-profile-creds-status">
          <p>About</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <textarea
              name="status"
              defaultValue={user.user.status}
              onChange={handleChange}
              disabled={textDis}
            />{" "}
            {textDis ? (
              <IconButton onClick={changeDisabledText}>
                <CreateIcon
                  style={{ color: darkmode ? "#00af9c" : "#2386c8" }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={changeStatus}>
                <CheckIcon
                  style={{
                    color: darkmode ? "#00af9c" : "#2386c8",
                    fontWeight: 500,
                    fontSize: "larger",
                  }}
                />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
