import React, { Component } from 'react';
import Chart from "react-apexcharts";


class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    

    render() {
		const {loading} = this.props.value;

		const patients = this.props.value.getPatients();
		const newPatients = this.props.value.getNewPatients();
		const inTreatmentPatients = this.props.value.getInTreatmentPatients();
		const recoveredPatients = this.props.value.getRecoveredPatients();

        const doctors = this.props.value.getDoctors();
		const appointments = this.props.value.appointments;
		const ressources = this.props.value.ressources;

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

		const myDoctors = [];
		if(this.props.value.authState.user.accessLvl === "Patient") {
			const authPatient = this.props.value.getUser(this.props.value.authState.user.id);
			if(doctors) {
				doctors.map(doctor=>{
					authPatient.assignedDoctors.map(d=>{
						if(d.doctor_id === doctor._id) {
							myDoctors.push(doctor);
						}
					})
				})
				
			}
		}

		const myPatients = [];
		if(this.props.value.authState.user.accessLvl === "Doctor") {
			const authDoctor = this.props.value.getUser(this.props.value.authState.user.id);
			if(patients) {
				patients.map(patient=>{
					patient.assignedDoctors.map(d=>{
						if(d.doctor_id === authDoctor._id) {
							myPatients.push(patient);
						}
					})
				})
				
			}
		}
		

		var incomes = 0;
		var outcomes = 0;
		var netProfit = 0;

		var InMounth1 = 0;
		var OutMounth1 = 0;
		var InMounth2 = 0;
		var OutMounth2 = 0;
		var InMounth3 = 0;
		var OutMounth3 = 0;

		if(ressources) {
			ressources.map(item => {
				if(item.type==="income") {
					incomes += item.amount;
					netProfit = netProfit+item.amount;
					if(item.createdAt.substring(0,7) === "2021-06") {
						InMounth1 += item.amount;
					}
					if(item.createdAt.substring(0,7) === "2021-05") {
						InMounth2 += item.amount;
					}
					if(item.createdAt.substring(0,7) === "2021-04") {
						InMounth3 += item.amount;
					} 
				}
				if(item.type==="outcome") {
					outcomes += item.amount;
					netProfit = netProfit-item.amount;
					if(item.createdAt.substring(0,7) === "2021-06") {
						OutMounth1 += item.amount;
					}
					if(item.createdAt.substring(0,7) === "2021-05") {
						OutMounth2 += item.amount;
					}
					if(item.createdAt.substring(0,7) === "2021-04") {
						OutMounth3 += item.amount;
					}
				}
			})
		}

		
		
        return (
            <div>
                <div class="row">
					<div class="col-xl-6 col-xxl-12">

                        <div class="form-head d-flex mb-3 mb-md-5 align-items-start ml-4 ml-lg-0">
                            <div class="mr-auto d-lg-block">
                                <h3 class="text-primary font-w600">Welcome to CabinetManager</h3>
                                <p class="mb-0">Manage Patients, Appointments, Employees and Ressources ..</p>
                            </div>
                            
                            <div class="input-group search-area ml-auto d-inline-flex mt-3">
                                <input type="text" class="form-control" placeholder="Search here"/>
                                <div class="input-group-append">
                                    <a href="javascript:void(0)" class="input-group-text"><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            {/* <a href="javascript:void(0);" class="btn btn-primary ml-3"><i class="fa fa-settings mr-0"></i></a> */}
                        </div>

						<div class="row justify-content-center">
						<div class="col-xl-3 col-lg-3 col-sm-6">
										<div class="widget-stat card bg-danger">
											<div class="card-body  p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-calendar"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">Appoint</p>
														<h3 class="text-white">{loading ? ("...") : (appointments.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>	
									<div class="col-xl-3 col-lg-3 col-sm-6">
										<div class="widget-stat card bg-success">
											<div class="card-body p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-money-bill"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">Profit</p>
														<h3><h4 class="text-white">${loading ? ("...") : (netProfit)}</h4></h3>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-3 col-lg-3 col-sm-6">
										<div class="widget-stat card bg-info">
											<div class="card-body p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-users"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">Patients</p>
														<h3 class="text-white">{loading ? ("...") : (patients.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-3 col-lg-3 col-sm-6">
										<div class="widget-stat card bg-primary">
											<div class="card-body p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-id-card"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">Doctors</p>
														<h3 class="text-white">{loading ? ("...") : (doctors.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
						{/* {
							this.props.value.authState.user.accessLvl === "Patient" && (
								<>
									<div class="col-xl-4 col-lg-4 col-sm-6">
										<div class="widget-stat card bg-danger">
											<div class="card-body  p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-calendar"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">My Appoint</p>
														<h3 class="text-white">{loading ? ("...") : (myAppointments.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-4 col-lg-4 col-sm-6">
										<div class="widget-stat card bg-primary">
											<div class="card-body p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-id-card"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">My Doctors</p>
														<h3 class="text-white">{loading ? ("...") : (myDoctors.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							)
						}
						{
							this.props.value.authState.user.accessLvl === "Doctor" && (
								<>
									<div class="col-xl-4 col-lg-4 col-sm-6">
										<div class="widget-stat card bg-danger">
											<div class="card-body  p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-calendar"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">My Appoint</p>
														<h3 class="text-white">{loading ? ("...") : (myAppointments.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-4 col-lg-4 col-sm-6">
										<div class="widget-stat card bg-primary">
											<div class="card-body p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-id-card"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">My Patients</p>
														<h3 class="text-white">{loading ? ("...") : (myPatients.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							)
						}
						{
							this.props.value.authState.user.accessLvl === "Admin" && (
								<>
									<div class="col-xl-3 col-lg-3 col-sm-6">
										<div class="widget-stat card bg-danger">
											<div class="card-body  p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-calendar"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">Appoint</p>
														<h3 class="text-white">{loading ? ("...") : (appointments.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>	
									<div class="col-xl-3 col-lg-3 col-sm-6">
										<div class="widget-stat card bg-success">
											<div class="card-body p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-money-bill"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">Profit</p>
														<h3><h4 class="text-white">${loading ? ("...") : (netProfit)}</h4></h3>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-3 col-lg-3 col-sm-6">
										<div class="widget-stat card bg-info">
											<div class="card-body p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-users"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">Patients</p>
														<h3 class="text-white">{loading ? ("...") : (patients.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-3 col-lg-3 col-sm-6">
										<div class="widget-stat card bg-primary">
											<div class="card-body p-4">
												<div class="media">
													<span class="mr-3">
														<i class="fa fa-id-card"></i>
													</span>
													<div class="media-body text-white text-right">
														<p class="mb-1">Doctors</p>
														<h3 class="text-white">{loading ? ("...") : (doctors.length)}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							)
						} */}

							<div class="col-12 col-lg-6 col-xl-6">
								<div class="card">
									<div class="card-header border-0 pb-0">
										<h4 class="card-title">Patients (%)</h4>
										<select class="form-control style-1 default-select ">
											<option>Weekly</option>
											<option>Daily</option>
											<option>Monthly</option>
										</select>
									</div>
									<div class="card-body pt-2">
										<h4 class="text-dark font-w400">Total Patient</h4>
										<h3 class="text-primary font-w600">{loading ? ("...") : (patients.length)} People</h3>
										<div class="row mx-0 align-items-center">
											<div class="col-sm-8 col-md-7 px-0">
												<div id="chartCircle" className="text-center align-items-center">
													<Chart 
														options = {{ 
															labels: ['New', 'Recovered', 'In Treatment'],
															colors:['#f72b50', '#209f84', '#ff5c00']
														}}
														series = {[ (newPatients.length*100/patients.length).toFixed(1), (recoveredPatients.length*100/patients.length).toFixed(1), (inTreatmentPatients.length*100/patients.length).toFixed(1) ]} 
														type="radialBar"
													/>
												</div> 
											</div>
											<div class="col-sm-4 col-md-5 px-0">
												<div class="patients-chart-deta">
													<div class="col px-0">
														<span class="bg-danger"></span>	
														<div>
															<p>New</p>
															<h4>{loading ? ("...") : (newPatients.length)}</h4>
														</div>
													</div>
													<div class="col px-0">
														<span class="bg-success"></span>	
														<div>
															<p>Recovered</p>
															<h4>{loading ? ("...") : (recoveredPatients.length)}</h4>
														</div>
													</div>
													<div class="col px-0">
														<span class="bg-warning"></span>	
														<div>
															<p>In Treatment</p>
															<h4>{loading ? ("...") : (inTreatmentPatients.length)}</h4>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										
									</div>
								</div>
							</div>

                            <div class="col-12 col-lg-6 col-xl-6">
								<div class="card">
									<div class="card-header border-0 pb-0">
										<h4 class="card-title">Revenue</h4>
										<select class="form-control style-1 default-select ">
											<option>2021</option>
											<option>2020</option>
											<option>2019</option>
										</select>
									</div>
									<div class="card-body pt-2">
										<h3 class="text-primary font-w600">${loading ? ("...") : (incomes)} <small class="text-dark ml-2">${loading ? ("...") : (incomes-outcomes)}</small></h3>
										<div id="chartBar">
											<Chart 
												options = {{ 
													colors:['#206bfb', '#16df7e'],
													chart: {
														type: 'bar',
														height: 230
													},
													plotOptions: {
														bar: {
															horizontal: false,
															dataLabels: {
																position: 'top'
															},
														}
													},
													dataLabels: {
														enabled: true,
														offsetX: -6,
														style: {
															fontSize: '12px',
															colors: ['#fff']
														}
													},
													stroke: {
														show: true,
														width: 1,
														colors: ['#fff']
													},
													tooltip: {
														shared: true,
														intersect: false
													},
													xaxis: {
														categories: ['APRIL', 'MAY', 'JUNE'],
													}
												}}
												series = {[
													{
														name: 'Revenue',
														data: [InMounth3, InMounth2, InMounth1]
													}, {
														name: 'Net Profit',
														data: [InMounth3-OutMounth3, InMounth2-OutMounth2, InMounth1-OutMounth1] 
													}
												]} 
												type="bar"
											/>
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

export default Dashboard;