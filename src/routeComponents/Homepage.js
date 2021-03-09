import React from "react";
import "./Homepage.css";

function Homepage() {
  return (
    <div>
      <img
        className="home-image"
        src="https://static.thenounproject.com/png/223148-200.png"
        width="70"
        height="70"
        alt="pin-icon"
      />
      <div className="home-title">
        <h1>Tri(pin)</h1>
      </div>
      <div className="btn-link">
        <button type="button" class="btn btn-orange">
          sing in
        </button>
        <br />
        <button type="button" class="btn btn-orange">
          log in
        </button>
      </div>
      <div className="info-footer">
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/1051/1051377.svg?token=exp=1615299937~hmac=2508d272fe76e5b2326f4d393966b3f7"
          width="30"
          height="30"
          alt="github-icon"
        />
        <button type="button" class="btn btn-orange">EduLp99</button>
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/1051/1051377.svg?token=exp=1615299937~hmac=2508d272fe76e5b2326f4d393966b3f7"
          width="30"
          height="30"
          alt="github-icon"
        />
        <button type="button" class="btn btn-orange">fefarosa</button>
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/1051/1051377.svg?token=exp=1615299937~hmac=2508d272fe76e5b2326f4d393966b3f7"
          width="30"
          height="30"
          alt="github-icon"
        />
        <button type="button" class="btn btn-orange">Suellenhf</button>
      </div>
    </div>
  );
}

export default Homepage;
