import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css"
import axios from "axios";

const API = import.meta.env.VITE_API_URL


const CourseDetail = () => {
  const { slug } = useParams();
  console.log(slug)
  const [course, setCourse] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [loading, setLoading]  = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axios.get(`${API}/courses/${slug}`);
      setCourse(response.data);
      setLoading(false);
      if (response.data.professors.length > 0) {
        setSelectedProfessor(response.data.professors[0]);
      }
    };
    fetchCourse();
  }, [slug]);

  return (
    <div>
      {loading && <div className="loader" ></div>}
      {course && (
        <>
          <h2>{course.name}</h2>
          <p>Slug: {course.slug}</p>
          <label>Professor: </label>
          <select
            onChange={(e) =>
              setSelectedProfessor(
                course.professors.find((prof) => prof.slug === e.target.value)
              )
            }
          >
            {course.professors.map((prof) => (
              <option key={prof.slug} value={prof.slug}>
                {prof.name}
              </option>
            ))}
          </select>

          {selectedProfessor && (
            <div>
              <p>Attendace: {selectedProfessor.ratings.attendance}</p>
              <p>Grading: {selectedProfessor.ratings.grading}</p>
              <p>Course Difficulty: {selectedProfessor.ratings.difficulty}</p>
              <p>Overall Rating: {selectedProfessor.ratings.overall}</p>
              <p>Total Entries: {selectedProfessor.ratings.entries}</p>
            </div>
          )}

          <Link to={`/edit/${course.slug}`}>Add Rating/Professors</Link>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
