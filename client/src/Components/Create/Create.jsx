import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTemperament,
  getAllTemperaments,
  addRace,
  clearTemperaments,
} from "../../Actions/Actions";
import Button from "./Button";
import validate from "./Validate";
import "./Create.css";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const temps = useSelector((state) => state.temperaments);
  const selectedTemps = useSelector((state) => state.selectedTemps);
  const response = useSelector((state) => state.createResponse);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [test, setTest] = useState(true);
  const [add, setAdd] = useState("");
  const [input, setInput] = useState({
    name: "",
    minWeight: 0,
    maxWeight: 0,
    minHeight: 0,
    maxHeight: 0,
    minLifeSpan: 0,
    maxLifeSpan: 0,
    temperaments: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearTemperaments());
  }, []);

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [test]);

  useEffect(() => {
    setErrors(
      validate({
        ...input,
      })
    );
  }, [input]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAdd = (e) => {
    setAdd(e.target.value);
  };

  const handleAdd = () => {
    let exists = false;
    temps.forEach((t) => {
      if (t.name.toLowerCase() === add.toLowerCase()) exists = true;
    });
    if (exists) {
      return alert("The temperament already exists!");
    } else {
      dispatch(addTemperament(add));
      setTimeout(setTest(!test), 10000);
    }
  };

  const handleCreate = async () => {
    if (Object.keys(errors).length > 0) {
      return;
    } else {
      if (selectedTemps.length < 1) {
        return alert("Select at least one Temperament");
      }
      input.name = input.name.charAt(0).toUpperCase() + input.name.slice(1);
      let newRace = {
        name: input.name,
        height: `${input.minHeight} - ${input.maxHeight} Cm`,
        weight: `${input.minWeight} - ${input.maxWeight} Kg`,
        life_span: `${input.minLifeSpan} - ${input.maxLifeSpan} Years`,
      };
      let temperaments = selectedTemps;
      console.log(temperaments);
      let info = {
        race: newRace,
        temperaments: temperaments,
      };
      await dispatch(addRace(info));
      if ("success" in response) {
        alert(response.success);
        navigate("/home");
      } else {
        alert("Cannot create Race with uplicate name");
      }
    }
  };

  return (
    <>
      <div className="form">
        <form>
          <label for="n">Name</label>
          <input
            id="n"
            type="text"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <span className="danger">{errors.name}</span>}
          <br />
          <label for="minw">Minumum Weight</label>
          <input
            id="minw"
            type="number"
            name="minWeight"
            onChange={(e) => handleChange(e)}
          />{" "}
          Kg{" "}
          {errors.minWeight && (
            <span className="danger">{errors.minWeight}</span>
          )}
          <br />
          <label for="maxw"> Maximum Weight</label>
          <input
            id="maxw"
            type="number"
            name="maxWeight"
            onChange={(e) => handleChange(e)}
          />
          Kg{" "}
          {errors.maxWeight && (
            <span className="danger">{errors.maxWeight}</span>
          )}
          <br />
          <label>Minimum Height</label>
          <input
            type="number"
            name="minHeight"
            onChange={(e) => handleChange(e)}
          />
          Cm{" "}
          {errors.minHeight && (
            <span className="danger">{errors.minHeight}</span>
          )}
          <br />
          <label>Maximum Height</label>
          <input
            type="number"
            name="maxHeight"
            onChange={(e) => handleChange(e)}
          />
          Cm{" "}
          {errors.maxHeight && (
            <span className="danger">{errors.maxHeight}</span>
          )}
          <br />
          <label>Minimum LifeSpan</label>
          <input
            type="number"
            name="minLifeSpan"
            onChange={(e) => handleChange(e)}
          />
          Years{" "}
          {errors.minLifeSpan && (
            <span className="danger">{errors.minLifeSpan}</span>
          )}
          <br />
          <label>Maximum LifeSpan</label>
          <input
            type="number"
            name="maxLifeSpan"
            onChange={(e) => handleChange(e)}
          />{" "}
          Years{" "}
          {errors.maxLifeSpan && (
            <span className="danger">{errors.maxLifeSpan}</span>
          )}
        </form>
      </div>
      <div>
        Temperaments:
        <ul className="temps">
          {temps.map((t) => {
            return <Button name={t.name} />;
          })}
          <span className="danger">
            <input
              type="text"
              placeholder="New Temperament"
              value={add}
              onChange={(e) => handleChangeAdd(e)}
            />
            <button onClick={handleAdd}>Add</button>
          </span>
        </ul>
        <button onClick={handleCreate}>Create</button>
      </div>
    </>
  );
}
