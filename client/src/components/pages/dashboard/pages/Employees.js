import React, { Component } from 'react';
import { Link } from "react-router-dom";

import avatar1 from "../../../../assets/images/avatar/6.jpg"
import avatar2 from "../../../../assets/images/avatar/2.jpg"
import avatar3 from "../../../../assets/images/avatar/4.jpg"
import avatar4 from "../../../../assets/images/avatar/1.jpg"

class Employees extends Component {
    state = {
        name : "",
        accessLvl : "",
        specialty : "",
        email : "",
        password : "",

		searchTerm : ""
	}

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addEmployee = (e) => {
        e.preventDefault();

        const name = this.state.name;
        const accessLvl = this.state.accessLvl;
        const specialty = this.state.specialty;
        const email = this.state.email;
        const password = this.state.password;
        const address = "";
        const phone = "";
        const image = "/images/avatars/not-available.jpg";
        const story = "";
        const note = "";
        const statistics = [];

        this.props.value.register({email,password,accessLvl,name, address,phone,image,story,note,statistics,specialty});
    }

	setSearchTerm = (value) => {
		this.setState({searchTerm: value});
	}
    
    render() {
        const {loading} = this.props.value;
        const doctors = this.props.value.getDoctors();
        const nurses = this.props.value.getNurses();
        const assistants = this.props.value.getAssistants();
        const security = this.props.value.getSecurity();

        return (
            <div>
                <div class="">
                <div class="">

                    <div class="mr-auto d-lg-block ml-4 ml-lg-0">
                        <h3 class="text-primary font-w600 mb-0">Manage Employees</h3>
                    </div>

                    <div class="form-head d-flex mb-3 mb-lg-1 align-items-start ml-4 ml-lg-0">
                        <a href="" class="btn btn-danger px-5 ml-auto" data-toggle="modal" data-target="#addDoctorModal"><i class="fa fa-plus"></i> Hire New Employee</a>
                        {/* <div class="input-group search-area ml-auto d-inline-flex">
                            <input type="text" class="form-control" placeholder="Search here"/>
                            <div class="input-group-append">
                                <a href="javascript:void(0)" class="input-group-text"><i class="fa fa-search"></i></a>
                            </div>
                        </div>
                        <div class="dropdown ml-3 d-inline-block">
                            <div class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-filter mr-2"></i> Filter
                            </div>
                            <div class="dropdown-menu dropdown-menu-left">
                                <a class="dropdown-item" href="#">Doctors</a>
                                <a class="dropdown-item" href="#">Nurses</a>
                                <a class="dropdown-item" href="#">Assistants</a>
                                <a class="dropdown-item" href="#">Security</a>
                            </div>
                        </div> */}
                        
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

                    <div class="modal fade" id="addDoctorModal">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add Employee</h5>
                                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={this.addEmployee}>
                                    <div class="form-group d-flex">
                                            <label class="text-black font-w500">Sector</label>
                                            <div class="form-check ml-3 mr-3">
                                                <input class="form-check-input" type="radio" name="accessLvl" value="Doctor" onChange={this.handleInput} />
                                                <label class="form-check-label">
                                                    Doctor
                                                </label>
                                            </div>
                                            <div class="form-check mr-3">
                                                <input class="form-check-input" type="radio" name="accessLvl" value="Nurse" onChange={this.handleInput} />
                                                <label class="form-check-label">
                                                    Nurse
                                                </label>
                                            </div>
                                            <div class="form-check mr-3">
                                                <input class="form-check-input" type="radio" name="accessLvl" value="Assistant" onChange={this.handleInput} />
                                                <label class="form-check-label">
                                                    Assistant
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="accessLvl" value="Security" onChange={this.handleInput} />
                                                <label class="form-check-label">
                                                    Security
                                                </label>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="text-black font-w500">Employee Name</label>
                                            <input name="name" type="text" class="form-control" onChange={this.handleInput} required/>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="text-black font-w500">Specialty</label>
                                            <input name="specialty" type="text" class="form-control" onChange={this.handleInput} required/>
                                        </div>

                                        <div class="form-group">
                                            <label class="text-black font-w500">Email (for authentification)</label>
                                            <input name="email" type="text" class="form-control" onChange={this.handleInput} required/>
                                        </div>

                                        <div class="form-group">
                                            <label class="text-black font-w500">Password (for authentification)</label>
                                            <input name="password" type="password" class="form-control" onChange={this.handleInput} required/>
                                        </div>
                                        
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary">CREATE</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row card mx-2 mx-lg-0">
                        <div class="col-xl-12 card-body">
                            <div id="accordion-one" class="accordion doctor-list ">
                                <div class="accordion__item">
                                    <div class="accordion__header rounded-lg" data-toggle="collapse" data-target="#default_collapseOne">
                                        {/* <span class="accordion__header-alphabet">A</span> */}
                                        <span class="accordion__header-line flex-grow-1"></span>

                                        <span class="accordion__header--text">Doctors ( {loading ? ("loading ..") : (doctors.length)} )</span>
                                        <span class="accordion__header--indicator style_two"></span>
                                    </div>
                                    <div id="default_collapseOne" class="collapse accordion__body show" data-parent="#accordion-one">
                                            <div class="widget-media best-doctor pt-4">
                                                <div class="timeline row">
                                                    
                                                    {loading || !doctors ? (
                                                        <div id="main">
                                                            <div className="row justify-content-center">
                                                            <div class="spinner-border m-5" role="status">
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    ):(
                                                        doctors.length === 0 ? (
                                                            <h4 className="mt-2 ml-5 pl-3">Empty !</h4>
                                                        ):(
                                                            doctors.map(doctor => {
                                                                return (
                                                                    <>
                                                                        <div class="col-lg-6">
                                                                            <div class="timeline-panel bg-white p-4 mb-4">
                                                                                <div class="media mr-4">
                                                                                    <img alt="image" width="90" src={doctor.image} />
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <Link to={this.props.match.path + '/' + doctor._id}><h4 class="mb-2">Dr. {doctor.name}</h4></Link>
                                                                                    <p class="mb-2 text-primary">{doctor.specialty}</p>
                                                                                    <div class="star-review">
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-gray"></i>
                                                                                        <i class="fa fa-star text-gray"></i>
                                                                                        <span class="ml-3">451 reviews</span>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <div class="social-media">
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-instagram btn-sm"></a>
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-twitter btn-sm"></a>
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-facebook-f btn-sm"></a>
                                                                                </div> */}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        )
                                                    )} 

                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div class="accordion__item">
                                    <div class="accordion__header rounded-lg" data-toggle="collapse" data-target="#default_collapseTwo">
                                        {/* <span class="accordion__header-alphabet">B</span> */}
                                        <span class="accordion__header-line flex-grow-1"></span>
                                        <span class="accordion__header--text">Nurses ( {loading ? ("loading ..") : (nurses.length)} )</span>
                                        <span class="accordion__header--indicator style_two"></span>
                                    </div>
                                    <div id="default_collapseTwo" class="collapse accordion__body" data-parent="#accordion-one">
                                        <div class="widget-media best-doctor pt-4">
                                            <div class="timeline row">
                                                
                                                {loading || !nurses ? (
                                                        <div id="main">
                                                            <div className="row justify-content-center">
                                                            <div class="spinner-border m-5" role="status">
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    ):(
                                                        nurses.length === 0 ? (
                                                            <h4 className="mt-2 ml-5 pl-3">Empty !</h4>
                                                        ):(
                                                            nurses.map(nurse => {
                                                                return (
                                                                    <>
                                                                        <div class="col-lg-6">
                                                                            <div class="timeline-panel bg-white p-4 mb-4">
                                                                                <div class="media mr-4">
                                                                                    <img alt="image" width="90" src={nurse.image} />
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <Link to={this.props.match.path + '/' + nurse._id}><h4 class="mb-2">{nurse.name}</h4></Link>
                                                                                    <p class="mb-2 text-primary">{nurse.specialty}</p>
                                                                                    <div class="star-review">
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-gray"></i>
                                                                                        <i class="fa fa-star text-gray"></i>
                                                                                        <span class="ml-3">451 reviews</span>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <div class="social-media">
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-instagram btn-sm"></a>
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-twitter btn-sm"></a>
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-facebook-f btn-sm"></a>
                                                                                </div> */}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        )
                                                    )}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion__item">
                                    <div class="accordion__header rounded-lg" data-toggle="collapse" data-target="#default_collapseThree">
                                        {/* <span class="accordion__header-alphabet">C</span> */}
                                        <span class="accordion__header-line flex-grow-1"></span>
                                        <span class="accordion__header--text">Assistants ( {loading ? ("loading ..") : (assistants.length)} )</span>
                                        <span class="accordion__header--indicator style_two"></span>
                                    </div>
                                    <div id="default_collapseThree" class="collapse accordion__body" data-parent="#accordion-one">
                                        <div class="widget-media best-doctor pt-4">
                                            <div class="timeline row">
                                                
                                                    {loading || !assistants ? (
                                                        <div id="main">
                                                            <div className="row justify-content-center">
                                                            <div class="spinner-border m-5" role="status">
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    ):(
                                                        assistants.length === 0 ? (
                                                            <h4 className="mt-2 ml-5 pl-3">Empty !</h4>
                                                        ):(
                                                            assistants.map(assistant => {
                                                                return (
                                                                    <>
                                                                        <div class="col-lg-6">
                                                                            <div class="timeline-panel bg-white p-4 mb-4">
                                                                                <div class="media mr-4">
                                                                                    <img alt="image" width="90" src={assistant.image} />
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <Link to={this.props.match.path + '/' + assistant._id}><h4 class="mb-2">{assistant.name}</h4></Link>
                                                                                    <p class="mb-2 text-primary">{assistant.specialty}</p>
                                                                                    <div class="star-review">
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-gray"></i>
                                                                                        <i class="fa fa-star text-gray"></i>
                                                                                        <span class="ml-3">451 reviews</span>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <div class="social-media">
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-instagram btn-sm"></a>
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-twitter btn-sm"></a>
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-facebook-f btn-sm"></a>
                                                                                </div> */}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        )
                                                    )}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion__item">
                                    <div class="accordion__header rounded-lg" data-toggle="collapse" data-target="#default_collapseThree">
                                        {/* <span class="accordion__header-alphabet">D</span> */}
                                        <span class="accordion__header-line flex-grow-1"></span>
                                        <span class="accordion__header--text">Security ( {loading ? ("loading ..") : (security.length)} )</span>
                                        <span class="accordion__header--indicator style_two"></span>
                                    </div>
                                    <div id="default_collapseThree" class="collapse accordion__body" data-parent="#accordion-one">
                                        <div class="widget-media best-doctor pt-4">
                                            <div class="timeline row">
                                                
                                            {loading || !security ? (
                                                        <div id="main">
                                                            <div className="row justify-content-center">
                                                            <div class="spinner-border m-5" role="status">
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    ):(
                                                        security.length === 0 ? (
                                                            <h4 className="mt-2 ml-5 pl-3">Empty !</h4>
                                                        ):(
                                                            security.map(securityMan => {
                                                                return (
                                                                    <>
                                                                        <div class="col-lg-6">
                                                                            <div class="timeline-panel bg-white p-4 mb-4">
                                                                                <div class="media mr-4">
                                                                                    <img alt="image" width="90" src={securityMan.image} />
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <Link to={this.props.match.path + '/' + securityMan._id}><h4 class="mb-2">{securityMan.name}</h4></Link>
                                                                                    <p class="mb-2 text-primary">{securityMan.specialty}</p>
                                                                                    <div class="star-review">
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-orange"></i>
                                                                                        <i class="fa fa-star text-gray"></i>
                                                                                        <i class="fa fa-star text-gray"></i>
                                                                                        <span class="ml-3">451 reviews</span>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <div class="social-media">
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-instagram btn-sm"></a>
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-twitter btn-sm"></a>
                                                                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-rounded fa fa-facebook-f btn-sm"></a>
                                                                                </div> */}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        )
                                                    )}
                                                
                                            </div>
                                        </div>
                                    </div>
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

export default Employees;