import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import {withRouter} from "react-router";

class Nav extends Component{
    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
    }

    changelogHandler(val){
        this.props.changeState(val);
    }

    componentDidMount() {
        fetch("http://localhost:3000/notes/getServerNotes", {
            method: 'GET',
            headers:{
                authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .then(data=>data.json())
            .then(res=>{
                if (res.message){
                    this.changelogHandler(false);
                }
                else {
                    this.changelogHandler(true);
                }
            });
        this.props.history.push("/main");
    }


    signout(){
        localStorage.removeItem("token");
        this.changelogHandler(false);
        this.props.history.push("/main");
    }

    render() {
        if (this.props.isLogged === false) {
            return (<div className="nav__nav-container">
                <NavLink className="nav__link" to="/login">Войти</NavLink>
                <NavLink className="nav__link" to="/register" >Регистрация</NavLink>
                <NavLink className="nav__link" to="/main">На Главную</NavLink>
            </div>)
        }
        else if (this.props.isLogged === true){
            return (<div className="nav__nav-container">
                <NavLink className="nav__link" to="/showNotes">Мои заметки</NavLink>
                <NavLink className="nav__link" to="/main">На Главную</NavLink>
                <button className="nav__button" onClick={this.signout}>Выйти</button>
            </div>)
        }
        return null
    }
}

export default withRouter(Nav)