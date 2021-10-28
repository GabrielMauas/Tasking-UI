import React from 'react';
import { Box } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import UserMenu from './components/UserMenu';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';
import TaskList from './components/TaskList';

import PrivateRoute from './components/PrivateRoute';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (
    <Box minH={["110vh", "110vh", "100vh"]} maxW="100vw" overflow="hidden">
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/profile" component={UserMenu} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/reset-password" component={ForgotPassword} />
            <Route path="/:id" component={TaskList} />
          </Switch>
        </AuthProvider>
      </Router>
    </Box>
  );
}

export default App;
