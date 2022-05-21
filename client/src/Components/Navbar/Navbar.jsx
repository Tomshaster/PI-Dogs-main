import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/create")}>Creation</button>
    </div>
  );
}
