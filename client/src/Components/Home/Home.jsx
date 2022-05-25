import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTemperaments,
  getAllRaces,
  getAllTemperaments,
  searchRaces,
} from "../../Actions/Actions";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Element from "../Dropdown/Element";
import "./Home.css";

export default function Home() {
  const allRaces = useSelector((state) => state.races);
  const temperaments = useSelector((state) => state.temperaments);
  const selectedTemps = useSelector((state) => state.selectedTemps);
  const [displayed, setDisplayed] = useState(allRaces);
  const [races, setRaces] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [dogNumber] = useState(8);
  const currentPageNumber = pageNumber * dogNumber - dogNumber;
  const paginatedRaces = races.slice(currentPageNumber, dogNumber * pageNumber);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRaces());
    dispatch(getAllTemperaments());
    dispatch(clearTemperaments());
  }, []);

  useEffect(() => {
    setDisplayed(allRaces);
  }, [allRaces]);

  useEffect(() => {
    setRaces(displayed);
  }, [displayed]);

  const handlePrev = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    if (pageNumber * 8 >= displayed.length) return;
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

  const handleFilter = async () => {
    let filter = await displayed.filter((r) => {
      if (
        "api_id" in r &&
        r.temperament &&
        selectedTemps.every((t) => {
          return r.temperament.includes(t);
        })
      ) {
        return true;
      } else {
        if ("api_id" in r) {
          return false;
        }
        let temp = r.temperaments.map((t) => t.name);
        temp = temp.toString();
        if (
          temp &&
          selectedTemps.every((t) => {
            return temp.includes(t);
          })
        ) {
          return true;
        } else return false;
      }
    });
    console.log(filter);
    console.log(displayed);
    setRaces(filter);
    setPageNumber(1);
  };

  const clearFilter = async () => {
    setRaces(displayed);
    dispatch(clearTemperaments());
    setPageNumber(1);
  };

  const handleOrder = (order) => {
    let ordered = races;
    switch (order) {
      case "a-z":
        ordered = ordered.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        break;

      case "z-a":
        ordered = ordered.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        });
        break;

      case "asc":
        ordered = ordered.sort((a, b) => {
          if (
            parseInt(a.weight.split(" ")[0]) < parseInt(b.weight.split(" ")[0])
          )
            return -1;
          if (
            parseInt(a.weight.split(" ")[0]) > parseInt(b.weight.split(" ")[0])
          )
            return 1;
          return 0;
        });
        break;
      case "desc":
        ordered = ordered.sort((a, b) => {
          if (
            parseInt(a.weight.split(" ")[0]) < parseInt(b.weight.split(" ")[0])
          )
            return 1;
          if (
            parseInt(a.weight.split(" ")[0]) > parseInt(b.weight.split(" ")[0])
          )
            return -1;
          return 0;
        });
        break;
      default:
        break;
    }
    setRaces(ordered);
    setPageNumber(1);
    dispatch(getAllTemperaments());
    console.log(races);
  };

  const toggleShow = async (show) => {
    let display = allRaces;
    switch (show) {
      case "api":
        display = display.filter((r) => "api_id" in r);
        break;
      case "db":
        display = display.filter((r) => {
          if ("api_id" in r) {
            return false;
          } else {
            return true;
          }
        });
      default:
        break;
    }
    setDisplayed(display);
    dispatch(clearTemperaments());
    setPageNumber(1);
  };

  return (
    <div className="container">
      <div className="filters_search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => handleChange(e)}
            placeholder="Search Race"
          />
          <button type="submit">Search</button>
        </form>
        <div>
          <Dropdown text="Display">
            <li onClick={() => toggleShow("api")}>Display Races from API</li>
            <li onClick={() => toggleShow("db")}>Display Races from DB</li>
            <li onClick={() => toggleShow("both")}>Display Both</li>
          </Dropdown>
        </div>
        <div>
          <Dropdown text="Choose Temperaments">
            {temperaments.map((t) => {
              return <Element text={t.name} />;
            })}
          </Dropdown>
          <button onClick={handleFilter}>Filter</button>
          <button onClick={clearFilter}>Clear Filter</button>
        </div>
        <div>
          <Dropdown text="Order By">
            <li onClick={() => handleOrder("a-z")}>A - Z</li>
            <li onClick={() => handleOrder("z-a")}>Z - A</li>
            <li onClick={() => handleOrder("asc")}>Weight {"(asc)"}</li>
            <li onClick={() => handleOrder("desc")}>Weight {"(desc)"}</li>
          </Dropdown>
        </div>
      </div>
      <div className="container">
        {races.length < 1 ? (
          <div className="noperros"> No se encontraron perritos :c </div>
        ) : (
          paginatedRaces.map((r) => {
            if ("api_id" in r) {
              return (
                <div className={"card"}>
                  <Card
                    name={r.name}
                    img={r.image}
                    temp={r.temperament}
                    weight={r.weight}
                    id={r.api_id}
                  />
                </div>
              );
            } else {
              let temp = r.temperaments.map((t) => t.name);
              temp = temp.toString();
              return (
                <div className={"card"}>
                  <Card
                    name={r.name}
                    img={r.image}
                    temp={temp}
                    weight={r.weight}
                    id={r.name}
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
