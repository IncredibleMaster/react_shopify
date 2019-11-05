import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProfile } from './actions/profileActions';
import { setOptions } from './actions/optionActions';
import { getTestProfile, getDefaultOptions } from './Utils/defaults';
import {
  getProfiles,
  getOptions,
  saveProfiles,
  saveOptions
} from './Utils/storageHandler';
import NavBar from './Components/Nav/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home/Home';
import Profiles from './Components/Pages/Profiles/Profiles';
import Settings from './Components/Pages/Settings/Settings';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let profileData = getProfiles();
    let optionData = getOptions();

    if (profileData) {
      console.log('Loaded old data.');
      profileData.forEach(profile => dispatch(addProfile(profile)));
      dispatch(setOptions(optionData));
    } else {
      console.log('Created new data.');
      dispatch(addProfile(getTestProfile()));
      dispatch(setOptions(getDefaultOptions()));
    }

    saveProfiles(profileData);
    saveOptions(optionData);
  }, []);

  // Return our application which is wrapped in a router for various pages, the Redirect is necessary due to the Chrome extension not specifying a route when mounting, which breaks the navigation highlighting
  return (
    <Router>
      <div className='App dark'>
        <NavBar />
        <Redirect to='/' />
        <Switch>
          <Route path='/profiles' component={Profiles} />
          <Route path='/settings' component={Settings} />
          <Route route='/' component={Home} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
