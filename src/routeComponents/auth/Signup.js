import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

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
      setErrors({ ...error, ...err.response.data.error });
    }
  }

  return (
    <div>
    <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="title-image">
        <img className="img-center" src={caneta} alt="caneta" />
        </div>
        <div className="center">
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
            
            <div className="div-input">
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
            </div>

            <div className="div-button">
              <div className="btn" ><button type="submit">
                sign up
              </button></div>
              <div className="go-to-signup-login">
              <Link className="link" to="/login">
                already have an account? 
                <br/>
                click here to login.
              </Link>
              </div>
            </div>
      </form>
    </div>
  );
}

export default Signup;
