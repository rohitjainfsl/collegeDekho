import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
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
        "http://localhost:4000/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        setIsLoggedIn(true);
        navigate("/profile");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "Registration failed!");
    }

    setForm({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <h1>SignUp</h1>
      <form action="" method="Post" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handlechange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handlechange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handlechange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Signup;
