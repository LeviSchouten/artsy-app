import React from "react";
import { Switch, Route } from "react-router-dom";
import Articles from "./Articles";
import Artists from "./Artists";

const Content: React.FC = () => {
  return (
    <div className="Content">
      <Switch>
        <Route exact path="/">
          Home
        </Route>
        <Route path="/articles">
          <Articles />
        </Route>
        <Route path="/artists">
          <Artists />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
