import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {    
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const {setIsLoggedIn} = useAuth(); 
  const navigate = useNavigate();

  function handlechange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault() 
    try {
      const response = await axios.post("http://localhost:4000/auth/login",{
        email:form.email,
        password:form.password
      },{withCredentials:true})
      console.log(response)
      if(response.statusText === "OK" && response.status === 200){
        setIsLoggedIn(true);
        return navigate("/profile");
      }
    } catch (error) {
      console.log("Login in failed", error)
    }
  }
  return (
    <>
      <h1>Login</h1>
      <form action="" method="Post" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          placeholder="Email"
          onChange={handlechange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          placeholder="Password"
          onChange={handlechange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
