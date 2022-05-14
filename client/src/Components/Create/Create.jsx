import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments } from "../../Actions/Actions";
import Button from "./Button";
import "./Create.css";

export default function Create() {
  const temps = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);
  return (
    <>
      <div className="form">
        <form>
          <label>Name:</label>
          <br />
          <input type="text" />
          <br />
          <label>Weight:</label>
          <br />
          <input type="number" />
          <label> - </label>
          <input type="number" /> Kg
          <br />
          <label>Height:</label>
          <br />
          <input type="number" />
          <label> - </label>
          <input type="number" /> Cm
          <br />
          <label> LifeSpan:</label>
          <br />
          <input type="number" />
          <label> - </label>
          <input type="number" /> Years
        </form>
      </div>
      <div>
        Temperaments:
        <ul className="temps">
          {temps.map((t) => {
            return <Button name={t.name} />;
          })}
        </ul>
      </div>
    </>
  );
}
