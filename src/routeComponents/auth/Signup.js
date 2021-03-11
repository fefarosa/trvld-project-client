import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

import "./Signup.css";
import TextInput from "../../components/TextInput";
import api from "../../apis/api";
import caneta from "../../images/caneta.png";
import Navbar from "../../components/Navbar";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [error, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      props.history.push("/my-map");
      console.log(response)
    } catch (err) {
      console.error(err.response);
      setErrors({ ...error, ...err.response.data.errors });
    }
  }

  return (
    <div>
    <Navbar />
      <h1>sign up</h1>
      <form onSubmit={handleSubmit}>
        <img src={caneta} alt="caneta" />
        <div className="center">
          <div className="div-input">
            <TextInput
              label="name"
              name="name"
              type="text"
              id="signupFormName"
              value={state.name}
              onChange={handleChange}
              error={error.name}
            />

            <TextInput
              label="e-mail"
              name="email"
              type="email"
              id="signupFormEmail"
              value={state.email}
              onChange={handleChange}
              error={error.email}
            />

            <TextInput
              label="password"
              name="password"
              type="password"
              id="signupFormPassword"
              value={state.password}
              onChange={handleChange}
              hint="password must be at least 8 characters long, must include at least one uppercase letter, one lowercase letter, one number and one special character."
              error={error.password}
            />

            {/* {error ? (
              <small className="form-text invalid-feedback">
                {error}
              </small>
            ) : null} */}

            <div className="div-button">
              <button className="btn" type="submit">
                sign up
              </button>
              <Link className="link" to="/login">
                already have an account? click here to login.
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
