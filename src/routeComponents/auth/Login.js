import React, { useState, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import enter from "../../images/enter.png";

import { AuthContext } from "../../contexts/authContext";

import TextInput from "../../components/TextInput";
import Navbar from "../../components/Navbar";
import api from "../../apis/api";

function Login(props) {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState({ password: "", email: "" });
  // eslint-disable-next-line no-unused-vars
  const [error, setErrors] = useState({
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
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      props.history.push("/my-map");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div>
    <Navbar />
      
    <form onSubmit={handleSubmit}>
      <div><img src={enter} alt="login" /></div>
      <div className='center'>
        <div className='div-input'>
      <TextInput 
        label="e-mail"
        name="email"
        type="email"
        id="loginFormEmail"
        value={state.email}
        onChange={handleChange}
      />
        </div>

      <div className='div-input'>
      <TextInput 
        label="password"
        name="password"
        type="password"
        id="loginFormPassword"
        value={state.password}
        onChange={handleChange}
      />
      </div>

      </div>
      <div className="div-button">
        <div className="btn">
          <button type="submit">log in</button>
        </div>
        <Link to="/signup">don't have an account? click here to signup.</Link>
      </div>
    </form>
    </div>
  );
}

export default Login;
