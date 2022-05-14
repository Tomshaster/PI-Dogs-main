import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Details from "./Components/Details/Details";
import Create from "./Components/Create/Create";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
