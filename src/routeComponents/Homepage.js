import React from "react";
import "./Homepage.css";
import Navbar from '../components/Navbar'

function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="home-title">
      <img src="https://www.flaticon.com/svg/vstatic/svg/3754/3754022.svg?token=exp=1615371133~hmac=c4afcc8f7ed4a15a0076c83783cd76f3" alt="map marker" />
        <h1>trip(pin)</h1>
      </div>
      <div className="btn-link">
        <a href="#">
          sing in
        </a>
        <br />
        <a href="#">
          log in
        </a>
      </div>
      <div className="instructions">
        <p>record everywhere you've visited.</p>
        <p><strong>double click on the map</strong> to create a new memory.</p>
      </div>
      <div className="info-footer">
      <div className="github-box">
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/1322/1322104.svg?token=exp=1615371195~hmac=fef21f0035f7dca5cc46a01c6a030480"
          width="30"
          height="30"
          alt="github-icon"
        />
        <a href="https://github.com/EduLp99">EduLp99</a>
        </div>
        <div className="github-box">
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/1322/1322104.svg?token=exp=1615371195~hmac=fef21f0035f7dca5cc46a01c6a030480"
          width="30"
          height="30"
          alt="github-icon"
        />
        <a href="https://github.com/fefarosa">fefarosa</a>
        </div>
        <div className="github-box">
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/1322/1322104.svg?token=exp=1615371195~hmac=fef21f0035f7dca5cc46a01c6a030480"
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
