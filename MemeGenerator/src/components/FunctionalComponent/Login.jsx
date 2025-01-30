import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import "./Login.css";

const Login=({ setIsLoggedIn })=>{
    const navigate = useNavigate();
     const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleLogin =async (e) =>{
        e.preventDefault()
        try{
            console.log("event triggered");
            const req = await axios.post("https://memegenerator-um4l.onrender.com/login",{
              
              email:email,
              password:password
            })
            //console.log(req)
            alert(req.data.response);
            if(req.data.loginStatus){
              setIsLoggedIn(true);
              navigate("/home");
            }
            else{
              navigate("/login")
            }
          }
            catch(err){
              console.log(err);
              if (err.response) {
                alert(err.response.data.response || "An error occurred");
            } else {
                alert("Server not responding. Try again later.");
            }
            }
      }

    return(
      <div className="login-page">
      <div className="login-container">
        <form method="POST" onSubmit={handleLogin}>
          <div>
            Email: 
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            Password: 
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    )
}

export default Login