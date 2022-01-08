import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Spinner from './Spinner';
import '../App.css'

const Signup = (props) => {
    const [loading, setLoading] = useState(false);
    const port = "https://aqueous-refuge-26214.herokuapp.com/"
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleonSubmit = async (e) => {

        e.preventDefault();
        setLoading(true)
        console.log(" 15 line Before the fectcj in Signup");
        try {
        
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
                setLoading(false)
                navigate('/login')
                props.showalert("Account Created Successfully", "success")
            }
            else {
                setLoading(false)
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
            {loading && <Spinner />}  
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
                    <label htmlFor="cpassword" className="form-label">Re-Enter Your Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onchange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
                <br />
                <br />
                <h3> Already Have an account? <Link to="/login" id="sli">Log in</Link></h3>
            </form>

        </div>
    )
}

export default Signup
