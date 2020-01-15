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
            })
    }


    signout(){
        localStorage.removeItem("token");
        this.changelogHandler(false);
        this.props.history.push("/");
    }

    render() {
        if (this.props.isLogged === false) {
            return (<div>
                <NavLink className="nav__link" to="/login">Sign in</NavLink>
                <NavLink className="nav__link" to="/register" >Sign up</NavLink>
            </div>)
        }
        else if (this.props.isLogged === true){
            return (<div>
                <NavLink className="nav__link" to="/notes">My notes</NavLink>
                <button className="nav__button" onClick={this.signout}>Sign out</button>
            </div>)
        }
        return null
    }
}

export default withRouter(Nav)