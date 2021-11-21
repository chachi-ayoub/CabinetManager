import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FsLightbox from 'fslightbox-react'; 
import Slider from "react-slick";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import doc1 from '../../../../assets/images/documents/1.jpg'
import doc2 from '../../../../assets/images/documents/2.jpg'
import doc3 from '../../../../assets/images/documents/3.jpg'


class PatientDetails extends Component {
    state = {
        toggler: false,
        slide: 1,

        selectedAppointment_id : "",

        diseaseName : "",
        newStatus : "",
        drugsList : [{
            name: "",
            instructions: ""
        }],

        newNote : "",
        newStory : "",

        patient_id : this.props.match.params.Pid.toString(),
        doctor_id : "",
        appointDate : ""
    }

    openLightboxOnSlide(number) {
        this.setState({
            toggler: !this.state.toggler,
            slide: number
        })
    }

    setSelectedAppointment = (value) => {
		this.setState({selectedAppointment_id: value});
	}

    updateDisease = (e) => {
        e.preventDefault();
        
        const updatedPatient = this.props.value.getUser(this.state.patient_id);
        if(updatedPatient) {
            updatedPatient.diseases[updatedPatient.diseases.length-1].name = this.state.diseaseName;
            updatedPatient.diseases[updatedPatient.diseases.length-1].status = this.state.newStatus;
            updatedPatient.diseases[updatedPatient.diseases.length-1].drugs = this.state.drugsList;
            this.props.value.updateUser(updatedPatient);
        }
    }

    addDrugInput = () => {
        this.setState({drugsList: [...this.state.drugsList, {name: "", instructions: ""}]});
    }
    removeDrugInput = (index) => {
        const list = [...this.state.drugsList];
        list.splice(index,1);
        this.setState({drugsList: list});
    }

    updateNote = (e) => {
        e.preventDefault();
        
        const updatedPatient = this.props.value.getUser(this.state.patient_id);
        if(updatedPatient) {
            updatedPatient.note = this.state.newNote;
            this.props.value.updateUser(updatedPatient);
        }
    }

    updateAppointment = (e) => {
        e.preventDefault();
        
        const appoint = this.props.value.getAppointment(this.state.selectedAppointment_id);

        if(appoint) {
            appoint.status = this.state.newStatus;
            this.props.value.updateAppointment(appoint);
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleInput2 = (e,index) => {
        const { name, value } = e.target;
        const list = [...this.state.drugsList];
        list[index][name] = value;
        this.setState({drugsList: list});
    }

    // handleAutoComplete = (event, value) => {
    //     this.setState({ doctor_id: value });
    // }

    createAppointment = (e) => {
        e.preventDefault();

        const patient_id = this.state.patient_id;
        const doctor_id = this.state.doctor_id;
        const date = this.state.appointDate;
        const status = "Pending";
        
        const updatedPatient = this.props.value.getUser(this.state.patient_id);

        if(updatedPatient) {
             var doctorExist = false;
             updatedPatient.assignedDoctors.map(item=>{
                if(item.doctor_id === this.state.doctor_id) {
                     doctorExist = true;
                }
            })
            if(!doctorExist) {
                const newDoctor = {
                    doctor_id : this.state.doctor_id
                };
                updatedPatient.assignedDoctors.push(newDoctor);
                this.props.value.updateUser(updatedPatient);
            }

            this.props.value.addAppointment({patient_id, doctor_id, date, status});
        }
    }

    unassignDoctor = (doctor_id) => {
        const updatedPatient = this.props.value.getUser(this.state.patient_id);
        if(updatedPatient) {
            updatedPatient.assignedDoctors = updatedPatient.assignedDoctors.filter(item => item.doctor_id !== doctor_id);
            this.props.value.updateUser(updatedPatient);
        }
    }

    deleteDocument = (doc_id) => {
        const updatedPatient = this.props.value.getUser(this.state.patient_id);
        if(updatedPatient) {
            updatedPatient.documents = updatedPatient.documents.filter(item => item._id !== doc_id);
            this.props.value.updateUser(updatedPatient);
        }
    }

    setPatientDrugsList = (value) => {
        this.setState({drugsList: value});
    }

    render() {
        const {loading} = this.props.value;
        const patient = this.props.value.getUser(this.props.match.params.Pid);
        const docs = [];
        if (patient) {
            // this.setPatientDrugsList(patient.diseases[patient.diseases.length-1].drugs);
            patient.documents.map(doc => {
                docs.push(doc.path);
            })
        }
        const doctors = this.props.value.getDoctors();

        const doctorsList = [];
        const appointments = this.props.value.appointments.filter(item=>item.patient_id===this.props.match.params.Pid);

        const settings = {
            className: "carousel",
            centerMode: true,
            centerPadding: 0,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1190,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div>
                <div className="">
                    <div className="">

                        <div className="mr-auto d-lg-block ml-4 ml-lg-0">
                            <h3 className="text-primary font-w600 mb-0">Patient Details</h3>
                        </div>

                        <div className="form-head d-flex mb-md-4 mb-3 align-items-start ml-3 ml-lg-0">
                            {/* <a className="btn btn-dark text-white ml-auto"><i className="fa fa-edit mr-2"></i> Edit Profile</a> */}
                            
                            {/* <a href="" className="btn btn-outline-danger ml-2"><i className="fa fa-times-circle"></i> Reject Patient</a>
                            <a href="" className="btn btn-success ml-2" data-toggle="modal" data-target="#addClientAppointmentModal"><i className="fa fa-check-circle"></i> Accept Patient</a> */}
                            {
                                (this.props.value.authState.user.accessLvl === "Assistant" || this.props.value.authState.user.accessLvl === "Admin") && (
                                    <a href="" className="btn btn-info px-5 ml-auto" data-toggle="modal" data-target="#addClientAppointmentModal"><i className="fa fa-plus"></i> Add New Appointment</a>
                                )
                            }
                        </div>
                        <div className="modal fade mt-5" id="addClientAppointmentModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Client Appointment</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.createAppointment}>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Patient</label>
                                                <input disabled type="text" value={patient && (patient._id)} className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Select Doctor</label>
                                                
                                                {doctors && (
                                                    // doctors.map(doctor => {
                                                    //     doctorsList.push({name: doctor.name + " (" + doctor.specialty + ")", id: doctor._id});
                                                    // }),

                                                    // <Autocomplete
                                                    //     onChange = {(event, value)=>{this.handleAutoComplete(event,value)}}
                                                    //     id="combo-box-demo"
                                                    //     options={doctorsList}
                                                    //     getOptionLabel={(option) => option.name}
                                                    //     getOptionValue={(option) => option.id}
                                                    //     // style={{ width: 300 }}
                                                    //     renderInput={(params) => <TextField {...params} label="Type doctor's name" variant="outlined" />}
                                                    // />
                                                    
                                                    <select required className="form-control" name="doctor_id" value={this.state.doctor_id} onChange={this.handleInput}>
                                                        <option value="" >-- Select Doctor --</option>
                                                        {doctors.map((doctor)=>{
                                                            return(
                                                                <option value={doctor._id} >{doctor.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    
                                                )}

                                                {/* {doctors && (
                                                    <select name="doctor_id" value={this.state.doctor_id} onChange={this.handleInput} className="form-control default-select">
                                                        {doctors.map(doctor => {
                                                            <option value={doctor.doctor_id} >{doctor.name}</option>
                                                        })}
                                                    </select>
                                                )} */}
                                                
                                            </div>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Appointment Date</label>
                                                <input required name="appointDate" value={this.state.appointDate} onChange={this.handleInput} type="date" className="form-control"/>
                                            </div>
                                            <div className="form-group text-center">
                                                <button type="submit" className="btn btn-primary mt-3">CREATE</button>
                                            </div>
                                        </form>
                                    </div>
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
                        <div className="modal fade mt-5" id="editDiseaseModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Disease</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.updateDisease}>
                                            
                                            {/* <div className="form-group">
                                                <label className="text-black font-w500">Update Appointment Status</label>
                                            </div> */}

                                            <div className="">

                                                <div className="form-group">
                                                    <label className="text-black font-w500">Disease Name</label>
                                                    <input type="text" name="diseaseName" value={this.state.diseaseName} className="form-control" onChange={this.handleInput}/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="text-black font-w500">Status</label>

                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="newStatus" value="In Treatment" onChange={this.handleInput} />
                                                        <label class="form-check-label">
                                                            In Treatment
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="newStatus" value="Recovered" onChange={this.handleInput} />
                                                        <label class="form-check-label">
                                                            Recovered
                                                        </label>
                                                    </div>
                                                </div>

                                                
                                                            <div className="form-group">
                                                                <label className="text-black font-w500">Drugs List</label>
                                                                {
                                                                    this.state.drugsList.map((drug,index) => {
                                                                        return (
                                                                            <>
                                                                                <div className="row mb-2">
                                                                                    <input type="text" name="name" value={drug.name} className="col-4 mr-2 form-control" onChange={(e)=> {this.handleInput2(e,index)}}/>
                                                                                    <input type="text" name="instructions" value={drug.instructions} className="col-5 form-control" onChange={(e)=> {this.handleInput2(e,index)}}/>
                                                                                    <div className="col">
                                                                                        {this.state.drugsList.length !== 1 && <a className="" onClick={() => this.removeDrugInput(index)}><i className="fa fa-trash"></i></a>}
                                                                                        {this.state.drugsList.length - 1 === index && <a className="ml-2" onClick={this.addDrugInput}><i className="fa fa-plus"></i></a>}
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
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
                        <div className="modal fade mt-5" id="editNoteModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Note</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.updateNote}>
                                            
                                            {/* <div className="form-group">
                                                <label className="text-black font-w500">Update Appointment Status</label>
                                            </div> */}

                                            <div className="">
                                                {patient && (
                                                    <div class="form-label-group">
                                                    <textarea onChange={this.handleInput} name="newNote" value={this.state.newNote} type="text" id="story" class="form-control" placeholder="Enter your instructions here .." required />
                                                </div>
                                                )}

                                                
                                                
                                            </div>
                                
                                            <div className="form-group text-center">
                                                <button type="submit" className="btn btn-primary mt-5">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">

                                    <div className="col-xl-8">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">

                                                    {loading || !patient ? (
                                                        <div id="main">
                                                            <div className="row justify-content-center">
                                                            <div className="spinner-border m-5" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    ):(
                                                        <>
                                                            <div className="d-flex doctor-info-details mb-sm-5 mb-3">
                                                                <div className="media align-self-start">
                                                                    <img alt="image" className="rounded" width="130" src={patient.image} />
                                                                    <i className="fa fa-heart"></i>
                                                                </div>
                                                                <div className="media-body">
                                                                    <h2 className="mb-2">Mr. {patient.name}</h2>
                                                                    <p className="mb-md-2 mb-4">#P- {patient._id}</p>
                                                                    <span className="mb-md-0 mb-3 d-block"><i className="fa fa-clock"></i> Join Date : {patient.createdAt.substring(0,10)} at {patient.createdAt.substring(11,16)}</span>
                                                                </div>
                                                                {/* <div className="text-md-right">
                                                                    <div className="dropdown mb-md-3 mb-2">
                                                                        <div className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                                                            <i className="flaticon-381-user-7 mr-2"></i> 
                                                                            <span>Cold & Flu</span>
                                                                        </div>
                                                                        <div className="dropdown-menu dropdown-menu-left">
                                                                            <a className="dropdown-item" href="#">A To Z List</a>
                                                                            <a className="dropdown-item" href="#">Z To A List</a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="star-review">
                                                                        <i className="fa fa-star text-orange"></i>
                                                                        <i className="fa fa-star text-orange"></i>
                                                                        <i className="fa fa-star text-orange"></i>
                                                                        <i className="fa fa-star text-orange"></i>
                                                                        <i className="fa fa-star text-gray"></i>
                                                                        <span className="ml-3">238 reviews</span>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                            
                                                            <div className="doctor-info-content">
                                                                <h3 className="text-black mb-3">Story About Disease {(this.props.value.authState.user.accessLvl === "Patient" || this.props.value.authState.user.accessLvl === "Admin") && (<a href="" ><i className="fa fa-edit" style={{scale:'0.7'}} /></a>)}</h3>
                                                                <p className="mb-3">{patient.story}</p>
                                                                {/* <p className="mb-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi </p> */}
                                                            </div>
                                                        </>
                                                    )}

                                                    </div>
                                                    {/* <div className="card-footer border-0 pt-0 text-center">
                                                        <a href="#" className="btn-link">Read More</a>
                                                    </div> */}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="card">
                                                    <div className="card-header border-0 pb-0">
                                                        <h4 className="card-title">Disease Details</h4>
                                                        {
                                                            (this.props.value.authState.user.accessLvl === "Doctor" || this.props.value.authState.user.accessLvl === "Admin") && (
                                                                <a href="" className="" data-toggle="modal" data-target="#editDiseaseModal"><i className="fa fa-edit" /></a>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="assigned-doctor owl-carousel">
                                                            {loading || !patient ? (
                                                                <div id="main">
                                                                    <div className="row justify-content-center">
                                                                    <div className="spinner-border m-5" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            ):(
                                                                <>
                                                                    <div>
                                                                        <div className="mb-4 ml-4 pl-2" style={{borderLeft: "3px solid #666"}}>
                                                                            <h4>{patient.diseases[patient.diseases.length-1].name === "" ? ("Not yet identified !"):(patient.diseases[patient.diseases.length-1].name)}</h4>
                                                                            {patient.diseases[patient.diseases.length-1].status === "Recovered" && (
                                                                                <span><i class="fa fa-circle text-success mr-1"></i> Recovered</span>
                                                                            )}
                                                                            {patient.diseases[patient.diseases.length-1].status === "In Treatment" && (
                                                                                <span><i class="fa fa-circle text-warning mr-1"></i> In Treatment</span>
                                                                            )}
                                                                            {patient.diseases[patient.diseases.length-1].status === "New" && (
                                                                                <span><i class="fa fa-circle text-danger mr-1"></i> New</span>
                                                                            )}
                                                                            
                                                                        </div>
                                                                        <h5> Identified on : <span>{patient.diseases[patient.diseases.length-1].createdAt}</span></h5>
                                                                        <h5> Prescription : </h5>
                                                                        <ul className="ml-3">
                                                                            {
                                                                                patient.diseases[patient.diseases.length-1].drugs.map(drug => {
                                                                                    return (
                                                                                        <li>{drug.name} : {drug.instructions}</li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card">
                                                    <div className="card-header border-0 pb-0">
                                                        <h4 className="card-title mt-1">Note for Patient</h4>
                                                        {
                                                            (this.props.value.authState.user.accessLvl === "Doctor" || this.props.value.authState.user.accessLvl === "Admin") && (
                                                                <a href="" className="" data-toggle="modal" data-target="#editNoteModal"><i className="fa fa-edit" /></a>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="mb-0 fs-14">{loading || !patient ? (
                                                            <div id="main">
                                                                <div className="row justify-content-center">
                                                                <div className="spinner-border m-5" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            patient.note === "" ? ("Not Available !"):(patient.note)
                                                        )}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-header border-0 pb-0">
                                                        <h4 className="card-title">Assigned Doctors</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="assigned-doctor owl-carousel">
                                                            {/* <Slider {...settings}> */}
                                                            {loading || !patient ? (
                                                                <div id="main">
                                                                    <div className="row justify-content-center">
                                                                    <div className="spinner-border m-5" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            ):(
                                                                patient.assignedDoctors.length === 0 ? (
                                                                    <div>No assigned doctors !</div>
                                                                ):(
                                                                    patient.assignedDoctors.map(item => {
                                                                        const doctor = this.props.value.getUser(item.doctor_id);
                                                                        if(doctor) {
                                                                            return (
                                                                                <div className="items mb-3" >
                                                                                    <div className="row bootstrap-media">
                                                                                        <div className="col-8 media mb-1">
                                                                                            <img className="mr-3 img-fluid rounded" width="94" src={doctor.image} alt="DexignZone" />
                                                                                            <div className="media-body">
                                                                                                <h4 className="mt-0 mb-1"><Link to={'/dashboard/employees/' + doctor._id} className="text-black">Dr. {doctor.name}</Link></h4>
                                                                                                <p className="mb-1">{doctor.specialty}</p>
                                                                                                <div className="star-review fs-14">
                                                                                                    <i className="fa fa-star text-orange"></i>
                                                                                                    <i className="fa fa-star text-orange"></i>
                                                                                                    <i className="fa fa-star text-orange"></i>
                                                                                                    <i className="fa fa-star text-gray"></i>
                                                                                                    <i className="fa fa-star text-gray"></i>
                                                                                                    <span className="ml-3">451 reviews</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {
                                                                                            (this.props.value.authState.user.accessLvl === "Assitant" || this.props.value.authState.user.accessLvl === "Admin") && (
                                                                                            <div className="col-3">
                                                                                                {/* <a href="#" className="btn btn-outline-dark mr-2 mb-1">Availability</a> */}
                                                                                                <button href="#" className="btn btn-danger" onClick={()=>{this.unassignDoctor(doctor._id)}}><i className="fa fa-times pr-2" ></i> Unassign</button>
                                                                                            </div>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        
                                                                    })
                                                                    
                                                                    
                                                                )
                                                            )}
                                                                
                                                            {/* </Slider> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Patient's Appointments</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="table-responsive">

                                                            {loading || !appointments || !patient ? (
                                                                <div id="main">
                                                                    <div className="row justify-content-center">
                                                                    <div className="spinner-border m-5" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            ):(   
                                                                appointments.length === 0 ? (
                                                                    <div>No Appointments !</div>
                                                                ):(
                                                                    <>
                                                                        <table className="table table-responsive-md">
                                                                            <thead>
                                                                                <tr>
                                                                                    {/* <th style={{width:"80px"}}><strong>#</strong></th> */}
                                                                                    {/* <th><strong>PATIENT</strong></th> */}
                                                                                    <th><strong>DR NAME</strong></th>
                                                                                    <th><strong>DATE</strong></th>
                                                                                    <th><strong>STATUS</strong></th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {appointments.reverse().map((item,index) => {
                                                                                    const doctor = this.props.value.getUser(item.doctor_id);
                                                                                    // const patient = this.props.value.getUser(item.patient_id);
                                                                                    if(doctor) {
                                                                                        return (
                                                                                            <tr key={index}>
                                                                                                {/* <td><strong>{index+1}</strong></td> */}
                                                                                                {/* <td>{this.props.value.getUser(item.patient_id).name}</td> */}
                                                                                                <td><Link to={'/dashboard/employees/' + item.doctor_id}><div className="d-flex align-items-center"><img src={doctor.image} className="rounded-lg mr-2" width="24" alt=""/> <span className="w-space-no">Dr. {doctor.name}</span></div></Link></td>
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
                                                                                                   (this.props.value.authState.user.accessLvl === "Assitant" || this.props.value.authState.user.accessLvl === "Admin") && (
                                                                                                    <td>
                                                                                                        <div className="dropdown">
                                                                                                            <button type="button" className="btn light sharp" data-toggle="dropdown">
                                                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                                                                                            </button>
                                                                                                            <div className="dropdown-menu">
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
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </>
                                                                )  
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="card">
                                                    <div className="card-header border-0 pb-0">
                                                        <h4 className="card-title">Diseases History</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="widget-timeline-icon">
                                                            <ul className="timeline">

                                                                {loading || !patient ? (
                                                                    <div id="main">
                                                                        <div className="row justify-content-center">
                                                                        <div className="spinner-border m-5" role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                ):(
                                                                    patient.diseases.length < 2 ? (
                                                                        <div>Not Available !</div>
                                                                    ):(
                                                                        patient.diseases.reverse().map((disease,index) => {
                                                                            if (index > 0) {
                                                                                return (
                                                                                    <li key={index}>
                                                                                        <div className="icon bg-primary fa fa-heart"></div>
                                                                                        <a className="timeline-panel text-muted" href="#">
                                                                                            <h4 className="mb-2 mt-1">{disease.name}</h4>
                                                                                            <p className="fs-15 mb-0 ">Sat, 23 Jul 2020, 01:24 PM</p>
                                                                                        </a>
                                                                                    </li>
                                                                                )
                                                                            }
                                                                        })
                                                                    )
                                                                )}
                                                                    
                                                            </ul>	
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card">
                                                    <div className="card-header border-0 pb-0">
                                                        <h4 className="card-title">Patient Statistic </h4>
                                                        {
                                                            (this.props.value.authState.user.accessLvl === "Doctor" || this.props.value.authState.user.accessLvl === "Admin") && (
                                                                <a href="" className=""><i className="fa fa-edit" /></a>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="widget-timeline-icon">
                                                            <div className="row align-items-center mx-0">
                                                                {/* <div className="col-xl-6 col-xxl-12 col-md-12 px-0 mb-3">
                                                                    <span className="donut" data-peity='{ "fill": ["rgb(32, 159, 132)", "rgba(39, 129, 213, 1)","rgba(255, 44, 83, 1)"]}'>2,5,3</span>
                                                                </div>	 */}
                                                                <div className="col-xl-6 col-xxl-12 col-md-12 px-0">


                                                                {loading || !patient ? (
                                                                    <div id="main">
                                                                        <div className="row justify-content-center">
                                                                        <div className="spinner-border m-5" role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                ):(
                                                                    patient.statistics.length === 0 ? (
                                                                        <div>Not Available !</div>
                                                                    ):(
                                                                        patient.statistics.map((item,index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <p className="mb-2 d-flex  fs-14">{item.name} ({item.value})
                                                                                        <span className="pull-right ml-auto">25</span>
                                                                                    </p>
                                                                                    <div className="progress mb-3" style={{height:'8px'}}>
                                                                                        <div className="progress-bar bg-info progress-animated" style={{width:item.value*100/25+'%', height:'8px'}} role="progressbar">
                                                                                            <span className="sr-only">60% Complete</span>
                                                                                        </div>
                                                                                    </div>  
                                                                                </div>
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

                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-header border-0 pb-0">
                                                        <h4 className="card-title">Uploaded Documents</h4>
                                                        {
                                                            (this.props.value.authState.user.accessLvl === "Doctor" || this.props.value.authState.user.accessLvl === "Admin") && (
                                                                <a href="" className="btn btn-info ml-auto"><i className="fa fa-plus"></i> Upload</a>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="card-body">
                                                        <FsLightbox
                                                            toggler={this.state.toggler}
                                                            sources={docs}
                                                            slide={this.state.slide}
                                                        />
                                                        <div className="assigned-doctor owl-carousel">
                                                            {loading || !patient ? (
                                                                <div id="main">
                                                                    <div className="row justify-content-center">
                                                                    <div className="spinner-border m-5" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            ):(
                                                                <>
                                                                    <div id="portfolio" >
                                                                        <div className="items row center-items">
                                                                            {
                                                                                patient.documents.length === 0 ? (
                                                                                    <div>No documents !</div>
                                                                                ):(
                                                                                    patient.documents.map((doc,index) => {
                                                                                        return (
                                                                                            <div className="col-lg-4 col-md-6 portfolio-item wow fadeInUp">
                                                                                                <div className="portfolio-wrap">
                                                                                                    <figure>
                                                                                                        <img src={doc.path} className="img-fluid" alt="" />
                                                                                                        <a onClick={() => this.openLightboxOnSlide(index+1)} data-lightbox="portfolio" data-title="App 1" className="link-preview" title="Preview"><i className="fa fa-eye"></i></a>
                                                                                                        <a onClick={()=>{this.deleteDocument(doc._id)}} className="link-details" title="Share"><i className="fa fa-trash"></i></a>
                                                                                                    </figure>

                                                                                                    <div className="portfolio-info">
                                                                                                    <p>{doc.name}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="patient-map-area mb-4">
                                                            {/* <img src="images/map.jpg" alt=""/>  */}
                                                            <iframe width="100%" height="200" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=30.4211144,-9.5830626&amp;q=Agadir%2C%20city%2C%20Morocco+(SenorJob)&amp;ie=UTF8&amp;t=&amp;z=13&amp;iwloc=B&amp;output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"><a href="https://www.maps.ie/draw-radius-circle-map/">Google Maps Radius</a></iframe>
                                                            {/* <a href="" className="btn btn-danger btn-xs">View in Fullscreen</a> */}
                                                            {/* <i className="fa fa-map-marker"></i> */}
                                                        </div>
                                                        <div className="iconbox">
                                                            <i className="fa fa-map-marker"></i>
                                                            <small>Address</small>
                                                            <p>{loading  || !patient ? ("Loading ..") : (
                                                                patient.address === "" ? ("Not Available !"):(patient.address)
                                                            )}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="iconbox">
                                                            <i className="fa fa-phone"></i>
                                                            <small>Phone</small>
                                                            <p>{loading  || !patient ? ("Loading ..") : (
                                                                patient.phone === "" ? ("Not Available !"):(patient.phone)
                                                            )}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="iconbox">
                                                            <i className="fa fa-envelope-open"></i>
                                                            <small>Email</small>
                                                            <p>{loading  || !patient ? ("Loading ..") : (
                                                                patient.email === "" ? ("Not Available !"):(patient.email)
                                                            )}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="iconbox">
                                                            <i className="fa fa-user-shield"></i>
                                                            <small>Insurance Service</small>
                                                            <p>
                                                                {loading  || !patient ? ("Loading ..") : (
                                                                    patient.insurance.service === "" ? ("Not insured !"):(patient.insurance.service)
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="card bg-secondary">
                                                    <div className="card-header border-0 pb-0">
                                                        <h4 className="card-title text-white mt-1">Note for Patient</h4>
                                                        <a href="" className="text-white" data-toggle="modal" data-target="#editNoteModal"><i className="fa fa-edit" /></a>
                                                    </div>
                                                    <div className="card-body text-white">
                                                        <p className="mb-0 fs-14">{loading || !patient ? (
                                                            <div id="main">
                                                                <div className="row justify-content-center">
                                                                <div className="spinner-border m-5" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            patient.note === "" ? ("Not Available !"):(patient.note)
                                                        )}</p>
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

export default PatientDetails;