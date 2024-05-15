import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/Routing/PrivateRoute';

import './App.css';
import ProfileForm from './components/profile-from/ProfileForm';
import EditProfile from './components/profile-from/EditProfile';
import AddExperience from './components/profile-from/AddExperience';
import AddEducation from './components/profile-from/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profiles/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="/create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="/edit-profile"
            element={<PrivateRoute component={EditProfile} />}
          />
          <Route
            path="/add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="/add-education"
            element={<PrivateRoute component={AddEducation} />}
          />
          <Route
            path="/posts"
            element={<PrivateRoute component={Posts} />}
          />
          <Route
            path="/posts/:id"
            element={<PrivateRoute component={Post} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
