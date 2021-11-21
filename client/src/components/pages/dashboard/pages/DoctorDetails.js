import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import ApexCharts from 'apexcharts';
import Chart from "react-apexcharts";

import AdapterDateFns from '@material-ui/lab';
import LocalizationProvider from '@material-ui/lab';
import CalendarPicker from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';


// const [date, setDate] = React.useState(new Date());

class DoctorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAppointment_id : "",
            newStatus : "",
            // date: new Date(),
        }
    }

    setSelectedAppointment = (value) => {
		this.setState({selectedAppointment_id: value});
	}

    updateAppointment = (e) => {
        e.preventDefault();
        
        const appoint = this.props.value.getAppointment(this.state.selectedAppointment_id);

        if(appoint) {
            appoint.status = this.state.newStatus;
            this.props.value.updateAppointment(appoint);
        }
    }

    render() {
        const {loading} = this.props.value;
        const doctor = this.props.value.getUser(this.props.match.params.Did);
        const patients = this.props.value.getPatients(); 
        const appointments = this.props.value.appointments.filter(item=>item.doctor_id===this.props.match.params.Did);
        const assignedUsers = [];
        if(doctor && patients) {
            patients.map(patient => {
                patient.assignedDoctors.map(item => {
                    if(item.doctor_id === doctor._id) {
                        assignedUsers.push(patient);
                    } 
                })
            })
        }

        return (
            <div>
                <div class="">
                    <div class="">

                        <div class="mr-auto d-lg-block ml-4 ml-lg-0">
                            <h3 class="text-primary font-w600 mb-0">Doctor Details</h3>
                        </div>

                        <div class="form-head d-flex mb-3 align-items-start ml-3 ml-lg-0">
                            {/* <a href="" class="btn btn-dark ml-auto"><i class="fa fa-edit mr-2"></i> Edit Profile</a> */}
                            {
                                (this.props.value.authState.user.accessLvl === "Admin") && (
                                    <a href="" class="btn btn-danger px-5 ml-auto" data-toggle="modal" data-target="#addDoctorModal"><i class="fa fa-trash mr-3"></i> Fire Employee</a>
                                )
                            }
                        </div>
                        <div class="modal fade" id="addDoctorModal">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Add Doctor</h5>
                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group">
                                                <label class="text-black font-w500">Doctor Name</label>
                                                <input type="text" class="form-control"/>
                                            </div>
                                            <div class="form-group">
                                                <label class="text-black font-w500">Doctor ID</label>
                                                <input type="text" class="form-control"/>
                                            </div>
                                            <div class="form-group">
                                                <label class="text-black font-w500">Specialist</label>
                                                <input type="text" class="form-control"/>
                                            </div>
                                            <div class="form-group">
                                                <label class="text-black font-w500">Appointment Date</label>
                                                <input type="date" class="form-control"/>
                                            </div>
                                            <div class="form-group">
                                                <button type="button" class="btn btn-primary">CREATE</button>
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

                        
                                <div class="row">
                                    <div class="col-xl-4">
                                        <div class="row">
                                            {/* <div class="col-lg-6 col-xl-12">
                                                <div class="card bg-danger">
                                                    <div class="card-header border-0 pb-0 justify-content-center">
                                                        <h4 class="card-title text-white">Appointment Schedule</h4>
                                                    </div>
                                                    <div class="card-body patient-calender  pb-2">
                                                        <input type='text' class="form-control d-none" id='datetimepicker1' />
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={12} md={6}>
                                                                    <CalendarPicker date={this.state.date} onChange={(newDate) => this.setDate(newDate)} />
                                                                </Grid>
                                                            </Grid>
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div class="col-lg-6 col-xl-12">
                                                <div class="card abilities-chart">
                                                    <div class="card-header border-0 pb-0">
                                                        <h4 class="card-title">Doctors Abilities</h4>
                                                    </div>
                                                    <div class="card-body">

                                                        { loading || !doctor ? (
                                                            <div id="main">
                                                                <div className="row justify-content-center">
                                                                <div class="spinner-border m-5" role="status">
                                                                    <span class="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        ):(
                                                            doctor.statistics.length === 0 ? (
                                                                <div>Not Available !</div>
                                                            ):(
                                                                <div id="chartPie" class="ct-chart ct-golden-section chartlist-chart">
                                                                    <Chart 
                                                                        options = {{ 
                                                                            labels: [doctor.statistics[0].name, doctor.statistics[1].name, doctor.statistics[2].name],
                                                                            colors:['#f72b50', '#209f84', '#ff5c00']
                                                                        }}
                                                                        series = {[doctor.statistics[0].value, doctor.statistics[1].value, doctor.statistics[2].value]} 
                                                                        type="pie"  
                                                                    />
                                                                </div> 
                                                            )
                                                            
                                                        )}
                                                            
                                                        {/* <div class="chart-point">
                                                            <div>
                                                                <span class="a"></span>
                                                                Operation
                                                            </div>
                                                            <div>
                                                                <span class="b"></span>
                                                                Theraphy
                                                            </div>
                                                            <div>
                                                                <span class="c"></span>
                                                                Mediation
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="iconbox">
                                                            <i class="fa fa-phone"></i>
                                                            <small>Phone</small>
                                                            <p>{loading  || !doctor ? ("Loading ..") : (
                                                                doctor.phone === "" ? ("Not Available !"):(doctor.phone)
                                                            )}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="iconbox">
                                                            <i class="fa fa-envelope-open"></i>
                                                            <small>Email</small>
                                                            <p>{loading || !doctor ? ("Loading ..") : (
                                                                doctor.email === "" ? ("Not Available !"):(doctor.email)
                                                            )}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="card bg-secondary">
                                                    <div class="card-header border-0 pb-0">
                                                        <h4 class="card-title text-white mt-1">Note for Doctor</h4>
                                                    </div>
                                                    <div class="card-body text-white">
                                                        <p class="mb-0 fs-14">{loading || !doctor ? (
                                                            <div id="main">
                                                                <div className="row justify-content-center">
                                                                <div class="spinner-border m-5" role="status">
                                                                    <span class="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            doctor.note === "" ? ("Not Available !"):(doctor.note)
                                                        )}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-8">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        
                                                            {loading || !doctor ? (
                                                                <div id="main">
                                                                    <div className="row justify-content-center">
                                                                    <div class="spinner-border m-5" role="status">
                                                                        <span class="sr-only">Loading...</span>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div class="d-flex doctor-info-details mb-5">
                                                                        <div class="media align-self-start">
                                                                            <img alt="image" class="rounded" width="130" src={doctor.image}/>
                                                                            <i class="fa fa-heart"></i>
                                                                        </div>
                                                                        <div class="media-body">
                                                                            <h2 class="mb-0">Dr. {doctor.name}</h2>
                                                                            <p class="mb-md-2 mb-sm-4 mb-2">#D- {doctor._id}</p>
                                                                            <span><i class="fa fa-clock"></i> Join Date : {doctor.createdAt.substring(0,10)} at {doctor.createdAt.substring(11,16)}</span>
                                                                        </div>
                                                                        <div class="text-md-right mt-4 mt-md-0">
                                                                            {/* <div class="dropdown mb-3">
                                                                                <div class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown">
                                                                                    <i class="flaticon-381-user-7 mr-2"></i> Dentist
                                                                                </div>
                                                                                <div class="dropdown-menu dropdown-menu-left">
                                                                                    <a class="dropdown-item" href="#">A To Z List</a>
                                                                                    <a class="dropdown-item" href="#">Z To A List</a>
                                                                                </div>
                                                                            </div> */}
                                                                            <div class="star-review text-center">
                                                                                <div><h4>{doctor.specialty}</h4></div>
                                                                                <div>
                                                                                    <i class="fa fa-star text-orange"></i>
                                                                                    <i class="fa fa-star text-orange"></i>
                                                                                    <i class="fa fa-star text-orange"></i>
                                                                                    <i class="fa fa-star text-orange"></i>
                                                                                    <i class="fa fa-star text-gray"></i>
                                                                                </div>
                                                                                <span class="">238 reviews</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                            
                                                                    <div class="doctor-info-content">
                                                                        <h3 class="text-black mb-3">Short Biography</h3>
                                                                        <p class="mb-3">{doctor.story === "" ? ("Not Available !"):(doctor.story)}</p>
                                                                        {/* <p class="mb-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi </p> */}
                                                                    </div>
                                                                </>
                                                            )}
                                                            
                                                        
                                                    </div>
                                                    {/* <div class="card-footer border-0 pt-0 text-center">
                                                        <a href="#" class="btn-link">Read More</a>
                                                    </div> */}
                                                </div>
                                                
                                            </div>
                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-header border-0 pb-0">
                                                        <h4 class="card-title">Assigned Patients</h4>
                                                    </div>
                                                    <div class="card-body">
                                                        {loading || !assignedUsers ? (
                                                            <div id="main">
                                                                <div className="row justify-content-center">
                                                                <div class="spinner-border m-5" role="status">
                                                                    <span class="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        ):(
                                                            assignedUsers.length === 0 ? (
                                                                <div>No assigned patients !</div>
                                                            ):(
                                                                assignedUsers.map(patient => {
                                                                    return (
                                                                        <div class="media patient-box mb-3">
                                                                            <img class="mr-3 img-fluid rounded" width="110" src={patient.image} alt="DexignZone"/>
                                                                            <div class="media-body">
                                                                                <h4 class="mt-0 mb-2 text-black bold mt-1"><Link to={'/dashboard/patients/' + patient._id} className="text-black"><b>{patient.name}</b></Link></h4>
                                                                                <h4 class="mb-4">Disease: <span className="text-primary">{patient.diseases[patient.diseases.length-1].name}</span></h4>
                                                                                <a href="javascript:void(0);" class="btn-link mr-4 text-dark">Unassign</a>
                                                                                <a href="javascript:void(0);" class="btn-link text-danger ">Check Imporvement</a>
                                                                            </div>
                                                                            <div id="chart" class="mr-3"></div>
                                                                            <div class="media-footer align-self-center">
                                                                                {/* <div class="up-sign text-success">
                                                                                    <i class="fa fa-caret-up"></i>
                                                                                    <h3 class="text-success">4%</h3>
                                                                                </div> */}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            )
                                                        )}
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h4 class="card-title">Doctor's Appointments</h4>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="table-responsive">

                                                            {loading || !appointments || !doctor ? (
                                                                <div id="main">
                                                                    <div className="row justify-content-center">
                                                                    <div class="spinner-border m-5" role="status">
                                                                        <span class="sr-only">Loading...</span>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            ):(
                                                                appointments.length === 0 ? (
                                                                    <div>No Appointments !</div>
                                                                ):(
                                                                    <table class="table table-responsive-md">
                                                                        <thead>
                                                                            <tr>
                                                                                {/* <th style={{width:"80px"}}><strong>#</strong></th> */}
                                                                                <th><strong>PATIENT</strong></th>
                                                                                {/* <th><strong>DR NAME</strong></th> */}
                                                                                <th><strong>DATE</strong></th>
                                                                                <th><strong>STATUS</strong></th>
                                                                                <th></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                appointments.reverse().map((item,index) => {
                                                                                    const patient = this.props.value.getUser(item.patient_id);
                                                                                    return (
                                                                                        <tr>
                                                                                            {/* <td><strong>{index+1}</strong></td> */}
                                                                                            <td><Link to={'/dashboard/patients/' + item.patient_id}><div class="d-flex align-items-center"><img src={patient.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">{patient.name}</span></div></Link></td>
                                                                                            {/* <td>Dr. {this.props.value.getUser(item.doctor_id).name}</td> */}
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
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                )
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-header border-0">
                                                        <h4 class="card-title">Recent Reviews</h4>
                                                    </div>
                                                    <div class="card-body pt-0 pb-0 loadmore-content dz-scroll" id="recentReviewsContent">
                                                        <div class="media review-box mb-4">
                                                            <img class="mr-3 img-fluid rounded" width="105" src={avatar3} alt="DexignZone"/>
                                                            <div class="media-body">
                                                                <h4 class="mt-0 mb-3"><a href="doctors-review.html" class="text-black">Glee Smiley</a></h4>
                                                                <p class="mb-3">Hospital & staff were extremely warm & quick in getting me start with the procedures.</p>
                                                                <span class="btn btn-xs light btn-danger btn-rounded mb-1">EXCELENT</span>
                                                                <span class="btn btn-xs light btn-danger btn-rounded">GREAT SERVICE</span>
                                                            </div>
                                                            <div class="media-footer">
                                                                <div class="star-review text-md-center">
                                                                    <span class="text-primary">4.5</span>
                                                                    <i class="fa fa-star text-orange"></i>
                                                                    <i class="fa fa-star text-orange"></i>
                                                                    <i class="fa fa-star text-orange"></i>
                                                                    <i class="fa fa-star text-orange"></i>
                                                                    <i class="fa fa-star text-gray"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="media review-box mb-4">
                                                            <img class="mr-3 img-fluid rounded" width="105" src={avatar4} alt="DexignZone"/>
                                                            <div class="media-body">
                                                                <h4 class="mt-0 mb-3"><a href="doctors-review.html" class="text-black">Emilian Brownlee</a></h4>
                                                                <p class="mb-3">Hospital & staff were extremely warm & quick in getting me start with the procedures.</p>
                                                                <span class="btn btn-xs light btn-danger btn-rounded mb-1">EXCELENT</span>
                                                                <span class="btn btn-xs light btn-danger btn-rounded">GREAT SERVICE</span>
                                                            </div>
                                                            <div class="media-footer">
                                                                <div class="star-review text-md-center">
                                                                    <span class="text-primary">4.5</span>
                                                                    <i class="fa fa-star text-orange"></i>
                                                                    <i class="fa fa-star text-orange"></i>
                                                                    <i class="fa fa-star text-orange"></i>
                                                                    <i class="fa fa-star text-orange"></i>
                                                                    <i class="fa fa-star text-gray"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-footer text-center border-0">
                                                        <a class="text-primary dz-load-more" id="recentReviews" href="javascript:void(0)" rel="ajax/recent-reviews.html">Read More</a>
                                                    </div>
                                                </div>
                                                
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                       

                    </div>
                </div>
            </div>
        );
    }
}

export default DoctorDetails;