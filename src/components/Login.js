import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Login = () => {
     const [credensials, setCredensials] = useState({email:"",password:""})
     let history=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credensials.email ,password:credensials.password}), 
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            history('/');
          }else{
            alert("invalid email password")
          }
          
    }
    const onChange=(e)=>{
        setCredensials({...credensials,[e.target.name]:e.target.value})
      }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label forindex="email" className="form-label">Email address</label>
        <input type="email" className="form-control " name='email' id="email" aria-describedby="emailHelp" value={credensials.email} onChange={onChange}/>
        </div>
        <div className="mb-3">
        <label forindex="password" className="form-label">Password</label>
        <input type="password" name="password" className="form-control" id="password" value={credensials.password} onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
  </div>
  )
}

export default Login