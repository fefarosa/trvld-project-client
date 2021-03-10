//map e posts precisam ser private route
//definir de novo a Navbar abaixo do Browser router
//importar o login e singup nas rotas
//quando fizer requisição do axios tem que importar o api da pasta api 

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
//import Navbar from "./Navbar";
import Homepage from "../routeComponents/Homepage";
import Map from "../routeComponents/Map";
// import EditPost from "../routeComponents/EditPost";
// import Posts from "../routeComponents/MyPosts";
// import PostDetail from "../routeComponents/PostDetail";
// import DeletePost from "../routeComponents/DeletePost";
import Login from "../routeComponents/auth/Login";
import Signup from "../routeComponents/auth/Signup";

import PrivateRoute from "../routeComponents/auth/PrivateRoute";
import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <BrowserRouter>
    <AuthContextComponent>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/my-map" component={Map} /> {/* Took down PRIVATE route for now, solve with Pedro */}
        {/* <PrivateRoute path="/post/delete/:id" component={DeletePost} /> */}
        {/* <PrivateRoute path="/post/edit/:id" component={EditPost} /> */}
        {/* <PrivateRoute exact path="/my-posts" component={Posts} /> */}
        {/* <PrivateRoute exact path="/post-detail" component={PostDetail} /> */}
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/signup" component={Signup} />
      </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
