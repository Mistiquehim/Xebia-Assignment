import React, { Component } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../redux/actions'
import '../App.css';

class Login extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.state = { showAlert: false };
    }

    componentWillReceiveProps(newProps) {
        let { loginInfo } = newProps;
        if (loginInfo.success) {
            this.props.history.push('/search');
        } else if (!loginInfo.success && loginInfo.showAlert) {
            this.setState({ showAlert: true, alertText: loginInfo.alertText });
        }
    }
    /**
     * function onChange
     * @param {*} field 
     * @param {*} value 
     */
    onChange(field, e) {
        var userState = {};
        userState[field] = e.target.value;
        this.setState(userState);
    }

    hideAlert() {
        this.setState({ showAlert: false });
    }

    onSubmit(e) {
        this.props.loginRequest(this.state);
    }

    render() {
        return (
            <div className="wrapper">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Star Wars - Login</h2>
                    <input type="text" className="form-control" name="username" placeholder="Email Address" required="" autoFocus="" onChange={this.onChange.bind(this, 'username')} />
                    <br/>
                    <input type="password" className="form-control" name="password" placeholder="Password" required="" onChange={this.onChange.bind(this, 'password')} />
                    <br/>
                    <button type="button" className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}>Login</button>
                </form>
                {
                    this.state.showAlert ? <SweetAlert title={this.state.alertText} onConfirm={this.hideAlert} /> : null
                }
            </div>
        )
    }
}

let mapStateToProps = function (state) {
    return { loginInfo: state.login };
}

export default connect(mapStateToProps, action)(withRouter(Login));