import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <img src="favicon.ico" alt="icon" className="icon" />
      <button onClick={() => navigate("/home")} className="navbutton">
        Home
      </button>
      <button onClick={() => navigate("/create")} className="navbutton">
        Creation
      </button>
    </div>
  );
}
