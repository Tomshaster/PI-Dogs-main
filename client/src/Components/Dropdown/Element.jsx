import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deselectTemperament, selectTemperament } from "../../Actions/Actions";

export default function Element(props) {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const selectedTemps = useSelector((state) => state.selectedTemps);

  const select = (temp) => {
    setSelected(!selected);
    if (!selected) {
      dispatch(selectTemperament(temp));
    } else {
      dispatch(deselectTemperament(temp));
    }
  };

  return (
    <li
      onClick={() => select(props.text)}
      className={selectedTemps.includes(props.text) ? "selTemp" : "temp"}
    >
      {props.text}
    </li>
  );
}
