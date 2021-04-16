import React from "react";
import "./Homepage.css";

import { Link } from "react-router-dom";
import github from "../images/github.png";
import pin from "../images/pin.png";

function Homepage() {
  return (
    <div>
      <div className="home-title">
        <img src={pin} alt="map marker" />
        <h1>trip(pin)</h1>
      </div>
      <div className="btn-link">
        <Link to="/login">log in</Link>
        <br />
        <Link to="/signup">sign up</Link>
      </div>
      <div className="instructions">
        <p>record everywhere you've visited.</p>
        <p><strong>double click or double tap on the map</strong></p>
        <p>to create a new memory.</p>
      </div>
      <div className="info-footer">
        <div className="github-box">
          <img src={github} width="30" height="30" alt="github-icon" />
          <a href="https://github.com/EduLp99">EduLp99</a>
        </div>
        <div className="github-box">
          <img src={github} width="30" height="30" alt="github-icon" />
          <a href="https://github.com/fefarosa">fefarosa</a>
        </div>
        <div className="github-box">
          <img src={github} width="30" height="30" alt="github-icon" />
          <a href="https://github.com/Suellenhf">Suellenhf</a>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
