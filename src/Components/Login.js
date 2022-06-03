import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import Spinner from './Spinner';
import '../App.css'

const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const port = "https://aqueous-refuge-26214.herokuapp.com/"
    // const port = "http://localhost:4000/"
    // // const port = "https://aqueous-refuge-26214.herokuapp.com"
    const mask = document.getElementById("mask");
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleonSubmit = async (e) => {

        e.preventDefault();
        setLoading(true)
        mask.style.display = "block";
        // console.log(loading);
        try {
            // Fetching is To do in this is Context API

            const response = await fetch(`${port}api/auth/loginUser`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ email: credentials.email, password: credentials.password })

            });
            const json = await response.json();
           
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                props.showalert("Logged in Successfully", "success")
                // redirect
                setLoading(false)
                navigate('/inotes')
                mask.style.display = "none";
            }
            else {
                setLoading(false)
                props.showalert("Invalid Credentials ", "danger")
                mask.style.display = "none";
            }


        } catch (error) {
            console.log(error);
            console.log("27 line error")
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    
    const googleSuccess = async (res) => {
        const result = await res?.profileObj;
        // const token = await res?.tokenId;
        const googleData = ({ email: result?.email })
   
        try {
          
            const response = await fetch(`${port}api/auth/googlelogin`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ ...googleData })

            });
           
            const json = await response.json();

            if (json.success) {
                // redirect
                localStorage.setItem('token', json.authtoken);
                setLoading(false)
                navigate('/inotes')
                props.showalert("Gmail Login Successfully", "success");
                mask.style.display = "none";
            }
            else {
                setLoading(false)
                props.showalert("Gmail not registered, Try Signup", "danger")
                mask.style.display = "none";
            }



        } catch (error) {
            console.log("Google Login mai error hai  " + error + error.message)
        }


    };



    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    return (
        <div >
            <h1>Login to Continue To iNoteBook</h1>
            <div id="mask"></div>
            <form onSubmit={handleonSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter Your Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name="email" id="email" onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Your Password</label>
                    <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onchange} />
                </div>

                {loading ?
                    <button  type="submit" className="btn btn-primary" > Loading  {loading && <Spinner />}   </button> :
                    <button disabled={!(credentials.email.length >4 || credentials.password.length >4)} type="submit" className="btn btn-primary" > Submit </button>}
                <GoogleLogin
                    clientId="1035790105407-ndv1h019hnbb91c49q4jgakb5q1ffe12.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button type="googlesubmit" onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-primary mx-4" > <strong>G</strong> Gooogle Login {loading && <Spinner />}   </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                />                <br />
                <br />

                <h3>Don't have an account? <Link to="/signup" id="lsu"> Sign up</Link></h3>
            </form>
        </div>
    )
}

export default Login
