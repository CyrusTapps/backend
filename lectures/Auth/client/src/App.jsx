import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [register, setRegister] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    console.log("login", e.target.value);
    setLogin((prev) => {
      console.log("prev", prev);
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  const handleLoginSubmit = () => {
    console.log(login);
    axios({
      method: "post",
      url: "http://localhost:3000/login",
      data: login,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res", res.data);

        if (res.data.message === "good login") {
          alert(`Welcome back : ${res.data.found.username}`);
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          alert(
            "Unable to connect to server. Please check if the server is running."
          );
        } else {
          alert(
            `Login failed: ${error.response?.data?.message || "Unknown error"}`
          );
        }
      });
  };
  const handleRegister = (e) => {
    console.log("reg", register);
    setRegister((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleRegisterSubmit = () => {
    console.log("reg", register);
    axios({
      method: "post",
      url: "http://localhost:3000/register",
      data: register,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res", res.data);
        alert("Registration successful!");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          alert(
            "Unable to connect to server. Please check if the server is running."
          );
        } else {
          alert(
            `Registration failed: ${
              error.response?.data?.message || "Unknown error"
            }`
          );
        }
      });
  };
  return (
    <>
      <div id="login">
        {console.log("login", login)}
        {console.log("Reg", register)}
        <h1>Login</h1>
        <input
          id="username"
          onChange={(e) => handleLogin(e)}
          type="text"
          placeholder="Username"
        />
        <br />
        <br />
        <input
          id="password"
          onChange={(e) => handleLogin(e)}
          type="text"
          placeholder="Password"
        />
        <br />
        <br />
        <button onClick={() => handleLoginSubmit()}>Login</button>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <div id="register">
        <h1>Register</h1>
        <input
          id="username"
          onChange={(e) => handleRegister(e)}
          type="text"
          placeholder="Username"
        />
        <br />
        <br />
        <input
          id="password"
          onChange={(e) => handleRegister(e)}
          type="text"
          placeholder="Password"
        />
        <br />
        <br />
        <button onClick={() => handleRegisterSubmit()}>Register</button>
        <br />
      </div>
    </>
  );
}
export default App;
