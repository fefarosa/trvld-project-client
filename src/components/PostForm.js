import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./postForm.css";

import { createPost } from "../API";

const PostForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = createPost(data);
      console.log(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title" ref={register}>
        Title*
      </label>
      <input name="title" required />
      <label htmlFor="image" ref={register}>
        Image
      </label>
      <input name="picture" />
      <label htmlFor="description" ref={register}>
        Description
      </label>
      <textarea name="description" rows={4} />
      <label htmlFor="startDate" ref={register}>
        Start Date*
      </label>
      <input name="startDate" type="date" required />
      <label htmlFor="endDate" ref={register}>
        End Date
      </label>
      <input name="endDate" type="date" />
      <button disabled={loading}>
        {loading ? "Loading..." : "Add pin 📌"}
      </button>
    </form>
  );
};

export default PostForm;
