import { useState } from 'react'
import './App.css'

function App() {

  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const [register, setRegister] = useState({
    username: '',
    password: ''
  })


  const handleLogin = (e) => {
    console.log("login", e.target.value)
    setLogin({ ...login, [e.target.id]: e.target.value })
  }

  const handleLoginSubmit = () => {
    console.log(login)
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: login
    })
      .then(res => console.log("res", res.data))
      .catch(error => console.log(error))
  }

  const handleRegister = (e) => {
    console.log("reg", register)
    setRegister({ ...register, [e.target.id]: e.target.value })
  }

  const handleRegisterSubmit = (e) => {
    console.log("reg", register)
    axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: register
    })
      .then(res => console.log("res", res.data))
      .catch(error => console.log(error))
  }


  return (
    <>
      <div id='login'>

        {console.log("login", login)} 
        {console.log("Reg", register)} 
        <h1>Login</h1>

        <input id='username' onChange={(e) => handleLogin(e)} type='text' placeholder='Username' />
        <br />
        <br />
        <input id="password" onChange={(e) => handleLogin(e)} type='text' placeholder='Password' />
        <br />
        <br />
        <button onClick={() => handleLogin()}>Login</button>

      </div>

      <br />
      <br />

<hr /> 
<br />
<br />


      <div id='register'>
        <h1>Register</h1>

        <input id='username' onChange={(e) => handleRegister(e)} type='text' placeholder='Username' />
        <br />
        <br />
        <input id='password' onChange={(e) => handleRegister(e)} type='text' placeholder='Password' />
        <br />
        <br />
        <button onClick={() => handleRegister()}>Register</button>
        <br />
      </div>

    </>
  )
}

export default App
