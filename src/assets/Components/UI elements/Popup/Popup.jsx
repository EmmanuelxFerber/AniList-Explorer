//this is a popup from my custom libary

import "./Popup.css";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

export default function Popup({ type = "information", body, setFilterLoad }) {
  const [popupOn, togglePopup] = React.useState(false);
  const [tooltipVisibility, setVisibility] = React.useState("invisible");
  const iconObj = {
    success: <FaCheckCircle className="icon" />,
    warning: <FaExclamationTriangle className="icon" />,
    error: <FaCircleXmark className="icon" />,
    information: <FaInfoCircle className="icon" />,
  };

  function renderPopup() {
    togglePopup(true);
    setVisibility("visible");
    setTimeout(() => {
      setVisibility("invisible");
      console.log(tooltipVisibility);
    }, 1500);
    setTimeout(() => {
      togglePopup(false);
      setFilterLoad(false);
    }, 2000);
  }

  React.useEffect(() => {
    renderPopup();
  }, []);

  return (
    <div>
      {popupOn && (
        <div className={`popup-container ${type} ${tooltipVisibility}`}>
          {iconObj[type]}
          <div className="body-container">
            {/* <h2>{type}</h2> */}
            <p className="description">{body}</p>
          </div>
        </div>
      )}
    </div>
  );
}
