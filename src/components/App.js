//map e posts precisam ser private route 

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Map from "../routeComponents/Map";
import Homepage from "../routeComponents/Homepage";
import Posts from "../routeComponents/MyPosts"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/my-map" component={Map} />
        <Route exact path="/my-posts" component={Posts} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
