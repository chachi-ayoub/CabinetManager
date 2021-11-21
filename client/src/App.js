import React, {lazy, Suspense} from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './assets/css/MainStyle.css';
import './assets/css/Utils.css';

import Header from './components/Header'
import Footer from './components/Footer'
import LoginModal from './components/modals/LoginModal';
import AlertsModal from './components/modals/AlertsModal';

import { DataConsumer, DataProvider } from './context/Context'
import ScrollToTop from './auxilary/ScrollToTop'

import Landing from './components/pages/Landing';
// import Dashboard from './components/pages/dashboard';
import Unauthorized from './components/pages/Unauthorized';
import NotFound from './components/pages/NotFound';

const Dashboard = lazy(()=> import('./components/pages/dashboard'));

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <React.Fragment>

            <ScrollToTop />
            
            <DataConsumer>
              {value => {
                return (
                  <>

                      <Switch>                    
                        <Route exact path="/"><div><Header value={value} /></div></Route>
                        <Route><Header value={value} /></Route>
                      </Switch>

                      <Suspense fallback={
                        <div id="main">
                          <div className="row justify-content-center">
                            <div class="spinner-border m-5" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </div>
                        </div>
                      }>

 
                        <Switch>    
                          <Route exact path="/" render={(props) => (<Landing {...props} value={value} />)} />  
                          {/* <Route path="/dashboard" render={(props) => (<Dashboard {...props} value={value} />)} />                 */}
                          <Route path="/dashboard" render={(props) => (
                            value.authState.authenticated ? (<Dashboard {...props} value={value} />):(<Redirect to="/?login=true" />)
                            
                          )} />           
                          <Route path="/unauthorized" render={(props) => (<Unauthorized {...props} value={value} />)} />        
                          <Route><NotFound /></Route>
                        </Switch>

                      </Suspense>

                      
                      <Switch>                     
                        <Route exact path="/"><Footer /></Route>
                      </Switch>

                      <Switch> 
                        <Route path="/" render={(props) => (
                          <>
                            <LoginModal {...props}value={value} />
                            <AlertsModal {...props}value={value} />
                          </>
                        )} />
                      </Switch>
                  </>
                )
              }}
            </DataConsumer> 

          </React.Fragment>
        </Router>
      </DataProvider>
      
    </div>
  );
}

export default App;
