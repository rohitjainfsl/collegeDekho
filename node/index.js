import express from "express";
import data from "./data.js";
// import fs from "fs";

const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  res.status(200).send(data);
});

app.post("/users/add", (req, res) => {
  //   console.log(req.body);
  let dataToAdd = req.body;
  dataToAdd = { id: data.length + 1, ...dataToAdd };
  data.push(dataToAdd);
  //   fs.appendFile("./data.js", JSON.stringify(dataToAdd), (err) => {
  //     if (err) console.log(err);
  //   });
  res.json(data);
});

app.put("/users/edit/:id", (req, res) => {
  let { id } = req.params;

  const regex = /^[0-9]+$/;

  if (!regex.test(id))
    res.status(400).json({ message: "ID has to be a number" });

  const dataToEdit = data.find((obj) => obj.id === Number(id));
  console.log(id, dataToEdit);
  if (!dataToEdit) {
    res.status(404).json({ message: "User not found" });
  } else {
    const newData = data.map((obj) => {
      return obj.id === Number(id) ? { ...req.body } : obj;
    });
    res.json(newData);
  }
});

app.delete("/users/delete/:id", (req, res) => {
  let { id } = req.params;
  const regex = /^[0-9]+$/;
  if (!regex.test(id))
    res.status(400).json({ message: "ID has to be a number" });

  const dataToEdit = data.find((obj) => obj.id === Number(id));
  if (!dataToEdit) {
    res.status(404).json({ message: "User not found" });
  } else {
    const updatedData = data.filter((obj) => obj.id !== Number(id));
    res.json(updatedData);
  }
});

app.listen(5000, () => console.log("Server started at port 5000"));
