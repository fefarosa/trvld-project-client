import React from "react";
import "./Homepage.css";
import Navbar from '../components/Navbar';
import github from '../images/github.png';
import pin from '../images/pin.png';


function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="home-title">
      <img src={pin} alt="map marker" />
        <h1>trip(pin)</h1>
      </div>
      <div className="btn-link">
        <a href="/auth/signup">
          sign in
        </a>
        <br />
        <a href="/auth/login">
          log in
        </a>
      </div>
      <div className="instructions">
        <p>Record everywhere you've visited.</p>
        <p><strong>Double click on the map</strong> to create a new memory.</p>
      </div>
      <div className="info-footer">
      <div className="github-box">
        <img
          src={github}
          width="30"
          height="30"
          alt="github-icon"
        />
        <a href="https://github.com/EduLp99">EduLp99</a>
        </div>
        <div className="github-box">
        <img
          src={github}
          width="30"
          height="30"
          alt="github-icon"
        />
        <a href="https://github.com/fefarosa">fefarosa</a>
        </div>
        <div className="github-box">
        <img
          src={github}
          width="30"
          height="30"
          alt="github-icon"
        />
        <a href="https://github.com/Suellenhf">Suellenhf</a>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
