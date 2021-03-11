import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";
import './Signup.css';
import caneta from '../../images/caneta.png';

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
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
      console.log(response);
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <img src={caneta} alt='caneta' />
    </div>
      <div className='center'>
      <div className='div-input'>
        <label htmlFor="signupFormName">name</label>
        <input
          type="text"
          name="name"
          id="signupFormName"
          value={state.name}
          error={errors.name}
          onChange={handleChange}
        />
      </div>

      <div className='div-input'> 
        <label htmlFor="signupFormEmail">e-mail</label>
        <input
          type="email"
          name="email"
          id="signupFormEmail"
          value={state.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>

      <div className='div-input'>
        <label htmlFor="signupFormPassword">password</label>
        <input
          type="password"
          name="password"
          id="signupFormPassword"
          value={state.password}
          error={errors.password}
          onChange={handleChange}
        />
      </div>
      </div>
      <div className='div-button'>
        <div className='btn'><button type="submit">sign up</button></div>
        <Link className='link' to="/login">
        already have an account? click here to login.
        </Link>
      </div>
    </form>
  );
}

export default Signup;
