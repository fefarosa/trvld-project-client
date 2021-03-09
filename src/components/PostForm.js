import React from "react";
import {useForm} from 'react-hook-form';
import './postForm.css'

import { createPost } from '../API'

const PostForm = () => {
    const {register, handleSubmit} = useForm;

    const onSubmit = async (data) => {
        try {
            const created = createPost(data);
            console.log(data);
        } catch (err) {
            console.error(err);            
        }
    }

  return (
    <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" ref={register}>Title*</label>
      <input name="title" required/>
      <label htmlFor="image" ref={register}>Image</label>
      <input name="picture"/>
      <label htmlFor="description" ref={register}>Description</label>
      <textarea name="description" rows={4}/>
      <label htmlFor="startDate" ref={register}>Start Date*</label>
      <input name="startDate" type="date" required />
      <label htmlFor="endDate" ref={register}>End Date</label>
      <input name="endDate" type="date"/>
      <button>Add pin 📌</button>
    </form>
  );
};

export default PostForm;
