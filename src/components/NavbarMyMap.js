import './Navbar.css';
import pin from '../images/pin.png';
// import { Link } from 'react';

function NavbarMyMap() {
  return (
    <nav className="navbar">
        <img
          src={pin}
          className="navbar-brand d-inline-block align-top flex-wrap"
          alt="pin-icon"
        />
        <p>
        trip(pin)
        </p>
        <div className="logout-btn">
          {/* <Link to="/logout">log out</Link> */}
        </div>
      </nav>
  );
}

export default NavbarMyMap;
