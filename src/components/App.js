import React, { Component } from "react";
import {Route, BrowserRouter} from "react-router-dom";
import Iframe from 'react-iframe'
import Login from "./Login";
import Notes from "./Notes";
import Nav from "./Nav";
import NewNote from "./NewNote";
import Register from "./Register";
import logo from "../images/logo.png";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: null,
            user: localStorage.getItem("user")
        };
        this.changeState = this.changeState.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeState(current){
        if(current===true) {
            this.setState({
                isLogged: current
            })
        }
        else {
            this.setState({
                isLogged: current,
                user: ""
            })
        }
    }

    changeUser(current){
        this.setState({
            user: current
        })
    }

    render() {
        return (
            <BrowserRouter>
                <header className="header">
                    <div className="logo-part">
                        <img alt="logo image" className="logo-part__logo" src={logo}/>
                        <h1 className="logo-part__title">Keep</h1>
                    </div>
                    <p className="header__user">{this.state.user}</p>
                </header>
                <main className="main">
                    <nav className="nav">
                        <Nav changeState = {this.changeState} isLogged = {this.state.isLogged}/>
                    </nav>
                    <section className="dynamic-content">
                        <Route path = "/" component = {()=>null}/>
                        <Route path = "/main" component = {()=>(<Iframe width="840" height="473" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>)}/>
                        <Route path = "/login" component = {()=>(<Login isLogged = {this.state.isLogged} changeState = {this.changeState} changeUser = {this.changeUser}/>)}/>
                        <Route path = "/register" component = {()=>(<Register changeState = {this.changeState} changeUser = {this.changeUser} isLogged = {this.state.isLogged}/>)}/>
                        <Route path = "/showNotes" component = {Notes}/>
                        <Route path="/addNote" component={()=>(<NewNote user = {this.state.user} isLogged = {this.state.isLogged}/>)}/>
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
}

export default App;