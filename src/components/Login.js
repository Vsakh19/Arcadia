import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.nameChange = this.nameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.login = this.login.bind(this);
        this.logHandler = this.logHandler.bind(this);
        this.userHandler = this.userHandler.bind(this);
    }
    nameChange(event){
        this.setState({username: event.target.value, password: this.state.password})
    }

    passwordChange(event){
        this.setState({username: this.state.username, password: event.target.value})
    }

    userHandler(val){
        this.props.changeUser(val);
    }

    logHandler(val){
        this.props.changeState(val);
    }

    login(event){
        event.preventDefault();
        fetch("http://localhost:3000/auth/loginServerUser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res=>res.json())
            .then((data)=>{
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', this.state.username);
                this.logHandler(true);
                this.userHandler(this.state.username);
            })
            .catch(err=>{
                this.logHandler(false);
                return (<h2 className="onError">{err}</h2> )
            });
        this.props.history.push("/main");
    }

    render() {
        return (
            <div>
                <form className="form login" name="login" >
                    <label className="form-label">Авторизация</label>
                    <input type="text" name="name" placeholder="Username" onChange={this.nameChange} required/>
                    <input type="password" name="password" placeholder="Password" onChange={this.passwordChange} required/>
                    <button type="submit" name="submit" onClick={this.login}>Войти</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);