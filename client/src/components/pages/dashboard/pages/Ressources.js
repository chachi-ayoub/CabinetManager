import React, { Component } from 'react';

import avatar1 from "../../../../assets/images/avatar/6.jpg"
import avatar2 from "../../../../assets/images/avatar/2.jpg"
import avatar3 from "../../../../assets/images/avatar/4.jpg"
import avatar4 from "../../../../assets/images/avatar/1.jpg"

class Ressources extends Component {
    state = {
        type : "",
        amount : "",
        reason : "",
        user_id : "",

        selectedRessource_id : "",

		searchTerm : "",
		filter : ""
	}

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createRessource = (e) => {
        e.preventDefault();
        const type = this.state.type;
        const amount = this.state.amount;
        const reason = this.state.reason;
        const user_id = this.state.user_id;
        const assistant_id = this.props.value.authState.authenticated ? (this.props.value.authState.user.id):("") ;

        this.props.value.addRessource({type, reason, assistant_id, user_id, amount})
    }

    setSelectedRessource = (value) => {
		this.setState({selectedRessource_id: value});
	}

    updateRessource = (e) => {
        e.preventDefault();
        
        const ressource = this.props.value.getRessource(this.state.selectedRessource_id);

        if(ressource) {
            this.state.type !== "" && (ressource.type = this.state.type)
            this.state.amount !== "" && (ressource.amount = this.state.amount)
            this.state.reason !== "" && (ressource.reason = this.state.reason)
            
            this.props.value.updateRessource(ressource);
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
        const ressources = this.props.value.ressources;

        return (
            <div>
                <div class="">
                    <div class="">

                        <div class="mr-auto d-lg-block ml-4 ml-lg-0">
                            <h3 class="text-primary font-w600 mb-5">Manage Ressources</h3>
                        </div>

                        <div class="form-head d-flex mb-3 mb-lg-1 align-items-start ml-4 ml-lg-0">
                            <a href="" class="btn btn-danger" data-toggle="modal" data-target="#addRessourceModal"><i class="fa fa-plus"></i> New Ressource</a>
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
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("")}}>All</a>
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("Income")}}>Incomes</a>
                                    <a class="dropdown-item" href="#" onClick={()=>{this.setFilter("Outcome")}}>Outcomes</a>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade mt-5" id="addRessourceModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add New Ressource</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.createRessource}>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Type :</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="type" value="income" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Income
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="type" value="outcome" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Outcome
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Amount :</label>
                                                <input className="form-control" type="text" name="amount" value={this.state.amount} onChange={this.handleInput} required/>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Reason :</label>
                                                <textarea class="form-control" placeholder="Type your message..." name="reason" value={this.state.reason} onChange={this.handleInput}required />
                                            </div>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Paid by/to :</label>
                                                <input type="text" className="form-control" name="user_id" value={this.state.user_id} onChange={this.handleInput}/>
                                            </div>
                                            <div className="form-group text-center">
                                                <button type="submit" className="btn btn-primary mt-3">CREATE</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade mt-5" id="editRessourceModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Ressource</h5>
                                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.updateRessource}>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Type :</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="type" value="income" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Income
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="type" value="outcome" onChange={this.handleInput} />
                                                    <label class="form-check-label">
                                                        Outcome
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Amount :</label>
                                                <input className="form-control" type="text" name="amount" value={this.state.amount} onChange={this.handleInput}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-black font-w500">Reason :</label>
                                                <textarea class="form-control" placeholder="Type your message..." name="reason" value={this.state.reason} onChange={this.handleInput}></textarea>
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
                                                    <th><strong>Type</strong></th>
                                                    <th><strong>Reason</strong></th>
                                                    <th><strong>Paid by / to</strong></th>
                                                    <th><strong>Amount</strong></th>
                                                    <th><strong>Date</strong></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {loading || !ressources ? (
                                                    <div id="main">
                                                        <div className="row justify-content-center">
                                                        <div class="spinner-border m-5" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                        </div>
                                                    </div>
                                                ):(
                                                    ressources.length === 0 ? (
                                                        <h4 className="mt-5">Empty !</h4>
                                                    ):(
                                                        ressources.filter(item => {
													
                                                            if (this.state.searchTerm === "") {
                                                                if (this.state.filter === "") {
                                                                    return item;
                                                                } else if (item.type.toLowerCase() === this.state.filter.toLowerCase()) {
                                                                    return item;
                                                                }
                                                            } else if (item.reason.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || item.user_id && (this.props.value.getUser(item.user_id).name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))) {
                                                                return item;
                                                            }
                                                        }).reverse().map((item,index) => {
                                                            const user = this.props.value.getUser(item.user_id);
                                                            return (
                                                                <tr>
                                                                    <td><strong>{index+1}</strong></td>
    
                                                                    {item.type === "income" && (
                                                                        <td><span class="badge light badge-success">Income</span></td>
                                                                    )}
                                                                    {item.type === "outcome" && (
                                                                        <td><span class="badge light badge-warning">Outcome</span></td>
                                                                    )}
                                                                    
                                                                    <td>{item.reason}</td>
                                                                    <td>{user ? (<div class="d-flex align-items-center"><img src={user.image} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">{user.name} ({user.accessLvl})</span></div>):("-- --")}</td>
                                                                    
                                                                    <td>$ {item.amount}</td>
                                                                    <td>{item.createdAt.substring(0,10)}</td>
                                                                
                                                                    
                                                                    <td>
                                                                        <div class="dropdown">
                                                                            <button type="button" class="btn light sharp" data-toggle="dropdown">
                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                                                            </button>
                                                                            <div class="dropdown-menu">
                                                                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#editRessourceModal" onClick={()=>{this.setSelectedRessource(item._id)}}>Update</a>
                                                                                <a class="dropdown-item" href="#" onClick={()=>{this.props.value.deleteRessource(item._id)}}>Delete</a>
                                                                            </div>
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

export default Ressources;