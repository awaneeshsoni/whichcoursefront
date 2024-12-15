import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      {course.professors.map((prof) => (
        <div key={prof.slug}>
          <p>Professor: {prof.name}</p>
          <p>Overall Rating: {prof.ratings.overall}</p>
        </div>
      ))}
      <br></br>
      <Link to={`/courses/${course.slug}`}>View Details</Link>
    </div>
  );
};

export default CourseCard;
