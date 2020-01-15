import React, {Component} from "react";
import {withRouter} from "react-router";
import {NavLink} from "react-router-dom";

class NewNote extends Component{
    constructor(props) {
        super(props);
        this.state={
            text: null,
            date: null,
            success: null
        };
        this.textChange = this.textChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.sendNote = this.sendNote.bind(this);

    }

    textChange(event){
        this.setState({
            text: event.target.value,
            date: this.state.date,
            success: this.state.success
        });
    }

    dateChange(event){
        this.setState({
            text: this.state.text,
            date: event.target.value,
            success: this.state.success
        })
    }

    sendNote(){
        fetch("http://localhost:3000/notes/addServerNotes", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                author: this.props.user,
                text: this.state.text,
                date: this.state.date
            })
        })
            .then(res=>res.json)
            .then(data=>{
                if(data.message){
                    this.setState({
                        text: this.state.text,
                        date: this.state.date,
                        success: false
                    })
                }
            })
    }

    render() {
        if(this.state.success === null) {
            return (<div>
                <form className="form newNote" name="newNote">
                    <label className="form-label">Добавить заметку</label>
                    <input type="text" name="text" placeholder="Text" onChange={this.textChange} required/>
                    <input type="date" name="date" placeholder="Date" onChange={this.dateChange}
                           required/>
                    <button type="submit" name="submit" onClick={this.sendNote}>Сохранить</button>
                </form>
                <NavLink to="/">На Главную</NavLink>
            </div>)
        }
        else if(this.state.success === true){
            this.props.history.push("/");
            return null
        }
        else {
            return <h2 className="onError">Ошибка бд</h2>
        }
    }
}

export default withRouter(NewNote)