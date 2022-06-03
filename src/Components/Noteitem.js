import React, { useContext } from 'react'
import '../App.css'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const { note, updatenote } = props;



    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body box">
                    <div className="d-flex align-items-center" id='centerp'>
                        <h5 className="card-title" >  {note.title}</h5>
                        <div id='center'>
                        <i className="fas fa-trash-alt mx-2 my-2" onClick={() => {
                            deletenote(note._id);
                            props.showalert("Note Deleted Suceessfully", "success")
                        }}></i>
                        <i className="fas fa-edit mx-2 my-2 " onClick={() => { updatenote(note) }} ></i>
                        </div>
                    </div>
                    <p className="card-text">   {note.description} </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
