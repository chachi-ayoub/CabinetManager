import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Patients extends Component {
	state = {
		searchTerm : "",
		filter : ""
	}

	setSearchTerm = (value) => {
		this.setState({searchTerm: value});
	}

	setFilter = (value) => {
		this.setState({filter: value});
	}

    render() {
		const {loading} = this.props.value;
        const patients = this.props.value.getPatients();
		
        return (
            <div>
                <div class="">
                    <div class="">

                        <div class="mr-auto d-lg-block ml-4 ml-lg-0">
                            <h3 class="text-primary font-w600 mb-5 mb-lg-0">Manage Patients</h3>
                        </div>

                        <div class="form-head d-flex mb-3 mb-lg-1 align-items-start ml-4 ml-lg-0">
                            {/* <a href="javascript:void(0)" class="btn btn-danger" data-toggle="modal" data-target="#addDoctorModal"><i class="fa fa-plus"></i> New Employee</a> */}
                            <div class="input-group search-area ml-auto d-inline-flex">
                                <input type="text" class="form-control" placeholder="Search here" onChange={event => {this.setSearchTerm(event.target.value)}} />
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
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("New")}} >New</a>
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("Recovered")}} >Recovered</a>
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("In Treatment")}} >In Treatment</a>
                                </div>
                            </div>
                            
                            {/* <select class="form-control style-2 ml-3 default-select ">
                                <option>All</option>
                                <option>Doctors</option>
                                <option>Nurses</option>
                                <option>Assistances</option>
                                <option>Security</option>
                            </select> */}

                            {/* <a href="javascript:void(0);" class="btn btn-outline-primary ml-3"><i class="flaticon-381-menu-1 mr-0"></i></a>
                            <a href="javascript:void(0);" class="btn btn-light ml-3"><i class="flaticon-381-pad mr-0"></i></a> */}
                        
                        </div>

                        <div class="col-lg-12">
							<div class="card">
								{/* <div class="card-header">
									<h4 class="card-title">Exam Toppers</h4>
								</div> */}
								<div class="card-body">
									<div class="table-responsive">
										<table class="table table-responsive-md">
											<thead>
												<tr>
													<th><strong>Patient</strong></th>
													<th><strong>Disease</strong></th>
													<th><strong>Status</strong></th>
													{/* <th><strong>Assigned Doctor</strong></th> */}
													<th></th>
												</tr>
											</thead>
											<tbody>
											{loading || !patients ? (
												<div id="main">
													<div className="row justify-content-center">
													<div class="spinner-border m-5" role="status">
														<span class="sr-only">Loading...</span>
													</div>
													</div>
												</div>
											):(
												patients.length === 0 ? (
													<h4 className="mt-5">Empty !</h4>
												):(
													patients.filter(item => {
														if(this.props.value.authState.user.accessLvl === "Doctor") {
															let found = false;
															item.assignedDoctors.map(ad => {
																if(ad.doctor_id === this.props.value.authState.user.id) {
																	found = true;
																} 
															});
															if(found) return item;
														} else 
														if (this.state.searchTerm === "") {
															if (this.state.filter === "") {
																return item;
															} else if (item.diseases[item.diseases.length-1].status.toLowerCase() === this.state.filter.toLowerCase()) {
																return item;
															}
														} else if (item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
															return item;
														}
													}).reverse().map((patient,index) => {
														return (
															<tr key={index}>
																<td><Link to={this.props.match.path + '/' + patient._id}><div class="d-flex align-items-center"><img src={patient.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">{patient.name}</span></div></Link></td>
																<td>{patient.diseases.length === 0 ? ("-- --"):(patient.diseases[patient.diseases.length-1].name)}</td>
																{patient.diseases[patient.diseases.length-1].status === "New" && (
																	<td><div class="d-flex align-items-center"><i class="fa fa-circle text-danger mr-1"></i> New</div></td>
																)}
																{patient.diseases[patient.diseases.length-1].status === "In Treatment" && (
																	<td><div class="d-flex align-items-center"><i class="fa fa-circle text-warning mr-1"></i> In Treatment</div></td>
																)}
																{patient.diseases[patient.diseases.length-1].status === "Recovered" && (
																	<td><div class="d-flex align-items-center"><i class="fa fa-circle text-success mr-1"></i> Recovered</div></td>
																)}
																
																{/* <td><div class="d-flex align-items-center"><img src={avatar4}  class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">Dr. Jackson</span></div></td> */}
																
																<td>
																	<div class="d-flex">
																		{/* <a href="#" class="btn btn-primary shadow btn-xs sharp mr-1"><i class="fa fa-check"></i></a> */}
																		<a class="btn btn-danger shadow btn-xs sharp text-white" onClick={()=>{this.props.value.deleteUser(patient._id)}}><i class="fa fa-trash"></i></a>
																	</div>
																</td>
															</tr>
														)
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

export default Patients;