import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import "../App.css"

const CourseDetail = () => {
  const { slug } = useParams();
  console.log(slug)
  const [course, setCourse] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [loading, setLoading]  = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await api.get(`/courses/${slug}`);
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
              <h4>Professor: {selectedProfessor.name}</h4>
              <p>Attendace: {selectedProfessor.ratings.attendance}</p>
              <p>Grading: {selectedProfessor.ratings.grading}</p>
              <p>Course Difficulty: {selectedProfessor.ratings.difficulty}</p>
              <p>Overall Rating: {selectedProfessor.ratings.overall}</p>
            </div>
          )}

          <Link to={`/edit/${course.slug}`}>Edit Course</Link>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
