import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';

import Menu from './Screens/Menu'
import Schedule from './Screens/Schedule'
import MapContainer from './Screens/Map'
import VenueScreen from './Screens/VenueScreen'
import BadgesScreen from './Screens/BadgesScreen'
import SnapScreen from './Screens/SnapScreen'
import CameraScreen from './Screens/CameraScreen'

import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const API_BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/';

const auth = new Auth();
const queryString = require('query-string');

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    console.log(nextState.location.hash);
    let parsedHash = queryString.parse(nextState.location.hash);
    // console.log('parsedHash');
    // console.log(parsedHash);
    /* Set data in local storage */
    setSession(parsedHash);
    /* Check on server if user exists and store user */
    checkOrCreateUser(parsedHash.id_token);
    /* handle auth */
    auth.handleAuthentication();
  }
}

/* hack to store auth0 tokens */
function setSession(authResult) {
  let expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
  localStorage.setItem('access_token', authResult.access_token);
  localStorage.setItem('id_token', authResult.id_token);
  localStorage.setItem('expires_at', expiresAt);
}

function checkOrCreateUser(id_token)
{
  fetch(API_BASE_URL+'users', {
      method: 'POST',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + id_token
                }
    })
    .then(response => response.json(true))
    .then((responseData) => { 
      let user = JSON.parse(responseData.body);
      localStorage.setItem('user_id', user.id);
      console.log(JSON.parse(responseData.body));
      //JSON.parse(responseData.body)
      
    });
}

export const makeMainRoutes = () => {
  return (
      <Router history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/menu" render={(props) => <Menu auth={auth} {...props} />} />
          <Route path="/schedule" render={(props) => <Schedule auth={auth} {...props} />} />
          <Route path="/map" render={(props) => <MapContainer auth={auth} {...props} />} />
          <Route path="/venue" render={(props) => <VenueScreen auth={auth} {...props} />} />
          <Route path="/badges" render={(props) => <BadgesScreen auth={auth} {...props} />} />
          <Route path="/snaps" render={(props) => <SnapScreen auth={auth} {...props} />} />
          <Route path="/camera" render={(props) => <CameraScreen auth={auth} {...props} />} />

          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
