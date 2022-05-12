import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/")}>Home</button>
      <button>Creation</button>
    </>
  );
}
