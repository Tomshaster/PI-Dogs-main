import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Details from "./Components/Details/Details";
import Create from "./Components/Create/Create";
import Landing from "./Components/Landing/Landing";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/home/details/:id"
          element={
            <>
              {" "}
              <Navbar /> <Details />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              {" "}
              <Navbar /> <Create />{" "}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
