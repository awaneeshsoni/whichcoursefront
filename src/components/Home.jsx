import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/courses/${search}`);
      setCourse(response.data);
    } catch (error) {
      alert("Course not found! Create a new one ");
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <div className="container'">

      <input
        type="text"
        placeholder="Search for a course"
        value={search}
        onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))
        }
        />
      <button onClick={handleSearch}>Search</button>
      <Link to={"/createcourse"}>Create Course</Link>

        </div>
      {loading && <div className="loader"></div>}
      {course && (
        <div>
          <h3>Course: {course.name}</h3>
          <p>Slug: {course.slug}</p>
          <Link to={`/courses/${course.slug}`}>Show More</Link>
        </div>
      )}
    </div>
  );
}
