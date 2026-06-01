import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./leaderboard.css";

function Home() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    country: "",
    score: "",
  });
  const [leaderboard, setLeaderboard] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, id: leaderboard.length + 1, [name]: value });

    // if (e.target.name === "fname") {
    //   setData({ ...data, fname: e.target.value });
    // } else if (e.target.name === "lname") {
    //   setData({ ...data, lname: e.target.value });
    // } else if (e.target.name === "country") {
    //   setData({ ...data, country: e.target.value });
    // } else if (e.target.name === "score") {
    //   setData({ ...data, score: e.target.value });
    // }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLeaderboard([...leaderboard, data].sort((a, b) => b.score - a.score));
  }
  console.log(leaderboard);

  return (
    <>
      <header>
        <h1>Leaderboard in react</h1>
      </header>
      <main>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter First Name"
            name="fname"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            name="lname"
            onChange={handleChange}
          />
          <select name="country" id="" onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="india">India</option>
            <option value="australia">Australia</option>
            <option value="pakistan">Pakistan</option>
            <option value="south africa">South Africa</option>
            <option value="new zealand">New Zealand</option>
          </select>
          <input
            type="number"
            placeholder="Enter Score"
            name="score"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>

        <div id="leaderboard">
          {leaderboard.map((obj) => {
            return (
              <div key={obj.id} className="player">
                <p>{obj.fname + " " + obj.lname}</p>
                <p>{obj.country}</p>
                <p>{obj.score}</p>
                <p className="controls">
                  <FaTrash title="Delete this record" />
                  <span className="increment"> +5 </span>
                  <span className="decrement"> -5 </span>
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Home;
