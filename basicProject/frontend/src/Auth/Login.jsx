import { useContext } from "react";
import { useState } from "react";
import { authContext } from "../contexts/AuthContext";

function Login() {    
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const {setIsLoggedIn} = useContext(authContext); 
  function handlechange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem("formdata"));
    userData.map((user) => {
      if (user.email === form.email && user.password === form.password) {
        setIsLoggedIn(true);
        alert("Successfully Loggged IN");
      } else {
        alert("Invalid Credentials!");
        setIsLoggedIn(false);
      }
    });
    setForm({
      email: "",
      password: "",
    });
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
