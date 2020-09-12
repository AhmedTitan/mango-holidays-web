import React from "react";
import { Home } from './modules/Home/views/Home';
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components/RouteWithLayout";
import { Main } from "./layouts/Main";
import { PropertyPage } from "./modules/PropertyList/views/PropertyPage";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <RouteWithLayout
        component={Home}
        layout={Main}
        path="/home"
      />
      <RouteWithLayout
        component={PropertyPage}
        layout={Main}
        path="/property/:propertyId"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
