import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Map from './routeComponents/Map'

function App() {
  return(
  <BrowserRouter>
    <Navbar />
    <Route to="/my-map" component={Map} />
  </BrowserRouter>
  )};

export default App;
