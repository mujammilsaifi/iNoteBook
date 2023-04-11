import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Signup = (props) => {
    const [credensials, setCredensials] = useState({name:"" ,email:"",password:""})
    let redirection=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credensials.name, email:credensials.email ,password:credensials.password}), 
          });
          const json=await response.json()
          console.log(json)
        if(json.success){
            // redirect
          redirection('/');
          props.showAlert("Account has been Created Successfully","success")

        }else{
            redirection('/signup');
            props.showAlert("Try angain different email","warning")

        }
    }
    const onChange=(e)=>{
        setCredensials({...credensials,[e.target.name]:e.target.value})
      }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <h2>Signup to continue use iNotebook</h2>
        <label forindex="name" className="form-label">Name</label>
        <input type="text" className="form-control " name='name' id="name" aria-describedby="emailHelp" value={credensials.name} onChange={onChange}  minLength={5} required/>
        </div>
        <div className="mb-3">
        <label forindex="email" className="form-label">Email address</label>
        <input type="email" className="form-control " name='email' id="email" aria-describedby="emailHelp" value={credensials.email} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
        <label forindex="password" className="form-label">Password</label>
        <input type="password" name="password" className="form-control" id="password" value={credensials.password} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
        <label forindex="cpassword" className="form-label">Confirm Password</label>
        <input type="password" name="cpassword" className="form-control" id="cpassword" value={credensials.cpassword} onChange={onChange} minLength={5} required/>
        </div>
        
        
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Signup