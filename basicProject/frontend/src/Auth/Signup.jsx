import { useState } from "react";
import { useEffect } from "react";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [arr, setArr] = useState([]);

  useEffect(() => {
    localStorage.setItem("formdata", JSON.stringify(arr));
  }, [arr]);

  
  function handlechange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setArr([...arr, form]);

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
