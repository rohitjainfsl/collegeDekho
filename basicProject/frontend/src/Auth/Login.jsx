import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setIsLoggedIn } = useAuth();
  function handlechange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.statusText === "OK") {
        setIsLoggedIn(true);
        navigate("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Invalid Credentials!");
      setIsLoggedIn(false);
    }

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
