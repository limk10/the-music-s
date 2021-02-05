import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "~/pages/Auth";
import NotFound from "~/pages/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
