import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import logo from "../assets/images/logo.png"
import logo2 from "../assets/images/logo2.png"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          anchorEl: null,
          headerClass: "",
        };
      }

      setAnchorEl = (value) => {
          this.setState({anchorEl: value});
      }

      handleClick = (event) => {
        this.setAnchorEl(event.currentTarget);
      };
    
      handleClose = () => {
        this.setAnchorEl(null);
      };
    
    
    componentDidMount(){
        if(window.location.pathname !== '/') {
            this.setState({ headerClass: "header-scrolled" });
        } else {
            this.setState({ headerClass: "" });
            window.addEventListener('scroll', () => {
            if(window.scrollY > 10){
                this.setState({ headerClass: "header-scrolled" });
            } else {
                this.setState({ headerClass: "" });
            }
            }, { passive: false });
        }
    }

    render() {

        const style = {
            color: '#14c871',
          }
          
        return (
            <div>
                
                <header id="header" className={`fixed-top ${this.state.headerClass}`}>
                    <div className="container d-flex align-items-center">

                        <h1 className="logo mr-auto"><a href="/"><img src={logo2} alt="" className="" height="30px"/> CabinetManager</a></h1>
                        <nav className="nav-menu d-none d-lg-block">
                            <ul>
                                <li></li>
                                <li></li>
                                <li><NavLink activeStyle={style} exact to="/">Home</NavLink></li>
                                <li className="drop-down">
                                    <NavLink exact activeStyle={style} exact to="/dashboard">Dashboard</NavLink>
                                    <ul>
                                        <li className="drop-down">
                                            <NavLink exact activeStyle={style} exact to="/dashboard/patients">Manage Patients</NavLink>
                                            {/* <ul>
                                                <li><a href="#">Deep Drop Down 1</a></li>
                                                <li><a href="#">Deep Drop Down 2</a></li>
                                                <li><a href="#">Deep Drop Down 3</a></li>
                                                <li><a href="#">Deep Drop Down 4</a></li>
                                                <li><a href="#">Deep Drop Down 5</a></li>
                                            </ul> */}
                                        </li>
                                        <li className="drop-down">
                                            <NavLink exact activeStyle={style} exact to="/dashboard/employees">Manage Employees</NavLink>
                                            {/* <ul>
                                                <li><a href="#">Deep Drop Down 1</a></li>
                                                <li><a href="#">Deep Drop Down 2</a></li>
                                                <li><a href="#">Deep Drop Down 3</a></li>
                                                <li><a href="#">Deep Drop Down 4</a></li>
                                                <li><a href="#">Deep Drop Down 5</a></li>
                                            </ul> */}
                                        </li>
                                        <li className="drop-down">
                                            <NavLink exact activeStyle={style} exact to="/dashboard/ressources">Manage Ressources</NavLink>
                                            {/* <ul>
                                                <li><a href="#">Deep Drop Down 1</a></li>
                                                <li><a href="#">Deep Drop Down 2</a></li>
                                                <li><a href="#">Deep Drop Down 3</a></li>
                                                <li><a href="#">Deep Drop Down 4</a></li>
                                                <li><a href="#">Deep Drop Down 5</a></li>
                                            </ul> */}
                                        </li>
                                    </ul>
                                </li>

                                {this.props.value.authState.authenticated ? (
                                    
                                    <li className="drop-down">
                                        <NavLink exact exact to="/dashboard"><i className="fa fa-user mr-2" />{this.props.value.authState.user.name} </NavLink>
                                        <ul>
                                            {/* <li className="drop-down">
                                                <NavLink exact to={"/dashboard/patients/"+this.props.value.authState.user.id}>My Profile</NavLink>
                                            </li> */}
                                            <li className="">
                                                <Link to="" onClick={()=>{this.props.value.logout()} }><i className="fa fa-sign-out-alt mr-2" />Logout</Link>
                                            </li>
                                        </ul>
                                    </li>
                                ):(
                                    <Link to="/?login=true" className="get-started-btn scrollto" ><i className="fa fa-sign-in-alt mr-2"/>Login</Link>
                                )}
                                
                            </ul>
                        </nav>

                            {/* <nav className="sidenav d-lg-none" data-mdb-right="true">
                            <div className="container-fluid">
                                <button className="navbar-toggler ms-auto" type="button" data-mdb-toggle="collapse"
                                data-mdb-target="#navbarToggleExternalContent3" aria-controls="navbarToggleExternalContent3"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-bars"></i>
                                </button>
                            </div>
                            </nav>
                            <div className="collapse" id="navbarToggleExternalContent3">
                            <div className="bg-light shadow-3 p-4">
                                <button className="btn btn-link btn-block border-bottom m-0">Link 1</button>
                                <button className="btn btn-link btn-block border-bottom m-0">Link 2</button>
                                <button className="btn btn-link btn-block m-0">Link 3</button>
                            </div>
                            </div> */}

                        <div className="PopUpMenu">

                            <div onClick={this.handleClick} className="menu_trigger_container ml-auto">
                                <div className="menu_trigger d-flex flex-row align-items-center justify-content-end">
                                    <div className="menu_burger">
                                        <div className="menu_trigger_text"></div>
                                        <div className="cat_burger menu_burger_inner"><span></span><span></span><span></span></div>
                                    </div>
                                </div>
                            </div>

                            <Menu
                                id="simple-menu"
                                className="mt-0"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <div className="simple-menu mt-3">
                                    <i className="fa fa-times close-modal float-right" onClick={this.handleClose}></i>
                                    <Link to="/"><MenuItem onClick={this.handleClose}><i className="fa fa-home" /> Home</MenuItem></Link>
                                    <Link to="/dashboard"><MenuItem onClick={this.handleClose}><i className="fa fa-cog" /> Dashboard</MenuItem></Link>
                                    <hr className="my-2 mx-2" />
                                    {this.props.value.authState.authenticated ? (
                                    <>
                                        <Link><MenuItem onClick={()=>{this.handleClose(); this.props.value.logout();}}><i className="fa fa-sign-out-alt"/> Logout</MenuItem></Link>
                                    </>
                                    ):(
                                        <Link><MenuItem onClick={()=>{this.handleClose(); this.props.value.openLoginModal();}}><i className="fa fa-sign-in-alt"/> Login</MenuItem></Link>
                                    )}
                                </div>
                            </Menu>
                            
                        </div>
                        
                    </div>
                    
                </header>
                
                <div className="spacer"></div>

            </div>

        );
    }
}

export default Header;