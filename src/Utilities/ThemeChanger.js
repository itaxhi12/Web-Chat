import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";
const ThemeChanger = ({ size }) => {
  const dispatch = useDispatch();
  const toggleDarkMode = (checked) => {
    if (checked) {
      localStorage.setItem("darkmode", checked);
      dispatch({ type: "DARK" });
    } else {
      localStorage.setItem("darkmode", checked);
      dispatch({ type: "LIGHT" });
    }
  };
  const isDarkMode = useSelector((state) => state.darkmode.darkmode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("dark-theme", "dark");
    } else {
      document.documentElement.setAttribute("dark-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <DarkModeSwitch
        style={{ marginBottom: "2rem", marginTop: "2rem" }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={size}
      />
    </div>
  );
};

export default ThemeChanger;
