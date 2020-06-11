import React from "react";
import { Switch, Route } from "react-router-dom";
import Articles from "./Articles";
import Artists from "./Artists";
import Artist from "./Artist";

const Content: React.FC = () => {
  return (
    <div className="Content">
      <Switch>
        <Route exact path="/">
          Home
        </Route>
        <Route exact path="/articles">
          <Articles />
        </Route>
        <Route exact path="/artists">
          <Artists />
        </Route>
        <Route path="/artists/:id">
          <Artist />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
