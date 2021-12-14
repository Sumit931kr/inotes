import React, { useContext, useEffect, useRef, useState, } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {

    const navigate = useNavigate();

    const { showalert } = props
    const context = useContext(noteContext);
    const { notes, getNotes, editnote } = context;

useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
        navigate('/login')
    }
    // eslint-disable-next-line
}, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    const updatenote = (currentnote) => {
        ref.current.click();

        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })

    }

    const handleonClick = (e) => {

        editnote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click();
        props.showalert("Updated Suceessfully", "success")
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote showalert={showalert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label my-3">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" onChange={onchange} id="edescription" value={note.edescription} name="edescription" minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" onChange={onchange} id="etag" value={note.etag} name="etag" minLength={3} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleonClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-3">
                    {notes.length === 0 && 'No notes to Display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem showalert={showalert} key={note._id} updatenote={updatenote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
