import { useState } from "react";
import "./Dropdown.css";

export default function Dropdown(props) {
  const [display, setDisplay] = useState(false);

  const handleToggle = () => {
    setDisplay(!display);
  };

  return (
    <div>
      <span className="filtermenu" onClick={handleToggle}>
        {props.text}
      </span>
      <ul
        style={display ? { display: "block" } : { display: "none" }}
        className="drop"
      >
        {props.children}
      </ul>
    </div>
  );
}
