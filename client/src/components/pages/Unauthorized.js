import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


class Unauthorized extends Component {

    render() {
        return (
            
                <div class="authincation h-100 my-5">
                    <div class="container h-100">
                        <div class="row justify-content-center h-100 align-items-center">
                            <div class="col-md-12">
                                <div class="form-input-content text-center error-page">
                                    <h1 class="error-text font-weight-bold"><i class="fa fa-ban text-danger"></i> </h1>
                                    <h4>Unauthorized !</h4>
                                    <p>You do not have permission to access this route !</p>
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


export default Unauthorized;