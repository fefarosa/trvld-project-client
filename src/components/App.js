//map e posts precisam ser private route
//definir de novo a Navbar abaixo do Browser router
//importar o login e singup nas rotas
//quando fizer requisição do axios tem que importar o api da pasta api 

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "../routeComponents/Homepage";
import Map from "../routeComponents/Map";
import Login from "../routeComponents/auth/Login";
import Signup from "../routeComponents/auth/Signup";

// import PrivateRoute from "../routeComponents/auth/PrivateRoute";
import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <BrowserRouter>
    <AuthContextComponent>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/my-map" component={Map} /> 
        {/* <Route exact path="/logout" component={Homepage} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
