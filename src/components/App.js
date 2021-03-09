//map e posts precisam ser private route
//definir de novo a Navbar abaixo do Browser router

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
//import Navbar from "./Navbar";
import Map from "../routeComponents/Map";
import Homepage from "../routeComponents/Homepage";
import Posts from "../routeComponents/MyPosts";
import EditPost from "../routeComponents/EditPost";
import PostDetail from "../routeComponents/PostDetail";
//import DeletePost from "../routeComponents/DeletePost";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/post/edit/:id" component={EditPost} />
        {/* <Route path="/post/delete/:id" component={DeletePost} /> */}
        <Route exact path="/my-map" component={Map} />
        <Route exact path="/my-posts" component={Posts} />
        <Route exact path="/post-detail" component={PostDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
