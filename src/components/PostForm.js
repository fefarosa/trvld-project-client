import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./postForm.css";

const PostForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmitHook } = useForm();
  const [formData, setFormData] = useState({});

  async function createPost(entry) {
    console.log("The body = " + JSON.stringify(entry));
    const response = await fetch(`http://localhost:4000/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setLoading(true);
      formData.latitude = location.latitude;
      formData.longitude = location.longitude;
      const created = createPost(formData);
      console.log(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title" ref={register}>
        Title*
      </label>
      <input name="title" required onChange={handleChange} />
      <label htmlFor="image" ref={register}>
        Image
      </label>
      <input name="picture" onChange={handleChange} />
      <label htmlFor="description" ref={register}>
        Description
      </label>
      <textarea name="description" rows={4} onChange={handleChange} />
      <label htmlFor="startDate" ref={register}>
        Start Date*
      </label>
      <input name="startDate" type="date" required onChange={handleChange} />
      <label htmlFor="endDate" ref={register}>
        End Date
      </label>
      <input name="endDate" type="date" onChange={handleChange} />
      <button disabled={loading}>
        {loading ? "Loading..." : "Add pin 📌"}
      </button>
    </form>
  );
};

export default PostForm;