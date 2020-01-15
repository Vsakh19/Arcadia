import React, { Component } from "react";
import {withRouter} from "react-router";
import {NavLink} from "react-router-dom";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.nameChange = this.nameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.reg = this.reg.bind(this);
        this.logHandler = this.logHandler.bind(this);
        this.userHandler = this.userHandler.bind(this);
    }

    logHandler(val){
        this.props.changeState(val);
    }

    userHandler(val){
        this.props.changeUser(val);
    }

    nameChange(event){
        this.setState({username: event.target.value, password: this.state.password})
    }

    passwordChange(event){
        this.setState({username: this.state.username, password: event.target.value})
    }

    reg(event){
        event.preventDefault();
        fetch("http://localhost:3000/auth/addServerUser",{
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
                history.push("/");
            })
            .catch(err=>{
                return (<h2 className="onError">{err}</h2> )
            });
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <form className="form reg" name="reg" >
                    <label className="form-label">Зарегистрироваться</label>
                    <input type="text" name="name" placeholder="Username" onChange={this.nameChange} required/>
                    <input type="password" name="password" placeholder="Password" onChange={this.passwordChange} required/>
                    <button type="submit" name="submit" onClick={this.reg}>Сохранить</button>
                </form>
                <NavLink to="/">На Главную</NavLink>
            </div>
        )
    }
}

export default withRouter(Register);