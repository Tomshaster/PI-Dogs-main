import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRaces, getAllTemperaments } from "../../Actions/Actions";
import "./Landing.css";
export default function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRaces());
    dispatch(getAllTemperaments());
  }, []);
  return (
    <div className="landingcont">
      <img
        className="landing"
        src="Image1.png"
        alt="Nada"
        onClick={() => navigate("/home")}
      />
    </div>
  );
}
