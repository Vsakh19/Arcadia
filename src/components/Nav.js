import {NavLink} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {withRouter} from "react-router";

function Nav(props){

    function changelogHandler(val){
        props.changeState(val);
    }

    useEffect(()=>{
        fetch("http://notifymethings.tk/notes/getServerNotes", {
            method: 'GET',
            headers:{
                authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .then(data=>data.json())
            .then(res=>{
                if (res.message){
                    changelogHandler(false);
                }
                else {
                    changelogHandler(true);
                }
            });
        props.history.push("/main");
    }, []);


    function signout(){
        localStorage.removeItem("token");
        changelogHandler(false);
        props.history.push("/main");
    }

    if (props.isLogged === false) {
        return (<div className="nav__nav-container">
            <NavLink className="nav__link" to="/login">Войти</NavLink>
            <NavLink className="nav__link" to="/register" >Регистрация</NavLink>
            <NavLink className="nav__link" to="/main">На Главную</NavLink>
        </div>)
    }
    else if (props.isLogged === true){
        return (<div className="nav__nav-container">
            <NavLink className="nav__link" to="/showNotes">Мои заметки</NavLink>
            <NavLink className="nav__link" to="/main">На Главную</NavLink>
            <button className="nav__button" onClick={signout}>Выйти</button>
        </div>)
    }
    return null;
}

export default withRouter(Nav)