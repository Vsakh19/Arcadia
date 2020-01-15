import React, { Component } from "react";
import {Route, BrowserRouter} from "react-router-dom";
import Login from "./Login";
import Notes from "./Notes";
import Nav from "./Nav";
import NewNote from "./NewNote";
import '../styles/App.css';
import Register from "./Register";


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
        this.setState({
            isLogged: current
        })
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
                    <h1 className="header__title">Simple Notification App</h1>
                </header>
                <main className="main">
                    <nav className="nav">
                        <Nav changeState = {this.changeState} isLogged = {this.state.isLogged}/>
                    </nav>
                    <section className="dynamic-content">
                        <Route path = "/" component = {()=>null}/>
                        <Route path = "/login" component = {()=>(<Login isLogged = {this.state.isLogged} changeState = {this.changeState} changeUser = {this.changeUser}/>)}/>
                        <Route path = "/register" component = {()=>(<Register changeState = {this.changeState} changeUser = {this.changeUser} isLogged = {this.state.isLogged}/>)}/>
                        <Route path = "/notes" component = {Notes}/>
                        <Route path="/addNote" component={()=>(<NewNote user = {this.state.user} isLogged = {this.state.isLogged}/>)}/>
                    </section>
                </main>
                <footer className="footer">
                    <div className="footer__info">
                        <p>Made by Sakharov Vladislav, 2020</p>
                        <p>Git repository: <a href="https://github.com/Vsakh19/Arcadia">https://github.com/Vsakh19/Arcadia</a></p>
                    </div>
                </footer>
            </BrowserRouter>
        );
    }
}

export default App;