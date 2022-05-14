import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRaces,
  getAllTemperaments,
  searchRaces,
} from "../../Actions/Actions";
import Card from "../Card/Card";
import "./Home.css";

export default function Home(props) {
  const races = useSelector((state) => state.races);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [dogNumber] = useState(6);
  const currentPageNumber = pageNumber * dogNumber - dogNumber;
  const paginatedRaces = races.slice(currentPageNumber, dogNumber * pageNumber);
  const temperaments = useSelector((state) => state.temperaments);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllRaces());
    dispatch(getAllTemperaments());
  }, []);

  const handlePrev = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    if (pageNumber * 6 > races.length) return;
    setPageNumber(pageNumber + 1);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPageNumber(1);
    if (!search) {
      return dispatch(getAllRaces());
    }
    dispatch(searchRaces(search));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => handleChange(e)}
          placeholder="Search Race"
        />
        <button type="submit">Search</button>
      </form>
      <div className="container">
        {races.length < 1 ? (
          <div> "No se encontraron perritos :c" </div>
        ) : (
          paginatedRaces.map((r) => {
            if ("api_id" in r) {
              return (
                <div className="card">
                  <Card
                    name={r.name}
                    img={r.image}
                    temp={r.temperament}
                    weight={r.weight}
                    id={r.api_id}
                  />
                </div>
              );
            }
          })
        )}
      </div>
      <div>
        <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  );
}

{
  /* <p>{r.name}</p>
   <p>
     <img src={r.image} />
   </p>
   <p> {r.temperament} </p>
   <p> {r.weight} </p> */
}
