import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const DataContext = React.createContext();

class DataProvider extends Component {
    state = {

        authState: {
            authenticated: !localStorage.getItem('authenticated') ? false : JSON.parse(localStorage.getItem('authenticated')),
            token: null,
            user: !localStorage.getItem('user') ? false : JSON.parse(localStorage.getItem('user'))
        },

        users: [],
        appointments: [],
        standby_rooms: [],
        ressources: [],
        reviews: [],

        loginModalOpen: false,

        alertMsg: '',
        alertSeverity:'',

        loading: false,
        authLoading: false,
        sendLoading: false,

    };

    componentDidMount() {
        this.setUsers();
        this.setAppointments();
        this.setStandby_rooms();
        this.setRessources();
        this.setReviews();
    }

    openLoginModal = () => {
        this.setState(() => {
            return {loginModalOpen: true}
        })
    }

    closeLoginModal = () => {
        this.setState(() => {
            return {loginModalOpen: false}
        })
    }

    setUsers = () => {
      this.setState({ loading: true }, () => {
          axios.get('/server/users')
              .then(response => {
                  if (response.data.length > 0) {
                      this.setState({ users: response.data });
                  } 
              this.setState({ loading: false });
              });
      }); 
    }

    setAppointments = () => {
        this.setState({ loading: true }, () => {
            axios.get('/server/appointments')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({ appointments: response.data });
                }
                this.setState({ loading: false });
                });
        }); 
    }

    setStandby_rooms = () => {
        this.setState({ loading: true }, () => {
            axios.get('/server/standby_rooms')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({ standby_rooms: response.data });
                }
                this.setState({ loading: false });
                });
        }); 
    }

    setRessources = () => {
      this.setState({ loading: true }, () => {
          axios.get('/server/ressources')
              .then(response => {
                  if (response.data.length > 0) {
                      this.setState({ ressources: response.data });
                  } 
              this.setState({ loading: false });
              });
      }); 
    }

    setReviews = () => {
      this.setState({ loading: true }, () => {
          axios.get('/server/reviews')
              .then(response => {
                  if (response.data.length > 0) {
                      this.setState({ reviews: response.data });
                  } 
              this.setState({ loading: false });
              });
      }); 
    }


    getUser = (id) => {
        const user = this.state.users.find(item => item._id===id);
        return user;
    }
    getPatients = () => {
        const patients = this.state.users.filter(item => item.accessLvl==="Patient");
        return patients;
    }
    getDoctors = () => {
        const doctors = this.state.users.filter(item => item.accessLvl==="Doctor");
        return doctors;
    }
    getNurses = () => {
        const nurses = this.state.users.filter(item => item.accessLvl==="Nurse");
        return nurses;
    } 
    getAssistants = () => {
        const assistants = this.state.users.filter(item => item.accessLvl==="Assistant");
        return assistants;
    }
    getSecurity = () => {
        const security = this.state.users.filter(item => item.accessLvl==="Security");
        return security;
    }
    getNewPatients = () => {
        const NewPatients = [];
        this.state.users.forEach(user => {
            if(user.accessLvl==="Patient" && user.diseases[user.diseases.length-1].status === "New") {
                NewPatients.push(user);
            }
        });
        return NewPatients;
    }
    getInTreatmentPatients = () => {
        const inTreatmentPatients = [];
        this.state.users.forEach(user => {
            if(user.accessLvl==="Patient" && user.diseases[user.diseases.length-1].status === "In Treatment") {
                inTreatmentPatients.push(user);
            }
        });
        return inTreatmentPatients;
    }
    getRecoveredPatients = () => {
        const recoveredPatients = [];
        this.state.users.forEach(user => {
            if(user.accessLvl==="Patient" && user.diseases[user.diseases.length-1].status === "Recovered") {
                recoveredPatients.push(user);
            }
        });
        return recoveredPatients;
    }

    getTodaysAppointments = () => {
        // const today = new Date();
        // const appointments = this.state.appointments.find(item => item.date.substring(0,4)===2021);
        // return appointments;
    }
    getAppointment = (id) => {
        const appointment = this.state.appointments.find(item => item._id===id);
        return appointment;
    }

    getRessource = (id) => {
        const ressource = this.state.ressources.find(item => item._id===id);
        return ressource;
    }

    register = (creds) => {
        this.setState({ authLoading: true }, () => {
            axios.post('/server/users/register', creds)
            .then(response => {
                this.closeLoginModal();
                const newState = {
                    authenticated: true,
                    token: response.data.token,
                    user: response.data.user
                }
                this.setState(
                    ()=> {
                        return {
                            authState: newState, 
                            authLoading: false
                        };
                    },
                    ()=> {
                        localStorage.setItem('authenticated', JSON.stringify(this.state.authState.authenticated));
                        localStorage.setItem('user', JSON.stringify(this.state.authState.user));
                        window.location.href="/dashboard";
                    }
                );
            }).catch ( err => {
                this.setState({ 
                    authLoading: false,
                    alertMsg: err,
                    alertSeverity: 'error'
                 });
            });
        }); 
    }
    login = (creds) => {
        this.setState({ authLoading: true }, () => {
            axios.post('/server/users/login', creds)
            .then(response => {
                this.closeLoginModal();
                const newState = {
                    authenticated: true,
                    token: response.data.token,
                    user: response.data.user
                }
                this.setState(
                    ()=> {
                        return {
                            authState: newState, 
                            authLoading: false
                        };
                    },
                    ()=> {
                        localStorage.setItem('authenticated', JSON.stringify(this.state.authState.authenticated));
                        localStorage.setItem('user', JSON.stringify(this.state.authState.user));
                        window.location.href="/dashboard";
                    }
                );
            }).catch ( err => {
                var msg = "";
                switch(err.response.status) {
                    case 404:
                        msg = "Credentials are incorrect !"
                      break;
                    case 401:
                        msg = "Credentials are incorrect !";
                      break;
                    default:
                        msg = "Server error ! Please try again later ..";
                  } 
                this.setState({ 
                    authLoading: false,
                    alertMsg: msg,
                    alertSeverity: 'error'
                 });
            });
        }); 
    }  
    logout = () => {
        const newState = {
            authenticated: false,
            token: null,
            user: {}
        }
        this.setState(
            ()=> {
                return {
                    authState: newState,
                    // loginModalOpen: true
                };
            },
            ()=> {
                localStorage.removeItem('authenticated');
                localStorage.removeItem('user');
                window.location.href="/";
            }
        );
    }
    deleteUser = (user_id) => {
        axios.delete('/server/users/' + user_id)
        .then(() => {
            this.setState({
                alertMsg: "User deleted successfully !",
                alertSeverity: 'success'
            });
            this.setUsers();
        }).catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });
    }

    addAppointment = (appointment) => {
        axios.post('/server/appointments/add', appointment)
        .then(() => {
            this.setState({
                alertMsg: "Appointment added successfully !",
                alertSeverity: 'success'
            });
            this.setAppointments();
        }).catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });
    }
    updateAppointment = (appointment) => {
        axios.put('/server/appointments/' + appointment._id, appointment)
        .then(() => {
            this.setState({
                alertMsg: "Appointment updated successfully !",
                alertSeverity: 'success'
            });
            this.setAppointments();
        })
        .catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });  
    }
    deleteAppointment = (appointment_id) => {
        axios.delete('/server/appointments/' + appointment_id)
        .then(() => {
            this.setState({
                alertMsg: "Appointment deleted successfully !",
                alertSeverity: 'success'
            });
            this.setAppointments();
        }).catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });
    }

    updateStandby_room = (room) => {
        axios.put('/server/standby_rooms/' + room._id, room)
        .then(() => {
            this.setState({
                alertMsg: "Room updated successfully !",
                alertSeverity: 'success'
            });
            this.setStandby_rooms();
        })
        .catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });  
    }

    updateUser = (updatedPatient) => {
        axios.put('/server/users/'+updatedPatient._id, updatedPatient)
        .then(() => {
            this.setUsers();
        })
        .catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });  
    }
    
    addRessource = (ressource) => {
        axios.post('/server/ressources/add', ressource)
        .then(() => {
            this.setState({
                alertMsg: "Ressource added successfully !",
                alertSeverity: 'success'
            });
            this.setRessources();
        }).catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });
    }
    updateRessource = (ressource) => {
        axios.put('/server/ressources/' + ressource._id, ressource)
        .then(() => {
            this.setState({
                alertMsg: "Ressource updated successfully !",
                alertSeverity: 'success'
            });
            this.setRessources();
        })
        .catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });  
    }
    deleteRessource = (ressource_id) => {
        axios.delete('/server/ressources/' + ressource_id)
        .then(() => {
            this.setState({
                alertMsg: "Ressource deleted successfully !",
                alertSeverity: 'success'
            });
            this.setRessources();
        }).catch((err) => {
            this.setState({
                alertMsg: err,
                alertSeverity: 'error'
            })
        });
    }

    showAlert = (msg, severity) => {
        this.setState({ 
            alertMsg: msg,
            alertSeverity: severity
        });
    }

    hideAlerts = () => {
        this.setState({ 
            alertMsg: '',
            alertSeverity: ''
        });
    }

    render() {
        return (
            <DataContext.Provider 
                value={{
                    ...this.state,
                    openLoginModal: this.openLoginModal,
                    closeLoginModal: this.closeLoginModal,
                    getUser: this.getUser,
                    getPatients: this.getPatients,
                    getNewPatients: this.getNewPatients,
                    getInTreatmentPatients: this.getInTreatmentPatients,
                    getRecoveredPatients: this.getRecoveredPatients,
                    getDoctors: this.getDoctors,
                    getNurses: this.getNurses,
                    getAssistants: this.getAssistants,
                    getSecurity: this.getSecurity,
                    getTodaysAppointments: this.getTodaysAppointments, 
                    getAppointment: this.getAppointment,
                    getRessource: this.getRessource,
                    // getCategoryServices: this.getCategoryServices,
                    register: this.register,
                    login: this.login,
                    logout: this.logout,
                    deleteUser: this.deleteUser,
                    showAlert: this.showAlert,
                    hideAlerts: this.hideAlerts,
                    addAppointment: this.addAppointment,
                    updateAppointment: this.updateAppointment,
                    deleteAppointment: this.deleteAppointment,
                    updateStandby_room: this.updateStandby_room,
                    updateUser: this.updateUser,
                    addRessource: this.addRessource,
                    updateRessource: this.updateRessource,
                    deleteRessource: this.deleteRessource
                }} 
            >
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

const DataConsumer = DataContext.Consumer;

export {DataProvider, DataConsumer, DataContext};
