import React, {useState} from "react";
import {Route, BrowserRouter} from "react-router-dom";
import Iframe from 'react-iframe'
import Login from "./Login";
import Notes from "./Notes";
import Nav from "./Nav";
import NewNote from "./NewNote";
import Register from "./Register";
import logo from "../images/logo.png";


function App(){
    const [isLogged, setLogged] = useState(null);
    const [user, setUser] = useState(localStorage.getItem("user"));

    function changeState(current){
        if(current===true) {
            setLogged(current);
        }
        else {
            setLogged(current);
            setUser("");
        }
    }

    function changeUser(current){
        setUser(current);
    }

    return (
        <BrowserRouter>
            <header className="header">
                <div className="logo-part">
                    <img alt="logo image" className="logo-part__logo" src={logo}/>
                    <h1 className="logo-part__title">Notify</h1>
                </div>
                <p className="header__user">{user}</p>
            </header>
            <main className="main">
                <nav className="nav">
                    <Nav changeState = {changeState} isLogged = {isLogged}/>
                </nav>
                <section className="dynamic-content">
                    <Route path = "/" component = {()=>null}/>
                    <Route path = "/main" component = {()=>(<Iframe width="840" height="473" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>)}/>
                    <Route path = "/login" component = {()=>(<Login isLogged = {isLogged} changeState = {changeState} changeUser = {changeUser}/>)}/>
                    <Route path = "/register" component = {()=>(<Register changeState = {changeState} changeUser = {changeUser} isLogged = {isLogged}/>)}/>
                    <Route path = "/showNotes" component = {Notes}/>
                    <Route path="/addNote" component={()=>(<NewNote user = {user} isLogged = {isLogged}/>)}/>
                </section>
            </main>
            <footer className="footer">
                <div className="footer-info">
                    <p className="footer-info__line">Made by Sakharov Vladislav, 2020</p>
                    <p className="footer-info__line">Git repository: <a className="footer-info__link" href="https://github.com/Vsakh19/Arcadia">https://github.com/Vsakh19/Arcadia</a></p>
                </div>
            </footer>
        </BrowserRouter>
    );
}

export default App;