import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const port = "https://aqueous-refuge-26214.herokuapp.com/"
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleonSubmit = async (e) => {

        e.preventDefault();

        try {
            // Fetching is To do in this is Context API

            const { name, email, password } = credentials;
            const response = await fetch(`${port}api/auth/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ name, email, password })

            });
            const json = await response.json();
            // console.log(json);
            if (json.success) {
                // redirect
                // localStorage.setItem('token', json.authtoken);
                navigate('/login')
                props.showalert("Account Created Successfully", "success")
            }
            else {
                props.showalert("Invalid Details", "danger")
            }


        } catch (error) {
            console.log(error);
            console.log("43 line error")
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container mt-3 my-2">
            <h1>Create a New Account </h1>
            <form onSubmit={handleonSubmit}  >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter Your Email address</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Your Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Enter Your Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onchange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>
    )
}

export default Signup
