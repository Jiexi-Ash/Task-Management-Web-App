import React from "react";

function Button({ children, color = "secondary" }) {
  return (
    <button
      className={`${
        color === "secondary" ? "bg-lightishGrey2/50" : "bg-primaryPurple"
      }`}
    ></button>
  );
}

export default Button;
