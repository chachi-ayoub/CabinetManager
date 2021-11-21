import React, { Component } from 'react';
import { Link } from "react-router-dom";

class StandbyRoom extends Component {
        state = {
            selectedListItem_id : "",
            newStatus : "Waiting",

            patient_id : ""
        }

        setSelectedListItem = (value) => {
            this.setState({selectedListItem_id: value});
        }

        handleInput = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        }

        updateRoomList = (e) => {
            e.preventDefault();
            
            const room = this.props.value.standby_rooms[0];

            if(room) {
                const newListItem = {
                    patient_id : this.state.patient_id,
                    arrivedAt : new Date(),
                    status: "Waiting"
                }
                room.list.push(newListItem);
                this.props.value.updateStandby_room(room);
            }
        }

        updateListItemStatus = (e) => {
            e.preventDefault();
            
            const room = this.props.value.standby_rooms[0];

            if(room) {
                room.list.map((item,index)=>{
                    if(item._id === this.state.selectedListItem_id) {
                        const newListItem = {
                            patient_id : item.patient_id,
                            arrivedAt : item.arrivedAt,
                            status: this.state.newStatus
                        }
                        room.list[index] = newListItem;
                    }
                })
                console.log(this.state.newStatus);
                this.props.value.updateStandby_room(room);
            }
        }

        CleanRoomList = () => {
            
            const room = this.props.value.standby_rooms[0];

            if(room) {
                room.list = [];
                this.props.value.updateStandby_room(room);
            }
        }


    render() {
        const {loading} = this.props.value;
        const patients = this.props.value.getPatients();
        const appointments = this.props.value.appointments;
        const standby_rooms = this.props.value.standby_rooms;

        return (
            <div>
                <div class="">
                    <div class="">

                        <div class="mr-auto d-lg-block ml-4 ml-lg-0">
                            <h3 class="text-primary font-w600 mb-0">StandBy Room</h3>
                        </div>
                        
                        <div class="form-head d-flex mb-md-4 mb-3 align-items-start ml-3 ml-lg-0">
                        {
                            (this.props.value.authState.user.accessLvl === "Assistant" || this.props.value.authState.user.accessLvl === "Admin") && (
                                <>
                                    {/* <a href="javascript:void(0)" class="btn btn-danger" data-toggle="modal" data-target="#addDoctorModal"><i class="fa fa-plus"></i> New Employee</a> */}
                                    <a href="" className="btn btn-info px-5 ml-auto" data-toggle="modal" data-target="#addNewArrived"><i className="fa fa-plus"></i> New Arrived Patient</a>
                                    <a href="" className="btn btn-success px-5 ml-2" data-toggle="modal" data-target="#confirmCLean"><i className="fa fa-sync-alt"></i> Clean Room</a>
                                </>
                            )
                        }
                        </div>

                        <div className="modal fade mt-5" id="confirmCLean">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Are you sure you want to clean the Standby Room ?</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <a onClick={()=>{this.CleanRoomList()}} className="btn btn-success px-5 ml-2 text-center text-white"><i className="fa fa-sync-alt"></i> Confirm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade mt-5" id="addNewArrived">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add New Arrived Patient</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.updateRoomList}>
                                            
                                            {/* <div className="form-group">
                                                <label className="text-black font-w500">Update Appointment Status</label>
                                            </div> */}

                                            {!loading && patients && (
                                                <select required className="form-control" name="patient_id" value={this.state.patient_id} onChange={this.handleInput}>
                                                    <option value="" >-- Select Patient --</option>
                                                    {patients.map((patient)=>{
                                                        return(
                                                            <option value={patient._id} >{patient.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            )}
                                
                                            <div className="form-group text-center">
                                                <button type="submit" className="btn btn-primary mt-5">Add</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade mt-5" id="editListItemModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Patient Status</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.updateListItemStatus}>
                                            
                                            {/* <div className="form-group">
                                                <label className="text-black font-w500">Update Appointment Status</label>
                                            </div> */}

                                            <div className="ml-5">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="newStatus" value="Waiting" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Waiting
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="newStatus" value="Done" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Done
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

                        <div className="row">
                        <div class="col-lg-4">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Passed Patients</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table">
                                                {/* <thead>
                                                    <tr>
                                                        <th style={{width:"80px"}}><strong>#</strong></th>
                                                        <th><strong>PATIENT</strong></th>
                                                        <th><strong>DR NAME</strong></th>
                                                        <th><strong>ARRIVED AT</strong></th>
                                                        <th><strong>STATUS</strong></th>
                                                        <th></th>
                                                    </tr>
                                                </thead> */}
                                                <tbody>

                                                    {loading || !standby_rooms ? (
                                                        <div id="main">
                                                            <div className="row justify-content-center">
                                                            <div class="spinner-border m-5" role="status">
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    ):(
                                                        standby_rooms.length === 0 ? (
                                                            <h4 className="mt-5">Empty !</h4>
                                                        ):(
                                                            standby_rooms[0].list.length === 0 ? (
                                                                <h4 className="mt-5">Empty !</h4>
                                                            ):(
                                                                standby_rooms[0].list.map((item,index) => {
                                                                    const patient = this.props.value.getUser(item.patient_id);
                                                                    if(patient && item.status.toLowerCase() !== "waiting") {
                                                                        return (
                                                                            <tr>
                                                                                {/* <td><strong>{index+1}</strong></td> */}
                                                                                <td><Link to={'/dashboard/patients/' + item.patient_id}><div class=""><img src={patient.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">{patient.name}</span></div></Link></td>
                                                                                {/* <td><Link to={'/dashboard/employees/' + item.doctor_id}><div class="d-flex align-items-center"><img src={doctor.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">Dr. {doctor.name}</span></div></Link></td> */}
                                                                                
                                                                                {/* <td>{item.arrivedAt && (item.arrivedAt.toString().substring(11,19))}</td>     */}
                
                                                                                {/* {item.status.toLowerCase() === "done" && (
                                                                                    <td><span class="badge light badge-success">Done</span></td>
                                                                                )}
                                                                                {item.status.toLowerCase() === "waiting" && (
                                                                                    <td><span class="badge light badge-warning">Waiting</span></td>
                                                                                )}
                                                                                {item.status.toLowerCase() === "missed" && (
                                                                                    <td><span class="badge light badge-danger">Missed</span></td>
                                                                                )} */}
                                                                                
                                                                                {/* <td>
                                                                                    <div class="dropdown">
                                                                                        <button type="button" class="btn light sharp" data-toggle="dropdown">
                                                                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                                                                        </button>
                                                                                        <div class="dropdown-menu">
                                                                                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#editListItemModal" onClick={()=>{this.setSelectedListItem(item._id)}}>Update</a>
                                                                                            <a class="dropdown-item" href="#" onClick={()=>{this.props.value.deleteListItem(item._id)}}>Delete</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </td> */}
                                                                            </tr>
                                                                        )
                                                                    }
                                                                }) 
                                                            )
                                                            
                                                        )
                                                        
                                                    )}

                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Waiting Patients</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-responsive-md">
                                                <thead>
                                                    <tr>
                                                        {/* <th style={{width:"80px"}}><strong>#</strong></th> */}
                                                        <th><strong>PATIENT</strong></th>
                                                        {/* <th><strong>DR NAME</strong></th> */}
                                                        <th><strong>ARRIVED AT</strong></th>
                                                        <th><strong>STATUS</strong></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {loading || !standby_rooms ? (
                                                        <div id="main">
                                                            <div className="row justify-content-center">
                                                            <div class="spinner-border m-5" role="status">
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    ):(
                                                        standby_rooms.length === 0 ? (
                                                            <h4 className="mt-5">Empty !</h4>
                                                        ):(
                                                            standby_rooms[0].list.length === 0 ? (
                                                                <h4 className="mt-5">Empty !</h4>
                                                            ):(
                                                                standby_rooms[0].list.map((item,index) => {
                                                                    const patient = this.props.value.getUser(item.patient_id);
                                                                    if(patient && item.status.toLowerCase() === "waiting") {
                                                                        return (
                                                                            <tr>
                                                                                {/* <td><strong>{index+1}</strong></td> */}
                                                                                <td><Link to={'/dashboard/patients/' + item.patient_id}><div class="d-flex align-items-center"><img src={patient.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">{patient.name}</span></div></Link></td>
                                                                                {/* <td><Link to={'/dashboard/employees/' + item.doctor_id}><div class="d-flex align-items-center"><img src={doctor.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">Dr. {doctor.name}</span></div></Link></td> */}
                                                                                {/* <td>{item.arrivedAt && (item.arrivedAt)}</td>     */}
                                                                                <td>{item.arrivedAt && (item.arrivedAt.toString().substring(11,19))}</td>    
                
                                                                                {item.status.toLowerCase() === "done" && (
                                                                                    <td><span class="badge light badge-success">Done</span></td>
                                                                                )}
                                                                                {item.status.toLowerCase() === "waiting" && (
                                                                                    <td><span class="badge light badge-warning">Waiting</span></td>
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
                                                                                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#editListItemModal" onClick={()=>{this.setSelectedListItem(item._id)}}>Update</a>
                                                                                            <a class="dropdown-item" href="#" onClick={()=>{this.props.value.deleteListItem(item._id)}}>Delete</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })
                                                            )
                                                            
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
            </div>
        );
    }
}

export default StandbyRoom;