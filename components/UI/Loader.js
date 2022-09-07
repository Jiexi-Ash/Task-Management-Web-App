import React from "react";

function Loader({
  position = "center",
  color = "",
  align = "center",
  size = "small",
}) {
  return (
    <div
      className={`flex items-center ${
        position === "center" ? "justify-center" : ""
      } ${align === "center" ? "items-center" : ""}`}
    >
      <div
        className={` border-b-2 rounded-full animate-spin ${
          color === "primary" ? "border-primaryPurple" : "border-white"
        } ${size === "small" ? "h-6 w-6" : ""} ${
          size === "medium" ? "h-12 w-12" : ""
        } ${size === "large" ? "h-16 w-16" : ""}`}
      ></div>
    </div>
  );
}

export default Loader;
