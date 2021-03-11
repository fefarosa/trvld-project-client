/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import api from "../apis/api";

function EditPost(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmitHook } = useForm();
  const [state, setState] = useState({...props.currentPost});

  const history = useHistory();

  function handleChange(event) {
    setState({...state, [event.target.name]: event.target.value});
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.patch(`/post/${props.currentPost._id}`, {
        ...state,
      });
      console.log(response)
      props.onClose()
      
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form className="post-form" onSubmit={handleSubmit}>
        {error ? <h3 className="error">{error}</h3> : null}
        <label htmlFor="title" ref={register}>
          title*
        </label>
        <input name="title" value={state.title} required onChange={handleChange} />
        <label htmlFor="image" ref={register}>
          image
        </label>
        <input name="picture" type="file" onChange={handleChange} />
        <label htmlFor="description" ref={register}>
          description
        </label>
        <textarea name="description" value={state.description} rows={4} onChange={handleChange} />
        <label htmlFor="startDate" ref={register}>
          visit date
        </label>
        <input name="startDate" value={new Date(state.startDate).toISOString().split("T")[0]} type="date" onChange={handleChange} />
        <p className="mandatory-items">* this field needs to be filled out</p>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "submit edited pin 📌"}
        </button>
        <button onClick={() => props.setEditEntry(false)}>cancel</button>
      </form>
    </div>
  );
}

export default EditPost;
