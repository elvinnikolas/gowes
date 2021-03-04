//react
import React, { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//css
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './context/auth'

//components
import Home from './layouts/Home'
import Login from './layouts/Login'
import Register from './layouts/Register'
import { Layout } from './components/Layout'
import NavbarDefault from './components/Navbar'
import { Footer } from './components/Footer'

//route
import AuthRoute from './routes/AuthRoute'
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavbarDefault />
        <Container>
          <Layout>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
            </Switch>
          </Layout>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App