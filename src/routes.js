import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { isAuthenticated } from "~/services/auth";

import Auth from "~/pages/Auth";
import Home from "~/pages/Home";
import Artists from "~/pages/Artists";
import Albums from "~/pages/Albums";
import Perfil from "~/pages/Perfil";
import NotFound from "~/pages/NotFound";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      rest={{ ...rest }}
      render={(props) =>
        isAuthenticated() ? (
          <Component props={{ ...props }} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/artists" component={Artists} />
      <PrivateRoute path="/albums" component={Albums} />
      <PrivateRoute path="/perfil" component={Perfil} />
      <Route exact path="/" component={Auth} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
};

export default Routes;
