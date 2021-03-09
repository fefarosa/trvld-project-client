import "bootstrap/dist/css/bootstrap.min.css";
import "./Map.css";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";

import PostForm from "../components/PostForm";

function Map() {
  const [posts, setPosts] = useState([]);
  const [showPopup, togglePopup] = useState({});
  const [addEntryLocation, setEntryLocation] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
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
    console.log("Entry location = " + JSON.stringify(setEntryLocation));
  };

  return (

      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/fefarosa/ckm0vfk1e119y17nn9hqged75"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={showAddMarkerPopup}
      >
        {posts.map((element) => (
          <>
            <React.Fragment key={element._id}>
              <Marker
                key={element._id}
                latitude={element.latitude}
                longitude={element.longitude}
              >
                <div
                  onClick={() =>
                    togglePopup({
                      [element._id]: true,
                    })
                  }
                >
                  <img
                    className="marker"
                    src="https://www.flaticon.com/svg/vstatic/svg/684/684908.svg?token=exp=1615237506~hmac=033f58088512417a3cfca21a1e305c2d"
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
                  anchor="top"
                >
                  <div className="popup">
                    <h3 className="title">{element.title}</h3>
                    <img
                      className="location-image"
                      src={element.image}
                      alt={element.title}
                    />
                    <p>{element.description}</p>
                    <p>
                      When? {new Date(element.startDate).toLocaleDateString()}
                    </p>
                    {element.endDate ? (
                      <p>
                        until {new Date(element.endDate).toLocaleDateString()}
                      </p>
                    ) : null}
                  </div>
                </Popup>
              ) : null}
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
                src="https://www.flaticon.com/svg/vstatic/svg/684/684908.svg?token=exp=1615237506~hmac=033f58088512417a3cfca21a1e305c2d"
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

export default Map;
