import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


class NotFound extends Component {

    render() {
        return (
            
                <div class="authincation h-100 my-5">
                    <div class="container h-100">
                        <div class="row justify-content-center h-100 align-items-center">
                            <div class="col-md-12">
                                <div class="form-input-content text-center error-page">
                                    <h1 class="error-text font-weight-bold">404</h1>
                                    <h4><i class="fa fa-thumbs-down text-danger"></i> Page Not Found !</h4>
                                    <p>You may have mistyped the address or the page may have moved.</p>
                                    <div>
                                        <Link class="btn btn-primary" to="/">Back to Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
}

NotFound.propTypes = {

};

export default NotFound;