import React, {useState} from "react";
import {withRouter} from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {scheduleJob} from "node-schedule";
import img from "../images/logo.png"

function NewNote(props){
    const [text, setText] = useState(null);
    const [date, setDate] = useState(new Date());
    const [success, setSuccess] = useState(null);

    function textChange(event){
        setText(event.target.value);
    }


    function sendNote(event){
        event.preventDefault();
        fetch("http://localhost:3000/notes/addServerNotes", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                author: props.user,
                text: text,
                date: date
            })
        })
            .then(res=> {
                return res.json
            })
            .then(data=>{
                if(data.message){
                    setSuccess(false);
                }
                else {
                    if (!("Notification" in window)) {
                        alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
                    }
                    else if (Notification.permission === "granted") {
                        const notif = scheduleJob(date, ()=>{
                            const info = new Notification("Не забудь!", {body: text});
                        });
                    }
                    else if (Notification.permission !== 'denied') {
                        Notification.requestPermission()
                            .then((res)=>{
                                if(res === "granted"){
                                    scheduleJob(this.state.date, ()=>{
                                        const info = new Notification("Не забудь!", {body: text, icon: img});
                                    });
                                }
                            })
                    }

                }
                setSuccess(true);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    if(success === null) {
        return (<div className="form-container">
            <form className="form" name="newNote">
                <label className="form__label">Новая заметка</label>
                <div className="form__input-container">
                <textarea className="form__input form__textarea" maxLength="100" name="text" placeholder="Текст заметки" onChange={textChange} required/>
                <DatePicker className="form__input" selected={date}
                            onChange={date => setDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"/>
                </div>
                <button className="form__button" type="submit" name="submit" onClick={sendNote}>Сохранить</button>
            </form>
        </div>)
    }
    else if(success === true){
        props.history.push("/showNotes");
        return null
    }
    else {
        return <h2 className="dynamic-content__onError">Ошибка бд</h2>
    }
}

export default withRouter(NewNote)