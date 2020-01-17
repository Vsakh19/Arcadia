import React, { Component } from "react";
import {withRouter} from "react-router";

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
        if(this.state.username.length>=2 && this.state.password.length>=6) {
            fetch("http://localhost:3000/auth/addServerUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
                .then(res => res.json())
                .then((data) => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', this.state.username);
                    this.logHandler(true);
                    this.userHandler(this.state.username);
                    this.props.history.push("/main");
                })
                .catch(err => {
                    return (<h2 className="dynamic-content__onError">{err}</h2>)
                });
        }
        else {
            alert("Имя пользователя и пароль должны быть не короче 2 и 6 символов соответственно.");
        }
    }

    render() {
        return (
            <div className="form-container">
                <form className="form" name="reg" >
                    <label className="form__label">Зарегистрироваться</label>
                    <div className="form__input-container">
                        <input className="form__input" minLength="2" maxLength="30" type="text" name="name" placeholder="Имя пользователя" onChange={this.nameChange} required/>
                        <input className="form__input" minLength="6" maxLength="30" type="password" name="password" placeholder="Пароль" onChange={this.passwordChange} required/>
                    </div>
                    <input value="Сохранить" className="form__button" name="submit" onClick={this.reg}/>
                </form>
            </div>
        )
    }
}

export default withRouter(Register);