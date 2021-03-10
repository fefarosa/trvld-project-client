// import React from 'react';
// import './MyPosts.css';
// import axios from 'axios';
// import MapForm from '../components/MapForm';
// import { useState } from 'react';
// import { useHistory } from "react-router-dom";

// function MyPosts() {
//     const history = useHistory();

//     const [state, setState] = useState({
// 		name: '',
// 		imageUrl: '',
// 		description: '',
// 	});

//     async function handleFileUpload(file) {
//     try {
//       const uploadData = new FormData();

//       uploadData.append("picture", file);

//       const response = await axios.post("/upload", uploadData);

//       return response.data.fileUrl;
//     } catch (err) {
//       console.error(err);
//     }
//   }

// 	function handleChange(event) {
// 		const stateBkp = { ...state };
// 		stateBkp[event.target.name] = event.target.value;

// 		setState(stateBkp);
// 	}

// 	async function handleSubmit(event) {
// 		event.preventDefault();

// 		try {
//             const uploadImageUrl = await handleFileUpload(state.picture);

// 			const response = await axios.post('http://localhost:4000/my-posts', {
// 				...state,
//                 picture: uploadImageUrl
// 			});

// 			console.log(response);
//             history.push('/my-posts')
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}

//     return <div>
//         <h1>My posts</h1>
//         <MapForm state={state} onChange={handleChange} handleSubmit={handleSubmit} />
//     </div>
  
// }

// export default MyPosts;
