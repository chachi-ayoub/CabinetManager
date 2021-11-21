import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import visitor_img from '../../../assets/images/avatar/not-available.jpg'


class Sidebar extends Component {

    toggleMenu = () => {
        this.props.toggleMenu()
    }

    closeMenu = () => {
        if(window.screen.width < 991) {
            this.props.toggleMenu()
        }
    }

    render() {
        const style = {
            color: '#fff',
          }

        return (
            <div>
                <nav id="sidebar" className={`${this.props.data.sidebarClass}`}>
                    <div className="custom-menu">
                        <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={() => {this.toggleMenu()}}>
                            <i className="fa fa-bars"></i>
                            <span className="sr-only">Toggle Menu</span>
                        </button>
                    </div>
                    <div className="p-4 mt-3">
                        <div className="col" align="center">
                            {/* <img src={user_img} className="rounded user-img" alt="user image" />  */}
                            <img src={this.props.value.authState.authenticated ? (this.props.value.authState.user.image):(visitor_img)} className="rounded" width="100" alt=""/>
                            <h1 className="mt-3" >Welcome<a className="logo"><span className="">{!this.props.value.authState.authenticated ? ("Visitor"):(this.props.value.authState.user.name)}</span></a></h1>
                        </div>
                        <ul className="list-unstyled components my-5">
                            
                            {
                                this.props.value.authState.user.accessLvl === "Patient" && (
                                    <>
                                        <li>
                                            <NavLink className="link" activeStyle={style} exact to={this.props.match.path} onClick={() => {this.closeMenu()}}><span className="fa fa-home mr-3"></span> Dashboard</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/patients/' + this.props.value.authState.user.id} onClick={() => {this.closeMenu()}}><span className="fa fa-users mr-3"></span> My Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/appointments'} onClick={() => {this.closeMenu()}}><span className="fa fa-clock mr-3"></span> My Appointments</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/standby_room'} onClick={() => {this.closeMenu()}}><span className="fa fa-hourglass-end mr-3 ml-1"></span> Standby Room</NavLink>
                                        </li>
                                    </>
                                )
                            }
                            {
                                this.props.value.authState.user.accessLvl === "Doctor" && (
                                    <>
                                        <li>
                                            <NavLink className="link" activeStyle={style} exact to={this.props.match.path} onClick={() => {this.closeMenu()}}><span className="fa fa-home mr-3"></span> Dashboard</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/employees/' + this.props.value.authState.user.id} onClick={() => {this.closeMenu()}}><span className="fa fa-users mr-3"></span> My Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/patients'} onClick={() => {this.closeMenu()}}><span className="fa fa-clock mr-3"></span> My Patients</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/appointments'} onClick={() => {this.closeMenu()}}><span className="fa fa-clock mr-3"></span> My Appointments</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/standby_room'} onClick={() => {this.closeMenu()}}><span className="fa fa-hourglass-end mr-3 ml-1"></span> Standby Room</NavLink>
                                        </li>
                                    </>
                                )
                            }
                            {
                                (this.props.value.authState.user.accessLvl === "Assistant" || this.props.value.authState.user.accessLvl === "Admin") && (
                                    <>
                                        <li>
                                            <NavLink className="link" activeStyle={style} exact to={this.props.match.path} onClick={() => {this.closeMenu()}}><span className="fa fa-home mr-3"></span> Dashboard</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/patients'} onClick={() => {this.closeMenu()}}><span className="fa fa-users mr-3"></span> Patients</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/employees'} onClick={() => {this.closeMenu()}}><span className="fa fa-id-card mr-3"></span> Employees</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/appointments'} onClick={() => {this.closeMenu()}}><span className="fa fa-clock mr-3"></span> Appointments</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/standby_room'} onClick={() => {this.closeMenu()}}><span className="fa fa-hourglass-end mr-3 ml-1"></span> Standby Room</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="link" activeStyle={style} to={this.props.match.path + '/ressources'} onClick={() => {this.closeMenu()}}><span className="fa fa-money-bill mr-3"></span> Ressources</NavLink>
                                        </li>
                                    </>
                                )
                            }
                            
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Sidebar;