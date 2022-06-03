// import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  // const host = "https://aqueous-refuge-26214.herokuapp.com/"
  const host = "http://localhost:4000/"
  const notesinitial = []

  const [notes, setnotes] = useState(notesinitial)



  //////////////// // Get ALL Notes  ////////////////

  const getNotes = async () => {

    // APi CAll to GEt ALl the Notes

    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

    });
    const json = await response.json();
    setnotes(json)

  }


  //////////////// // ADD a Note  ////////////////

  const addnote = async (title, description, tag) => {

    // APi CAll to Addinga Note

    const response = await fetch(`${host}api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setnotes(notes.concat(note))
  }


  //////////////// // Delete a Note  ////////////////


  const deletenote = async (id) => {

    // API call to Delete Note
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

    });

    // eslint-disable-next-line
    const json = await response.json();

    // Delete in Front end
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)

  }


  ////////////////////////// Edit a Note  //////////////////////////

  const editnote = async (id, title, description, tag) => {

    // APi Call to Edit a Note

    try {


      try {
        // eslint-disable-next-line
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },

          body: JSON.stringify({ title, description, tag })
        });

      } catch (error) {
        console.log("Error n Notestate");
        console.error(error);

      }


      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to Edit in Client

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;

          break;
        }
      }
      setnotes(newNotes);

    } catch (error) {
      console.log("Error happend here at editnote function in Notestate");
      console.error(error);
    }

  }


  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;
