import './Navbar.css';
import pin from '../images/pin.png';

function Navbar(props) {
  return (
    <nav className="navbar">
        <img
          src={pin}
          width="30"
          height="40"
          className="navbar-brand d-inline-block align-top flex-wrap"
          alt="pin-icon"
        />
        trip(pin)
      </nav>
  );
}

export default Navbar;
