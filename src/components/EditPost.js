/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./postForm.css";

import api from "../apis/api";

function EditPost(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmitHook } = useForm();
  const [state, setState] = useState({...props.currentPost});
  const [formData, setFormData] = useState({});

  const history = useHistory();

  function handleChange(e) {
    if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value.trim(),
      });
    }
  }

  async function handleFileUpload(file) {
    try{
      const uploadData = new FormData();
      uploadData.append('picture', file);
      const response = await api.post('/upload', uploadData);
      
      return response.data.fileUrl
  
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const upload = await handleFileUpload(state.image);
      const response = await api.patch(`/post/${props.currentPost._id}`, 
      {
        ...state, image: upload
      });
      console.log(response);
      setLoading(false);
      window.location.reload();
      // props.onClose()
    } catch (err) {
      console.error(err);
      setError(error.message);
      setLoading(false);
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
        <input name="image" type="file" onChange={handleChange} />
        <label htmlFor="description" ref={register}>
          description
        </label>
        <textarea name="description" value={state.description} rows={4} onChange={handleChange} />
        <label htmlFor="startDate" ref={register}>
          visit date*
        </label>
        <input name="startDate" value={new Date(state.startDate)
        .toISOString().split("T")[0]
        } type="date" onChange={handleChange} required />
        <p className="mandatory-items">* this field needs to be filled out</p>
        <div className="buttons-details">
        <button type="submit" disabled={loading}>
          {loading ? "loading..." : "submit edited pin"}
        </button>
        <button onClick={() => props.setEditEntry(false)}>cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
