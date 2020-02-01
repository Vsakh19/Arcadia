import React, {useState} from "react";
import {withRouter} from "react-router";

function Register(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function userHandler(val){
        props.changeUser(val);
    }

    function logHandler(val){
        props.changeState(val);
    }

    function nameChange(event){
        setUsername(event.target.value)
    }

    function passwordChange(event){
        setPassword(event.target.value)
    }

    function reg(event){
        event.preventDefault();
        if(username.length>=2 && password.length>=6) {
            fetch("http://notifymethings.tk/auth/addServerUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then((data) => {
                    if(!data.message){
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('user', username);
                        logHandler(true);
                        userHandler(username);
                        props.history.push("/main");
                    }
                    else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    alert(err)
                });
        }
        else {
            alert("Имя пользователя и пароль должны быть не короче 2 и 6 символов соответственно.");
        }
    }


    return (
        <div className="form-container">
            <form className="form" name="reg" >
                <label className="form__label">Зарегистрироваться</label>
                <div className="form__input-container">
                    <input className="form__input" minLength="2" maxLength="30" type="text" name="name" placeholder="Имя пользователя" onChange={nameChange} required/>
                    <input className="form__input" minLength="6" maxLength="30" type="password" name="password" placeholder="Пароль" onChange={passwordChange} required/>
                </div>
                <input value="Сохранить" className="form__button" name="submit" onClick={reg}/>
            </form>
        </div>
    )
}

export default withRouter(Register);