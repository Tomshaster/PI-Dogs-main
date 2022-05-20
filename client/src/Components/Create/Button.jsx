import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deselectTemperament, selectTemperament } from "../../Actions/Actions";

export default function Button(props) {
  const [clicked, setCLicked] = useState(false);
  const selectedTemps = useSelector((state) => state.selectedTemps);
  const dispatch = useDispatch();

  const toggleClicked = () => {
    setCLicked(!clicked);
    if (clicked === true) {
      dispatch(deselectTemperament(props.name));
    } else {
      dispatch(selectTemperament(props.name));
    }
    console.log(selectedTemps);
  };

  return (
    <button
      className={clicked ? "clicked" : "temperament"}
      onClick={toggleClicked}
    >
      {props.name}
    </button>
  );
}
