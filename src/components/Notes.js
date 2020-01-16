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
                <h2 className="onError">{error}</h2>
            )
        }
        else if(!isLoaded){
            return (
                <h2>Загрузка...</h2>
            )
        }
        if(items.length>0){
            return (
                <div>
                    {
                        items.map(item=>{
                           return  (<div key={item._id}>
                               <p>{item.author}</p>
                               <p>{item.text}</p>
                               <p>{(new Date(item.reminder.toString())).toString()}</p>
                               <button onClick={this.deleteHandler} name={item._id}>Удалить</button>
                            </div>)
                        })
                    }
                    <NavLink to="/addNote">Добавить заметку</NavLink>
                </div>
        )}
        else {
            return (
                <div>
                    <h2 className="onError">У вас пока нет заметок</h2>
                    <NavLink to="/addNote">Добавить заметку</NavLink>
                </div>)
        }
    }
}

export default Notes;