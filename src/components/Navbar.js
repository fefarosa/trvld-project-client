import './Navbar.css'

function Navbar(props) {
  return (
    <div>
      <nav className="navbar">
          <img
            src="./images/PaperAirplane.png"
            width="30"
            height="30"
            className="navbar-brand d-inline-block align-top flex-wrap"
            alt=""
          />
          TRVLD
      </nav>
    </div>
  );
}

export default Navbar;
