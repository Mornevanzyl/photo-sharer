import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/photos/Home';
import Signin from './components/authentication/Signin';
import Register from './components/authentication/Register';
import { AuthProvider } from './components/authentication/AuthContext';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/signup" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
