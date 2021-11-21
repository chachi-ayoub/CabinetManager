import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Appointments extends Component {
    state = {
        selectedAppointment_id : "",
        newStatus : "",
		searchTerm : "",
		filter : ""
	}

    componentDidMount= () => {
        this.props.value.authState.user.accessLvl === "Patient" && (
            this.setSearchTerm(this.props.value.authState.user.name)
        )
        this.props.value.authState.user.accessLvl === "Doctor" && (
            this.setSearchTerm(this.props.value.authState.user.name)
        )
    }

    setSelectedAppointment = (value) => {
		this.setState({selectedAppointment_id: value});
	}

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateAppointment = (e) => {
        e.preventDefault();
        
        const appoint = this.props.value.getAppointment(this.state.selectedAppointment_id);

        if(appoint) {
            appoint.status = this.state.newStatus;
            this.props.value.updateAppointment(appoint);
        }
    }

    setSearchTerm = (value) => {
		this.setState({searchTerm: value});
	}

	setFilter = (value) => {
		this.setState({filter: value});
	}


    render() {
        const {loading} = this.props.value;
        const appointments = this.props.value.appointments;

        const myAppointments = [];
		if(appointments) {
			if(this.props.value.authState.user.accessLvl === "Patient" || this.props.value.authState.user.accessLvl === "Doctor") {
				appointments.map(appoint => {
					if(appoint.patient_id === this.props.value.authState.user.id || appoint.doctor_id === this.props.value.authState.user.id) {
						myAppointments.push(appoint);
					}
				})
			}
		}

        return (
            <div>
                <div class="">
                    <div class="">

                        <div class="mr-auto d-lg-block ml-4 ml-lg-0">
                            <h3 class="text-primary font-w600 mb-0">Manage Appointments</h3>
                        </div>

                        <div class="form-head d-flex mb-3 mb-lg-1 align-items-start ml-4 ml-lg-0">
                            {/* <a href="javascript:void(0)" class="btn btn-danger" data-toggle="modal" data-target="#addDoctorModal"><i class="fa fa-plus"></i> New Employee</a> */}
                            <div class="input-group search-area ml-auto d-inline-flex">
                                <input type="text" class="form-control" placeholder="Search here" onChange={event => {this.setSearchTerm(event.target.value)}}/>
                                <div class="input-group-append">
                                    <a href="javascript:void(0)" class="input-group-text"><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="dropdown ml-3 d-inline-block">
                                <div class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-filter mr-2"></i> {this.state.filter === "" ? ("Filter"):(this.state.filter)}
                                </div>
                                <div class="dropdown-menu dropdown-menu-left">
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("")}} >All</a>
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("Successful")}} >Successful</a>
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("Pending")}} >Pending</a>
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("Missed")}} >Missed</a>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade mt-5" id="editAppointmentModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Appointment Status</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.updateAppointment}>
                                            
                                            {/* <div className="form-group">
                                                <label className="text-black font-w500">Update Appointment Status</label>
                                            </div> */}

                                            <div className="ml-5">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="newStatus" value="Successful" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Successful
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="newStatus" value="Pending" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Pending
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="newStatus" value="Missed" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Missed
                                                    </label>
                                                </div>
                                            </div>
                                            
                                
                                            <div className="form-group text-center">
                                                <button type="submit" className="btn btn-primary mt-5">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="card">
                                {/* <div class="card-header">
                                    <h4 class="card-title">Recent Payments Queue</h4>
                                </div> */}
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-responsive-md">
                                            <thead>
                                                <tr>
                                                    <th style={{width:"80px"}}><strong>#</strong></th>
                                                    <th><strong>PATIENT</strong></th>
                                                    <th><strong>DR NAME</strong></th>
                                                    <th><strong>DATE</strong></th>
                                                    <th><strong>STATUS</strong></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {loading || !appointments ? (
                                                    <div id="main">
                                                        <div className="row justify-content-center">
                                                        <div class="spinner-border m-5" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                        </div>
                                                    </div>
                                                ):(
                                                    appointments.length === 0 ? (
                                                        <h4 className="mt-5">Empty !</h4>
                                                    ):(
                                                        appointments.filter(item => {

                                                            const patient = this.props.value.getUser(item.patient_id);
                                                            const doctor = this.props.value.getUser(item.doctor_id);
                                                            if(patient && doctor) {
                                                                if (this.state.searchTerm === "") {
                                                                    if (this.state.filter === "") {
                                                                        return item;
                                                                    } else if (item.status.toLowerCase() === this.state.filter.toLowerCase()) {
                                                                        return item;
                                                                    }
                                                                } else if (patient.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || doctor.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                                                    return item;
                                                                }
                                                            }
                                                            
                                                        }).reverse().map((item,index) => {
                                                            const patient = this.props.value.getUser(item.patient_id);
                                                            const doctor = this.props.value.getUser(item.doctor_id);
                                                            if(patient && doctor) {
                                                                return (
                                                                    <tr>
                                                                        <td><strong>{index+1}</strong></td>
                                                                        <td><Link to={'/dashboard/patients/' + item.patient_id}><div class="d-flex align-items-center"><img src={patient.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">{patient.name}</span></div></Link></td>
                                                                        <td><Link to={'/dashboard/employees/' + item.doctor_id}><div class="d-flex align-items-center"><img src={doctor.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">Dr. {doctor.name}</span></div></Link></td>
                                                                        <td>{item.date.substring(0,10)} at {item.date.substring(11,16)}</td>    
        
                                                                        {item.status.toLowerCase() === "successful" && (
                                                                            <td><span class="badge light badge-success">Successful</span></td>
                                                                        )}
                                                                        {item.status.toLowerCase() === "pending" && (
                                                                            <td><span class="badge light badge-warning">Pending</span></td>
                                                                        )}
                                                                        {item.status.toLowerCase() === "missed" && (
                                                                            <td><span class="badge light badge-danger">Missed</span></td>
                                                                        )}
                                                                        

                                                                        {
                                                                            (this.props.value.authState.user.accessLvl === "Assistant" || this.props.value.authState.user.accessLvl === "Admin") && (
                                                                                <td>
                                                                                    <div class="dropdown">
                                                                                        <button type="button" class="btn light sharp" data-toggle="dropdown">
                                                                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                                                                        </button>
                                                                                        <div class="dropdown-menu">
                                                                                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#editAppointmentModal" onClick={()=>{this.setSelectedAppointment(item._id)}}>Update</a>
                                                                                            <a class="dropdown-item" href="#" onClick={()=>{this.props.value.deleteAppointment(item._id)}}>Delete</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            )
                                                                        }
                                                                        
                                                                    </tr>
                                                                )
                                                            }
                                                        })
                                                    )
                                                    
                                                )}

                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Appointments;