import "bootstrap/dist/css/bootstrap.min.css";
import "./Map.css"
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listLogEntries } from "../API";

function Map() {
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
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/fefarosa/ckm0vfk1e119y17nn9hqged75"
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
                  src="https://www.flaticon.com/svg/vstatic/svg/684/684908.svg?token=exp=1615226264~hmac=25a72b361c841c63d9717b4749b664da"
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
                  <h1 className="title">{element.title}</h1>
                </div>
              </Popup>
            ) : null}
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Map;
