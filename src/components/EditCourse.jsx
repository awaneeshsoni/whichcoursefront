import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditCourse = () => {
  const { slug } = useParams(); // Get course slug from URL
  const navigate = useNavigate(); // Navigate programmatically
  const [course, setCourse] = useState(null); // Store course data
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [newProfessor, setNewProfessor] = useState(""); // Store new professor name
  const [showAddProfessorModal, setShowAddProfessorModal] = useState(false);
  const [ratings, setRatings] = useState({
    attendance: "",
    difficulty: "",
    grading: "",
    overall: "",
  });

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${slug}`);
        setCourse(response.data);
        if (response.data.professors.length > 0) {
          setSelectedProfessor(response.data.professors[0].slug);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourse();
  }, [slug]);

  // Handle rating changes
  const handleRatingsChange = (e) => {
    const { name, value } = e.target;
    const numberValue = value.trim();
    
    // Check if the input is a valid whole number between 1 and 10
    if (numberValue === "" || /^\d+$/.test(numberValue)) {
      const parsedValue = parseInt(numberValue, 10);

      if (parsedValue < 1 || parsedValue > 10) {
        alert("Please enter a number between 1 and 10.");
        return;
      }

    setRatings((prev) => ({ ...prev, [name]: value }));}
    else {
      alert("Only numbers are allowed.");
    }
  };

  const handleKeyPress = (e) => {
    // Only allow numeric input (1-9, 0)
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  // Submit ratings
  const submitRating = async () => {
    try {
      await api.put(`/courses/${slug}`, {
        slug,
        profSlug: selectedProfessor,
        attendance: ratings.attendance,
        grading: ratings.grading,
        difficulty: ratings.difficulty,
        overall: ratings.overall,
      });
      alert("Ratings submitted successfully!");
      navigate(`/courses/${slug}`);
    } catch (error) {
      console.error("Error submitting ratings:", error);
    }
  };

  // Add a new professor
  const addProfessor = async () => {
    try {
      // Send POST request to add professor to the course
      await api.post(`/courses/${slug}`, { name: newProfessor });

      // Close modal after adding professor
      setShowAddProfessorModal(false);
      
      // Refresh course data with the new professor
      const response = await api.get(`/courses/${slug}`);
      setCourse(response.data);
      setSelectedProfessor(response.data.professors[0].slug); // Select the first professor automatically
    } catch (error) {
      console.error("Error adding professor:", error);
    }
  };

  return (
    <div>
      {course ? (
        <>
          <h2>Edit Course: {course.name}</h2>
          <p>Code: {course.slug}</p>

          {/* Dropdown for professors */}
          <div>
          <label htmlFor="professor-select">Select Professor: </label>
          <select
            value={selectedProfessor}
            onChange={(e) => setSelectedProfessor(e.target.value)}
            >
            {course.professors.map((prof) => (
              <option key={prof.slug} value={prof.slug}>
                {prof.name}
              </option>
            ))}
          </select>

          {/* Button to open Add Professor modal */}
          <button onClick={() => setShowAddProfessorModal(true)}>
            Add Professor
          </button>
            </div>

          {/* Add Professor Modal */}
          {showAddProfessorModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Add a New Professor</h3>
                <input
                  type="text"
                  placeholder="Professor Name"
                  value={newProfessor}
                  onChange={(e) =>
                    setNewProfessor(
                      e.target.value.toLowerCase().replace(/[^a-z]/g, "")
                    )
                  }
                />
                <button onClick={addProfessor}>Add Professor</button>
                <button onClick={() => setShowAddProfessorModal(false)}>
                  Cancel
                </button>
              </div>
            </div>)}

          {/* Ratings input */}
          <h3>Add Ratings for {selectedProfessor}</h3>
          <input
            type="number"
            placeholder="Attendance (1-10)"
            name="attendance"
            value={ratings.attendance}
            onChange={handleRatingsChange}
        onKeyPress={handleKeyPress}
          />
          <input
            type="number"
            placeholder="Course Difficulty (1-10)"
            name="difficulty"
            value={ratings.difficulty}
            onChange={handleRatingsChange}
        onKeyPress={handleKeyPress}
          />
          <input
            type="number"
            placeholder="Grading (1-10)"
            name="grading"
            value={ratings.grading}
            onChange={handleRatingsChange}
        onKeyPress={handleKeyPress}
          />
          <input
            type="number"
            placeholder="Overall (1-10)"
            name="overall"
            value={ratings.overall}
            onChange={handleRatingsChange}
        onKeyPress={handleKeyPress}
          />
          <button onClick={submitRating}>Submit Ratings</button>
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default EditCourse;
