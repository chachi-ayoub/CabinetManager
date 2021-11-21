import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Modal extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        story : ""
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    login = (e) => {
      e.preventDefault();
      const email = this.state.email;
      const password = this.state.password;
      this.props.value.login({email, password});
  }

  register = (e) => {
      e.preventDefault();
    
      const email = this.state.email;
      const accessLvl = "Patient";
      const name = this.state.name;
      const address = "";
      const phone = "";
      const image = "/images/avatars/not-available.jpg";
      const story = this.state.story;
      const note = "";
      const statistics = [];
      const insurance = {
        service: "",
        code: ""
      };
      const assignedDoctors = [];
      const diseases = [
          {
              name: "",
              status: "New"
          }
      ];

      if (this.state.password === this.state.password2) {
        const password = this.state.password;
        this.props.value.register({email, password, accessLvl, name, address, phone, image, story, note, statistics, insurance, assignedDoctors, diseases});
      } else {
        this.props.value.showAlert("Password does not match !", "error");
      }    
  }

    render() {
        let params = new URLSearchParams(this.props.location.search);
        if(params.get("login")==="true") {
          return (
              <ModalContainer>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin">
                          <div class="card-body">
                            {/* <FontAwesomeIcon icon={faTimes} onClick={()=>{this.props.value.closeLoginModal()}} className="" /> */}
                            <Link to="/?login=false"><i className="fa fa-times close-modal float-right"  onClick={() => {this.props.value.closeLoginModal()}}></i></Link>
                            <Tabs>

                              <TabList>
                                <Tab>Login</Tab>
                                <Tab>Register</Tab>
                              </TabList>

                              <TabPanel>
                                <h5 class="card-title text-center">Sign In to your Account</h5>
                                <form class="form-signin" onSubmit={this.login}>
                                    <div class="form-label-group">
                                        <input onChange={this.handleInput} name="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                                        <label for="inputEmail">Email address</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input onChange={this.handleInput} name="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                                        <label for="inputPassword">Password</label>
                                    </div>

                                    <div class="custom-control custom-checkbox mb-3">
                                      <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                      <label class="custom-control-label" for="customCheck1">Remember password</label>
                                    </div>

                                    {this.props.value.authLoading ? (
                                        <button class="btn btn-lg btn-block text-uppercase" type="submit">Loading ..</button>
                                    ):(
                                        <button class="btn btn-lg btn-block text-uppercase" type="submit">Sign in</button>
                                    )}  
                                  
                                </form>
                              </TabPanel>

                              <TabPanel>
                              <h5 class="card-title text-center">Create a New Account</h5>
                                <form class="form-signin" onSubmit={this.register}>
                                    
                                    <div class="form-label-group">
                                        <input onChange={this.handleInput} name="name" type="text" id="inputName" class="form-control" placeholder="Your Name" required autofocus />
                                        <label for="inputName">Your Name</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input onChange={this.handleInput} name="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required />
                                        <label for="inputEmail">Email address</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input onChange={this.handleInput} name="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                                        <label for="inputPassword">Password</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input onChange={this.handleInput} name="password2" type="password" id="inputPassword2" class="form-control" placeholder="Password" required />
                                        <label for="inputPassword2">Confirm Password</label>
                                    </div>

                                    <div class="form-label-group">
                                        <textarea onChange={this.handleInput} name="story" type="text" id="story" class="form-control" placeholder="Why do you need a doctor ? Describe your feelings .." required />
                                    </div>

                                    {this.props.value.authLoading ? (
                                        <button class="btn btn-lg btn-block text-uppercase" type="submit">Loading ..</button>
                                    ):(
                                        <button class="btn btn-lg btn-block text-uppercase" type="submit">Create Account</button>
                                    )}  
                                
                                </form>
                              </TabPanel>
                            
                            </Tabs>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
              </ModalContainer>
          ) 
      } else {
          // document.body.style.overflow = 'unset';
          return null;
      }
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
    z-index: 999;
    overflow-y: auto;
`
