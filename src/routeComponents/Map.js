/* eslint-disable import/first */
import "bootstrap/dist/css/bootstrap.min.css";
import "./Map.css";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

import NavbarMyMap from "../components/NavbarMyMap";
import PostForm from "../components/PostForm";
import EditPost from "../components/EditPost";
import api from "../apis/api";
import pinBlack from "../images/pinBlack.png";
import pin from "../images/pin.png";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

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
      const response = await api.get("/");

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
      console.log(response);
      getPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/fefarosa/ckm0vfk1e119y17nn9hqged75"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={showAddMarkerPopup}
    >
      <NavbarMyMap />
      {posts.map((element) => (
        <React.Fragment key={element._id}>
          <Marker latitude={element.latitude} longitude={element.longitude}>
            <div onClick={() => togglePopup({ [element._id]: true })}>
              <img className="marker" src={pinBlack} alt="map marker" />
            </div>
          </Marker>
          {showPopup[element._id] ? (
            <Popup
              latitude={element.latitude}
              longitude={element.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => togglePopup(false)}
              anchor="top"
            >
              {!editEntry ? (
                <div className="popup">
                  <h3 className="title">{element.title}</h3>
                  {element.image ? (
                    <img
                      className="location-image"
                      src={element.image}
                      alt={element.title}
                    />
                  ) : (
                    <img className="pin-marker" src={pin} alt="map marker" />
                  )}
                  <p className="description">{element.description}</p>
                  {element.startDate ? (
                    <p className="dates">
                      when? {new Date(element.startDate).toLocaleDateString()}
                    </p>
                  ) : null}
                  <div className="created-at-div">
                    <p className="created-at-post">
                      post created at
                      <br />
                      {new Date(element.createdAt).toLocaleDateString()}
                    </p>
                    {element.updatedAt !== element.createdAt ? (
                      <p className="created-at-update">
                        updated at
                        <br />
                        {new Date(element.updatedAt).toLocaleDateString()}
                      </p>
                    ) : null}
                  </div>
                  <div className="buttons-details">
                    <button
                      onClick={() => {
                        setEditEntry(true);
                      }}
                    >
                      edit
                      <br />
                      post
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(element._id);
                      }}
                    >
                      delete
                      <br />
                      post
                    </button>
                  </div>
                </div>
              ) : (
                <EditPost
                  currentPost={element}
                  setEditEntry={setEditEntry}
                  onClose={() => {
                    // setEntryLocation(null);
                    setRefreshKey((oldKey) => oldKey + 1);
                    getPosts();
                  }}
                />
              )}
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <img className="marker" src={pinBlack} alt="map marker" />
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
