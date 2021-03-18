import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../apis/api";
import "./postForm.css";

const PostForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmitHook } = useForm();
  const [formData, setFormData] = useState({});

  async function createPost(entry) {
    try {
      const response = await api.post("/", entry)
      return response.data;
    } catch(err) {
      console.error(err)
    }   
  }

  const handleChange = (e) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  async function handleFileUpload(file) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", file);
      const response = await api.post("/upload", uploadData);

      return response.data.fileUrl;
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      formData.latitude = location.latitude;
      formData.longitude = location.longitude;
      const upload = await handleFileUpload(formData.image);
      const created = await createPost({ ...formData, image: upload });
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
        title*
      </label>
      <input name="title" required onChange={handleChange} />
      <label htmlFor="image" ref={register}>
        image
      </label>
      <input name="image" type="file" onChange={handleChange} />
      <label htmlFor="description" ref={register}>
        description
      </label>
      <textarea name="description" rows={4} onChange={handleChange} />
      <label htmlFor="startDate" ref={register}>
        visit date*
      </label>
      <input name="startDate" type="date" required onChange={handleChange} />
      <p className="mandatory-items">* these fields need to be filled out</p>
      <div className="buttons-details">
        <button type="submit" disabled={loading}>
          {loading ? "loading..." : "add pin"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
