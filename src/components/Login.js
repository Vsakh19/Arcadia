import React, {useState} from "react";
import {withRouter} from "react-router-dom";

function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function nameChange(event){
        setUsername(event.target.value)
    }

    function passwordChange(event){
        setPassword(event.target.value)
    }

    function userHandler(val){
        props.changeUser(val);
    }

    function logHandler(val){
        props.changeState(val);
    }

    function login(event){
        event.preventDefault();
        fetch("http://notifymethings.tk/auth/loginServerUser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res=>res.json())
            .then((data)=>{
                if (!data.message) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', username);
                    logHandler(true);
                    userHandler(username);
                    props.history.push("/showNotes");
                }
                else {
                    alert("Ошибка авторизации");
                    props.history.push("/main");
                }
            })
            .catch(err=>{
                logHandler(false);
                return (<h2 className="dynamic-content__onError">{err}</h2> )
            });
    }

    return (
        <div className="form-container">
            <form className="form" name="login" >
                <label className="form__label">Авторизация</label>
                <div className="form__input-container">
                    <input className="form__input" type="text" name="name" placeholder="Username" onChange={nameChange} required/>
                    <input className="form__input" type="password" name="password" placeholder="Password" onChange={passwordChange} required/>
                </div>
                <button className="form__button" type="submit" name="submit" onClick={login}>Войти</button>
            </form>
        </div>
    )
}

export default withRouter(Login);