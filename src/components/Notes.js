import React, { Component } from "react";
import {NavLink} from "react-router-dom";

class Notes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3000/notes/getServerNotes", {
            method: 'GET',
            headers:{
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                if(data.message){
                    Promise.reject(new Error(data.message))
                        .catch(err=>{
                            this.setState({
                                isLoaded: true,
                                error: err
                            });
                    })
                }
                this.setState({
                    isLoaded: true,
                    items: data
                });
            })
            .catch(err=>{
                this.setState({
                    isLoaded: true,
                    error: err.message
                });
            })
    }

    deleteHandler(event){
        const note = event.target.name;
        fetch("http://localhost:3000/notes/deleteServerNotes",{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: note
            })
        })
            .then(()=>{
                for (let i=0; i<this.state.items.length; i+=1){
                    if (this.state.items[i]._id === note){
                        this.state.items.splice(i,1);
                        this.setState({
                            error: this.state.error,
                            isLoaded: this.state.isLoaded,
                            items: this.state.items
                        })
                    }
                }
            })
            .catch((err)=>{
                alert("Произошла ошибка: "+err.message);
            });
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if(error){
            return (
                <h2 className="dynamic-content__onError">{error}</h2>
            )
        }
        else if(!isLoaded){
            return (
                <h2>Загрузка...</h2>
            )
        }
        if(items.length>0){
            return (
                <div className="notes">
                    <div className="note-grid">
                    {
                        items.map(item=>{
                           return  (<div key={item._id} className="note-card">
                               <p className="note-card__line">{item.text}</p>
                               <p className="note-card__line">{(new Date(item.reminder.toString())).toString().slice(4, new Date(item.reminder.toString()).toString().indexOf("GMT")-1)}</p>
                               <button className="note-card__button" onClick={this.deleteHandler} name={item._id}>X</button>
                            </div>)
                        })
                    }
                    </div>
                    <NavLink className="notes__link" to="/addNote">Добавить заметку</NavLink>
                </div>
        )}
        else {
            return (
                <div>
                    <h2 className="dynamic-content__onError">У вас пока нет заметок</h2>
                    <NavLink to="/addNote">Добавить заметку</NavLink>
                </div>)
        }
    }
}

export default Notes;