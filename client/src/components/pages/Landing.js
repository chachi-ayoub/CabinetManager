import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ReactVideo, YoutubePlayer } from "reactjs-media";

import heroImg from '../../assets/images/hero-img4.png'
import team1 from '../../assets/images/team/ayoub.jpg'
import team2 from '../../assets/images/team/makhloufi.jpg'
import team3 from '../../assets/images/team/omar.jpg'
import team4 from '../../assets/images/team/khadija.jpg'
import team5 from '../../assets/images/team/chachi.jpg'
import team6 from '../../assets/images/team/chakri.jpg'

class Landing extends Component {
    render() {
        return (
            <div>
                
                <section id="hero" class="d-flex align-items-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Efficient, Easy and Secured</h1>
                            <h2>Manage your Patients, Employees and Ressources with no trouble.</h2>
                            <div class="d-flex">
                                <Link to="/dashboard" class="btn-get-started scrollto text-center">Get Started</Link>
                                <a target="_blank" href="https://github.com/ayoubelaamri/CabinetManager" class="venobox btn-watch-video text-center" data-vbtype="video" data-autoplay="true"> Access Source Code <i class="icofont-play-alt-2"></i></a>
                            </div>
                            </div>
                            <div class="col-lg-6 order-1 order-lg-2 hero-img">
                            <img src={heroImg} class="img-fluid animated" alt=""/>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="featured-services" class="featured-services mb-3 mt-3">
                    <div class="container">
                        <div class="row">
                        <div class="col-lg-4 col-md-6 ">
                            <div class="icon-box">
                            <div class="icon"><i class="fa fa-users"></i></div>
                            <h4 class="title"><a href="/dashboard/patients">Patients & appointements</a></h4>
                            <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mt-4 mt-md-0">
                            <div class="icon-box">
                            <div class="icon"><i class="fa fa-id-card"></i></div>
                            <h4 class="title"><a href="/dashboard/employees">Doctors / Employees</a></h4>
                            <p class="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mt-4 mt-lg-0">
                            <div class="icon-box">
                            <div class="icon"><i class="fa fa-money-bill"></i></div>
                            <h4 class="title"><a href="/dashboard/ressources">Ressources & Finance</a></h4>
                            <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>

                {/* <div className="row">
                    <div className="col-5 ml-auto"> 
                        <YoutubePlayer
                            className="landing-video ml-auto"
                            src="https://www.youtube.com/watch?v=mt2wlw72wVY" // Reqiured
                            width={650}
                            height={400}
                        />
                    </div>
                    <div className="col-4"> 
                        
                    </div>
                </div> */}

                <section id="team" class="team">
                    <div class="container">

                        <div class="section-title">
                            <h2>Our Team</h2>
                            <p>If everyone is moving forward together, then success takes care of itself.</p>
                        </div>

                        <div class="row">

                        <div class="col-lg-2 col-md-6 mb-3">
                            <div class="member">
                            <div class="pic"><img src={team1} class="img-fluid" alt=""/></div>
                            <div class="member-info">
                                <h4>Ayoub <br />EL AAMRI</h4>
                                {/* <span>Student Engineer</span> */}
                                <div class="social">
                                    <a href=""><i class="fab fa-twitter mr-2"></i></a>
                                    <a href=""><i class="fab fa-facebook-f mr-2"></i></a>
                                    <a href=""><i class="fab fa-instagram mr-2"></i></a>
                                    <a href=""><i class="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-6 mb-3">
                            <div class="member">
                            <div class="pic"><img src={team2} class="img-fluid" alt=""/></div>
                            <div class="member-info">
                                <h4>Imane MAKHLOUFI</h4>
                                {/* <span>Student Engineer</span> */}
                                <div class="social">
                                    <a href=""><i class="fab fa-twitter mr-2"></i></a>
                                    <a href=""><i class="fab fa-facebook-f mr-2"></i></a>
                                    <a href=""><i class="fab fa-instagram mr-2"></i></a>
                                    <a href=""><i class="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-6 mb-3">
                            <div class="member">
                            <div class="pic"><img src={team3} class="img-fluid" alt=""/></div>
                            <div class="member-info">
                                <h4>Omar CHARKANI</h4>
                                {/* <span>Student Engineer</span> */}
                                <div class="social">
                                    <a href=""><i class="fab fa-twitter mr-2"></i></a>
                                    <a href=""><i class="fab fa-facebook-f mr-2"></i></a>
                                    <a href=""><i class="fab fa-instagram mr-2"></i></a>
                                    <a href=""><i class="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-6 mb-3">
                            <div class="member">
                            <div class="pic"><img src={team4} class="img-fluid" alt=""/></div>
                            <div class="member-info">
                                <h4>Khadija LAMNAOUAR</h4>
                                {/* <span>Student Engineer</span> */}
                                <div class="social">
                                    <a href=""><i class="fab fa-twitter mr-2"></i></a>
                                    <a href=""><i class="fab fa-facebook-f mr-2"></i></a>
                                    <a href=""><i class="fab fa-instagram mr-2"></i></a>
                                    <a href=""><i class="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-6 mb-3">
                            <div class="member">
                            <div class="pic"><img src={team5} class="img-fluid" alt=""/></div>
                            <div class="member-info px-1">
                                <h4>Ayoub CHACHI</h4>
                                {/* <span>Student Engineer</span> */}
                                <div class="social">
                                    <a href=""><i class="fab fa-twitter mr-2"></i></a>
                                    <a href=""><i class="fab fa-facebook-f mr-2"></i></a>
                                    <a href=""><i class="fab fa-instagram mr-2"></i></a>
                                    <a href=""><i class="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-6 mb-3">
                            <div class="member">
                            <div class="pic"><img src={team6} class="img-fluid" alt=""/></div>
                            <div class="member-info px-1">
                                <h4>Imane CHAKRI</h4>
                                {/* <span>Student Engineer</span> */}
                                <div class="social">
                                    <a href=""><i class="fab fa-twitter mr-2"></i></a>
                                    <a href=""><i class="fab fa-facebook-f mr-2"></i></a>
                                    <a href=""><i class="fab fa-instagram mr-2"></i></a>
                                    <a href=""><i class="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>

                        </div>

                    </div>
                </section>

            </div>
        );
    }
} 

export default Landing;