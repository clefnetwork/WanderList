import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ListGrid from './containers/ListGrid';
import NewList from './containers/addForm/DeepForm'
import ListDetail from './containers/list-detail';
import Login from './containers/login';
import Signup from './containers/signup';
import UserProfile from './components/userProfile'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ ListGrid } />
    <Route path="lists/new" component={ NewList } />
    <Route path="/lists/:id" component={ ListDetail } />
    <Route path='login' component={ Login } />
    <Route path='signup' component={ Signup } />
    <Route path='votes' component={ ListGrid } />
    <Route path='userProfile/:id' component={UserProfile} />
  </Route>
);
