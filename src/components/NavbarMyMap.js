import "./Navbar.css";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import pin from "../images/pin.png";
import { AuthContext } from "../contexts/authContext";

function NavbarMyMap() {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    authContext.setLoggedInUser({});
    history.push("/")
  };

  return (
    <nav className="navbar">
      <img
        src={pin}
        className="navbar-brand d-inline-block align-top flex-wrap"
        alt="pin-icon"
      />
      <p className="nav-p">trip(pin)</p>
      <div className="logout-btn">
        <button onClick={handleClick}>log out</button>
      </div>
    </nav>
  );
}

export default NavbarMyMap;
