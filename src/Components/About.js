import React from 'react'
// import noteContext from '../context/notes/noteContext'
import { Link } from "react-router-dom";
import '../App.css'

export default function About() {


  return (
    <div className="container">
      <div className="card w-75">
        <div className="card-body">
          <h3 className="card-title">Your Notes are Saves here</h3>
          <p className="card-text">Write your Notes here and and its saves with Us</p>
        </div>
      </div>

      <div className="card w-75 my-5">
        <div className="card-body">
          <h3 className="card-title">You can Contact Us</h3>
          <div> <a href="mailto:sumit280601@gmail.com"><i className="far fa-envelope fa-3x mx-3"></i> </a>
            <a href="https://www.linkedin.com/in/sumit-kumar-03b99a210/" target="_blank"><i className="fab fa-linkedin fa-3x"></i> </a> </div>
        </div>
      </div>

      {!localStorage.getItem('token') ? <form className=" d-flex justify-content-between ">
        <Link className="btn btn-primary mx-2 mt-auto p-2 bd-highlight" id="ll" to="/login" role="submit">Login</Link>
        <Link className="btn btn-primary mx-2 align-self-end" id="rs" to="/signup" role="submit">SignUp</Link>
      </form> : " "}
    </div>
  )
}

