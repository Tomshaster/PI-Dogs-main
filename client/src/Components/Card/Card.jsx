import { Link } from "react-router-dom";
import "./Card.css";

export default function Card(props) {
  return (
    <div>
      <p>
        {" "}
        <Link to={`details/${props.id}`}> {props.name} </Link>{" "}
      </p>
      <p>
        <img src={props.img} alt="Altimage.png" />
      </p>
      <p>{props.temp}</p>
      <p>{props.weight}</p>
    </div>
  );
}
