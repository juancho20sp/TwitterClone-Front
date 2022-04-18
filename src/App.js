import React from 'react'
import './App.css';

// Routing
import { routes } from './utils';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import { ProtectedRoute, UnprotectedRoute } from './components';

// Views
import { Home, Login, SignUp, Profile } from './views';

function App() {
  return (
    <div className="app">
        {/* <Status />
        <Settings /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<UnprotectedRoute />}>
            <Route exact path={routes.login.path} element={ <Login /> } />
          </Route>
          <Route exact path={routes.signUp.path} element={ <SignUp /> } />
        
          <Route element={ <ProtectedRoute/> }>
            <Route exact path={routes.home.path} element={ <Home /> } />
            <Route exact path={routes.profile.path} element={ <Profile /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
