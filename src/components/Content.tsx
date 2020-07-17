import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Articles from './Articles';
import Artists from './Artists';
import Artist from './Artist';

const Content: React.FC = () => {
  return (
    <div className="Content">
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'}>
          Home
        </Route>
        <Route exact path={process.env.PUBLIC_URL + '/' + '/articles'}>
          <Articles />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + '/' + '/artists'}>
          <Artists />
        </Route>
        <Route path={process.env.PUBLIC_URL + '/' + '/artist/:id'}>
          <Artist />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
