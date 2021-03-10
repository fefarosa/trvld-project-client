import "bootstrap/dist/css/bootstrap.min.css";
import "./Map.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";

import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import EditPost from "../components/EditPost";
import api from "../apis/api";

export default function Map() {
  const [posts, setPosts] = useState([]);
  const [showPopup, togglePopup] = useState({});
  const [addEntryLocation, setEntryLocation] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [refreshKey, setRefreshKey] = useState(0);
  const [editEntry, setEditEntry] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    height: "100vh",
    width: "100vw",
    zoom: 1,
  });
  
  useEffect(() => {
    getPosts();
  }, [refreshKey]);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");

      console.log(response);

      setPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setEntryLocation({
      latitude,
      longitude,
    });
  };

  const handleDelete = async (id) => {
      try {
        const response = await api.delete(`/post/${id}`);
        console.log(response)
        getPosts()
      } catch(err) {
          console.error(err)
      }
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/fefarosa/ckm0vfk1e119y17nn9hqged75"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={showAddMarkerPopup}
    >
      <Navbar />
      {posts.map((element) => (
        <>
          <React.Fragment key={element._id}>
            <Marker
              key={element._id}
              latitude={element.latitude}
              longitude={element.longitude}
            >
              <div onClick={() =>togglePopup({[element._id]: true,})}>
                <img
                  className="marker"
                  src="https://www.flaticon.com/svg/vstatic/svg/3754/3754710.svg?token=exp=1615371131~hmac=db6fa8c73f848988c24b2131fe977b67"
                  alt="map marker"
                />
              </div>
            </Marker>
            {showPopup[element._id] ? (
              <Popup
                latitude={element.latitude}
                longitude={element.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => togglePopup(false)}
                anchor="top">
                {!editEntry ? <div className="popup">
                  <h3 className="title">{element.title}</h3>
                  {element.image ? (
                    <img
                      className="location-image"
                      src={element.image}
                      alt={element.title}/>
                  ) : (
                    <img
                      className="pin-marker"
                      src="https://www.flaticon.com/svg/vstatic/svg/3754/3754022.svg?token=exp=1615371133~hmac=c4afcc8f7ed4a15a0076c83783cd76f3"
                      alt="map marker"/>)}
                  <p className="description">{element.description}</p>
                  <p className="dates">when? {new Date(element.startDate).toLocaleDateString()}</p>
                  {element.endDate ? (<p className="dates">until {new Date(element.endDate).toLocaleDateString()}</p>) : null}
                  <p className="created-at">post created at {new Date(element.createdAt).toLocaleDateString}</p>
                  {element.updatedAt !== element.createdAt ? 
                  <p className="created-at">{new Date(element.updatedAt).toLocaleDateString}</p> : null}
                  <div className="buttons">
                      <button onClick={() => {setEditEntry(true)}}>edit post</button>
                      <button onClick={() => {handleDelete(element._id)}}>delete post</button>
                  </div>
                </div> : 
                <EditPost 
                    currentPost={element}
                    setEditEntry={setEditEntry}
                />}
              </Popup>) : null}
          </React.Fragment>
        </>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <img
              className="marker"
              src="https://www.flaticon.com/svg/vstatic/svg/3754/3754710.svg?token=exp=1615371131~hmac=db6fa8c73f848988c24b2131fe977b67"
              alt="map marker"
            />
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <PostForm
                onClose={() => {
                  setEntryLocation(null);
                  setRefreshKey((oldKey) => oldKey + 1);
                  getPosts();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
      
    </ReactMapGL>
  );
}
