import React, { Component } from 'react';
import styled from 'styled-components';
import { Alert, AlertTitle } from '@material-ui/lab';

class Modal extends Component {
    state = {
        
    }

    render() {
        return (
            this.props.value.alertMsg !== '' && this.props.value.alertSeverity!== '' ? (
                <ModalContainer>
                    <div id="alerts">
                        {
                            this.props.value.alertSeverity === 'error' && (
                                <Alert onClose={() => {this.props.value.hideAlerts()}} severity="error" className="alert">
                                    <AlertTitle>Error</AlertTitle>
                                    {this.props.value.alertMsg} <br /> — <strong>Try again .. !</strong>
                                </Alert>
                            )
                        }{
                            this.props.value.alertSeverity === 'success' && (
                                <Alert onClose={() => {this.props.value.hideAlerts()}} severity="success" className="alert">
                                    <AlertTitle>Success</AlertTitle>
                                    {this.props.value.alertMsg} <br /> — <strong>Thank you !</strong>
                                </Alert>
                            )
                        }{
                            this.props.value.alertSeverity === 'warning' && (
                                <Alert onClose={() => {this.props.value.hideAlerts()}} severity="warning" className="alert">
                                    <AlertTitle>Warning</AlertTitle>
                                    {this.props.value.alertMsg} <br /> — <strong>check it out!</strong>
                                </Alert>
                            )
                        }{
                            this.props.value.alertSeverity === 'info' && (
                                <Alert onClose={() => {this.props.value.hideAlerts()}} severity="info" className="alert">
                                    <AlertTitle>Info</AlertTitle>
                                    {this.props.value.alertMsg} <br /> — <strong>check it out!</strong>
                                </Alert>
                            )
                        }
                    </div>
                </ModalContainer>
            ):(
                <></>
            )
        );
    }
}

export default Modal;

const ModalContainer = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:rgba(0,0,0,0.3);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index: 9999;

    #alerts {
        position: absolute;
        z-index: 199;
    }
    #alerts .alert {
        width: 300px;
        margin: 10px 0px 10px 0px;
        box-shadow: 0px 5px 20px rgba(0,0,0,0.3);
    }

`
