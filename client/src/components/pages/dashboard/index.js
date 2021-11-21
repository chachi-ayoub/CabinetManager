import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import Footer from './Footer';
import NotFound from '../NotFound';

import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import Employees from './pages/Employees';
import DoctorDetails from './pages/DoctorDetails';
import Appointments from './pages/Appointments';
import StandbyRoom from './pages/StandbyRoom';
import Ressources from './pages/Ressources';

// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const Patients = lazy(() => import('./pages/Patients'));
// const PatientDetails = lazy(() => import('./pages/PatientDetails'));
// const Employees = lazy(() => import('./pages/Employees'));
// const DoctorDetails = lazy(() => import('./pages/DoctorDetails'));
// const Appointments = lazy(() => import('./pages/Appointments'));
// const StandbyRoom = lazy(() => import('./pages/StandbyRoom'));
// const Ressources = lazy(() => import('./pages/Ressources'));


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sidebarClass: ""
        };
      }

    sidebarToggleMenu = () => {
        if (this.state.sidebarClass === 'active') {
            this.setState({ sidebarClass: ''});
        } else {
            this.setState({ sidebarClass: 'active'});
        }
    }

    render() {
        return (
            <div>
                <div id="dashboard">
                    <div className="row">
                        <div className="col-3"><Sidebar {...this.props} data={this.state} toggleMenu={this.sidebarToggleMenu} /></div>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            
                                <div id="dashboard-views" className={`${this.state.sidebarClass}`}>
                                    <div className="mr-3 mr-lg-5 ml-3 ml-lg-0">

                                            <Switch>
                                                <Route exact path={this.props.match.path} render={(props) => (<Dashboard {...props} value={this.props.value} />)} />
                                                <Route exact path={this.props.match.path + '/patients'} render={(props) => (<Patients {...props} value={this.props.value} />)} />
                                                <Route path={this.props.match.path + '/patients/:Pid'} render={(props) => (<PatientDetails {...props} value={this.props.value} />)} />
                                                <Route exact path={this.props.match.path + '/employees'} render={(props) => (<Employees {...props} value={this.props.value} />)} />
                                                <Route path={this.props.match.path + '/employees/:Did'} render={(props) => (<DoctorDetails {...props} value={this.props.value} />)} />
                                                <Route exact path={this.props.match.path + '/appointments'} render={(props) => (<Appointments {...props} value={this.props.value} />)} />
                                                <Route exact path={this.props.match.path + '/standby_room'} render={(props) => (<StandbyRoom {...props} value={this.props.value} />)} />
                                                <Route exact path={this.props.match.path + '/ressources'} render={(props) => (<Ressources {...props} value={this.props.value} />)} />
                                                {/* <Route exact path={this.props.match.path + '/ressources'} render={(props) => (
                                                    !this.props.value.loading && (this.props.value.authState.user.accessLvl === "Assistant" || this.props.value.authState.user.accessLvl === "Admin") ? (<Ressources {...props} value={this.props.value} />):(<Redirect to="/unauthorized" />)
                                                    
                                                )} />    */}
                                                <Route component={NotFound} />
                                            </Switch>

                                        <Footer />
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;

