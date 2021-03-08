import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "bootstrap/dist/css/bootstrap.min.css";

import { listLogEntries } from "./API";
import Navbar from './components/Navbar';
import MapForm from './components/MapForm';


const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, togglePopup] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    height: "100vh",
    width: "100vw",
    zoom: 1,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);

  return (
    <div>
    <Navbar />
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/fefarosa/ckm0fn2yo0emt17pfd9ziy1mt"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {logEntries.map((element) => (
        <div>
          <Marker
            key={element._id}
            latitude={element.latitude}
            longitude={element.longitude}
          >
            <div
              onClick={() =>
                togglePopup({
                  showPopup,
                  [element._id]: true,
                })
              }
            >
              <img
                className="marker"
                src="https://i.imgur.com/y0G5YTX.png"
                alt="map marker"
              />
            </div>
          </Marker>
          {showPopup[element._id] ? (
            <Popup
              key={element.title}
              latitude={element.latitude}
              longitude={element.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => togglePopup(false)}
              anchor="top"
            >
              <div>
                <p className="title">{element.title}</p>
              </div>
            </Popup>
          ) : null}
        </div>
      ))}
    </ReactMapGL>
    </div>
  );
};

export default App;
