import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <Link to="/">Events</Link>

      {isAuth && <Link to="/create">Create Event</Link>}
      {isAuth && <Link to="/myevents">My Events</Link>}

      {isAuth && <Link to="/login">Login</Link>}
      {isAuth && <Link to="/signup">Signup</Link>}
    </nav>
  );
}
