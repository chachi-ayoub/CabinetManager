import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Footer extends Component {
    render() {
        return (
            <div>
                <footer id="footer" className="dashboard-footer">
                    <div className="container footer-bottom clearfix">
                        <div className="copyright">
                            &copy; <strong><span> CabinetManager</span></strong>. All Rights Reserved
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