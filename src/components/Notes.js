import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";


function Notes(props){
    const [error, setError] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(()=>{
        fetch("http://notifymethings.tk/notes/getServerNotes", {
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
                            setLoaded(true);
                            setError(err);
                    })
                }
                setLoaded(true);
                setItems(data);
            })
            .catch(err=>{
                setLoaded(true);
                setError(err.message);
            })
    }, []);

    function deleteHandler(event){
        const note = event.target.name;
        fetch("http://notifymethings.tk/notes/deleteServerNotes",{
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
                for (let i=0; i<items.length; i+=1){
                    if (items[i]._id === note){
                        items.splice(i,1);
                        setItems(items);
                    }
                }
                const info = new Notification("Заметка успешно удалена!");
                props.history.push("/showNotes");
            })
            .catch((err)=>{
                alert("Произошла ошибка: "+err.message);
            });
    }

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
                           <button className="note-card__button" onClick={deleteHandler} name={item._id}>X</button>
                        </div>)
                    })
                }
                </div>
                <NavLink className="notes__link" to="/addNote">Добавить заметку</NavLink>
            </div>
    )}
    else {
        return (
            <div className="notes">
                <h2>У вас пока нет заметок</h2>
                <NavLink className="notes__link" to="/addNote">Добавить заметку</NavLink>
            </div>)
    }
}

export default withRouter(Notes);