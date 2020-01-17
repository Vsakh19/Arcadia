import React, {Component} from "react";
import {withRouter} from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {scheduleJob} from "node-schedule";
import img from "../images/logo.png"

class NewNote extends Component{
    constructor(props) {
        super(props);
        this.state={
            text: null,
            date: new Date(),
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

    dateChange(val){
        this.setState({
            text: this.state.text,
            date: val,
            success: this.state.success
        })
    }

    sendNote(event){
        event.preventDefault();
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
            .then(res=> {
                return res.json
            })
            .then(data=>{
                if(data.message){
                    this.setState({
                        text: this.state.text,
                        date: this.state.date,
                        success: false
                    })
                }
                else {
                    if (!("Notification" in window)) {
                        alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
                    }
                    else if (Notification.permission === "granted") {
                        const notif = scheduleJob(this.state.date, ()=>{
                            const info = new Notification("Не забудь!", {body: this.state.text});
                        });
                    }
                    else if (Notification.permission !== 'denied') {
                        Notification.requestPermission()
                            .then((res)=>{
                                if(res === "granted"){
                                    scheduleJob(this.state.date, ()=>{
                                        const info = new Notification("Не забудь!", {body: this.state.text, icon: img});
                                    });
                                }
                            })
                    }

                }
                this.setState({
                    text: this.state.text,
                    date: this.state.date,
                    success: true
                });
            })
            .catch(err=>{
                console.log(err);
            })
    }

    render() {
        if(this.state.success === null) {
            return (<div className="form-container">
                <form className="form" name="newNote">
                    <label className="form__label">Новая заметка</label>
                    <input className="form__input" maxLength="100" type="text" name="text" placeholder="Text" onChange={this.textChange} required/>
                    <DatePicker className="form__input" selected={this.state.date}
                                onChange={date => this.dateChange(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"/>
                    <button className="form__button" type="submit" name="submit" onClick={this.sendNote}>Сохранить</button>
                </form>
            </div>)
        }
        else if(this.state.success === true){
            this.props.history.push("/showNotes");
            return null
        }
        else {
            return <h2 className="dynamic-content__onError">Ошибка бд</h2>
        }
    }
}

export default withRouter(NewNote)