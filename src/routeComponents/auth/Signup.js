import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";

import TextInput from "../../components/TextInput";
import api from "../../apis/api";
import pen from "../../images/pen.png";
import Navbar from "../../components/Navbar";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [error, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const history = useHistory();

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
      history.push("/my-map");
      console.log(response);
    } catch (err) {
      console.error(err.response);
      setErrors({ ...error, ...err.response.data.errors });
    }
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="title-image">
          <img className="img-center" src={pen} alt="pen" />
        </div>
        <div className="center-login">
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
        </div>
        <div className="btn-link">
            <button type="submit">sign up</button>
        </div>
          <div className="go-to-signup-login">
            <Link className="link" to="/login">
              already have an account?
              <p>click here to login.</p>
            </Link>
          </div>
      </form>
    </div>
  );
}

export default Signup;
