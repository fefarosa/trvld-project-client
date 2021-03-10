import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import PostForm from "./PostForm";
import { useEffect } from "react";
import api from "../../apis/api";

function EditPost() {
    const [state, setState] = useState({
        title: "",
        image: "",
        description: "",
        startDate: "",
        endDate: "",
        updatedAt: "",
    })

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await api.get(`/post/${id}`);
    
            setState({ ...response.data });
          } catch (err) {
            console.error(err);
          }
        }
        fetchData();
      }, [id]);

    return (

    )
};

export default EditPost;