import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL


const CreateCourse = () => {
  const navigate = useNavigate(); // Use navigate for redirection
  const [courseName, setCourseName] = useState(""); // State for course name
  const [courseCode, setCourseCode] = useState(""); // State for course code
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false)

  // Handle changes in course name input
  const handleNameChange = (e) => {
    setCourseName(e.target.value);
  };

  // Handle changes in course code input
  const handleCodeChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""); // Convert to lowercase and remove non-alphanumeric characters
    setCourseCode(value);
  };

  // Handle form submission to create a new course
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if course code is empty or contains spaces
    if (!courseCode || /\s/.test(courseCode)) {
      setError("Course code must contain only lowercase letters and numbers without spaces.");
      return;
    }

    try {
      // Send POST request to create a new course
      setLoading(true);
      const response = await axios.post(`${API}/courses`, {
        name: courseName,
        slug: courseCode, // Use course code as the slug
      });

      // Navigate to the created course page
      
      alert("Course created successfully!");
      navigate(`/courses/${response.data.course.slug}`);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Course already exists!");
      } else {
        console.error("Error creating course:", err);
        setError("Error creating course. Please try again.");
      }
    }
    finally{
        setLoading(false)
    }
  };

  return (
    <div>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        {/* Course Name Input */}
        <div>
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={handleNameChange}
            required
          />
        </div>

        {/* Course Code Input (slug) */}
        <div>
          <label htmlFor="courseCode">Course Code (slug)</label>
          <input
            type="text"
            id="courseCode"
            value={courseCode}
            onChange={handleCodeChange}
            required
            pattern="[a-z0-9]+" // Enforce only lowercase letters and numbers
            title="Only lowercase letters and numbers allowed"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        {loading && <div className="loader" ></div>}
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
