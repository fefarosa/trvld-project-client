import "./Navbar.css";
import { Link } from "react";
import pin from "../images/pin.png";

function NavbarMyMap() {
  return (
    <nav className="navbar">
      <img
        src={pin}
        className="navbar-brand d-inline-block align-top flex-wrap"
        alt="pin-icon"
      />
      <p className="nav-p">trip(pin)</p>
      <div className="logout-btn">
        <button>
         <a href="https://trippin-ih.netlify.app/">log out</a>
        </button>
      </div>
    </nav>
  );
}

export default NavbarMyMap;
