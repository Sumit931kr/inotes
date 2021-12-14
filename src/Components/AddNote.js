import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleonClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" })
        props.showalert(" Note Added  Suceessfully", "success") 
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <div className="container">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label my-3">Title</label>
                        <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp"  onChange={onchange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" onChange={onchange} value={note.description} id="description" name="description" minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" onChange={onchange} value={note.tag} id="tag" name="tag" minLength={3} required />
                    </div>
                   
                    <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleonClick}>Add Note</button>
                </form>

            </div>
        </div>
    )
}

export default AddNote
