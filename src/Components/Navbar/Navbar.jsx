/** @format */

import { Avatar } from "@material-ui/core";
import React, { useState, useRef } from "react";
import ThemeChanger from "../../Utilities/ThemeChanger";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const Navbar = ({ changeopen, changePass }) => {
  const darkMode = useSelector((state) => state.darkmode.darkmode);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const divRef = useRef();
  function handleClick() {
    setAnchorEl(divRef.current);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "customized-menu" : undefined;

  const StyledMenu = withStyles({
    paper: {
      backgroundColor: darkMode ? "#323739" : "#ededed",
      height: "12em",
      borderRadius: "0.5em",
      width: "10em",
      padding: 0,
      margin: 0,
      overflow: "hidden",
      position: "relative",
      zIndex: 10,
      boxShadow: "0 0 10px rgba(0,0,0,0.8)",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      height: "4em",
      width: "10em",
      color: darkMode ? "white" : "black",
      "&:hover": {
        background: darkMode ? "#282D2F" : "#d9d9d9",
      },
    },
  }))(MenuItem);

  const logout = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    } else {
      sessionStorage.removeItem("user");
    }
    dispatch({ type: "LOGOUT" });
    handleClose();
  };
  const gotoProfile = () => {
    changeopen();
    handleClose();
  };
  const gotoChangePass = () => {
    changePass();
    handleClose();
  };

  return (
    <>
      <div className="container-navbar">
        <div className="container-navbar-pfp">
          <button
            onClick={changeopen}
            style={{
              background: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }}
          >
            <Avatar
              src={
                user.user.pfp
                  ? `http://localhost:4000/${user.user.pfp}`
                  : null
              }
            />
          </button>
        </div>
        <div className="container-navbar-themechanger">
          <ThemeChanger size={30} />
        </div>
        <div className="container-navbar-dropdown">
          <Button
            style={{ color: "transparent" }}
            ref={divRef}
            aria-controls={id}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon style={{ color: darkMode ? "#FFFFFF" : "#000000" }} />
          </Button>
          <StyledMenu
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={gotoProfile}>Profile</StyledMenuItem>
            <StyledMenuItem onClick={gotoChangePass}>
              Change Password
            </StyledMenuItem>
            <StyledMenuItem onClick={logout}>Logout</StyledMenuItem>
          </StyledMenu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
