import React from 'react'
import './App.css';

// Routing
import { routes } from './utils';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import { ProtectedRoute } from './components';

// Views
import { Home, Login } from './views';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path={routes.login.path} element={ <Login /> } />


          <Route element={ <ProtectedRoute/> }>
            <Route exact path={routes.home.path} element={ <Home /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
