import React, { useState } from "react";
import axios from "axios";

export default function Book_Form() {
  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "Hard Copy", // Default value
    Topic: "Computer Science", // Default value
    PubYear: 2000, // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate before submission
    if (
      !state.booktitle ||
      !state.author ||
      !state.formate ||
      !state.Topic ||
      !state.PubYear
    ) {
      alert("Please fill out all the fields!");
      return;
    }

    const bookData = {
      booktitle: state.booktitle,
      author: state.author,
      formate: state.formate,
      Topic: state.Topic,
      PubYear: parseInt(state.PubYear),
    };

    axios
      .post("http://localhost:5000/addbook", bookData)
      .then((res) => {
        alert("Book added successfully!");
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error adding book:", err);
        alert("Error occurred while adding the book. Please check the input fields.");
      });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Add Book</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Book Title:</label>
          <input
            type="text"
            name="booktitle"
            className="form-control"
            value={state.booktitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={state.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Pick Book Topic:</label>
          <select
            name="Topic"
            className="form-control"
            value={state.Topic}
            onChange={handleChange}
            required
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Programming">Programming</option>
            <option value="Data Science">Data Science</option>
            <option value="AI">AI</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>
        <div className="form-group">
          <label>Format:</label>
          <div className="form-check">
            <input
              type="radio"
              name="formate"
              value="Hard Copy"
              checked={state.formate === "Hard Copy"}
              onChange={handleChange}
            />
            <label className="form-check-label">Hard Copy</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="formate"
              value="Electronic Copy"
              checked={state.formate === "Electronic Copy"}
              onChange={handleChange}
            />
            <label className="form-check-label">Electronic Copy</label>
          </div>
        </div>
        <div className="form-group">
          <label>Publication Year:</label>
          <input
            type="number"
            name="PubYear"
            min="1980"
            max="2025"
            className="form-control"
            value={state.PubYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <center>
            <input type="submit" value="Add Book" className="btn btn-primary" />
          </center>
        </div>
      </form>
    </div>
  );
}
