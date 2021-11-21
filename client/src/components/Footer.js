import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <div>
                
                <footer id="footer">

                    <div className="footer-top">

                        <div className="container">

                            <div className="row  justify-content-center">
                            <div className="col-lg-6">
                                <h3>CabinetManager</h3>
                                <p>Manage your Patients, Employees and Ressources with no trouble.</p>
                            </div>
                            </div>

                            {/* <div className="row footer-newsletter justify-content-center">
                                <div className="col-lg-6">
                                    <form action="" method="post">
                                    <input type="email" name="email" placeholder="Enter your Email"/>
                                    <input type="submit" value="Subscribe" />
                                    </form>
                                </div>
                            </div> */}

                            <div className="social-links">
                                <a href="#" className="twitter"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="instagram"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="google-plus"><i className="fab fa-skype"></i></a>
                                <a href="#" className="linkedin"><i className="fab fa-linkedin"></i></a>
                            </div>

                        </div>
                    </div>

                    <div className="container footer-bottom clearfix">
                        <div className="copyright">
                            &copy; Copyright <strong><span>CabinetManager</span></strong>. All Rights Reserved
                        </div>
                        <div className="credits">
                            Designed by <Link to="/">PFA Groups 23 & 24</Link>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}

export default Footer;