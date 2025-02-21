import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; // Adjust path if needed, e.g., "./components/Navbar"
import Footer from "./Footer"; // Adjust path if needed, e.g., "./components/Footer"

const API = import.meta.env.VITE_API_URL;

const EditCourse = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [newProfessor, setNewProfessor] = useState("");
  const [showAddProfessorModal, setShowAddProfessorModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({
    attendance: "",
    difficulty: "",
    grading: "",
    overall: "",
  });
  const [colorTheme, setColorTheme] = useState("cyberpunk"); // Toggle between 'cyberpunk', 'pastel', 'retro'

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API}/courses/${slug}`);
        setCourse(response.data);
        if (response.data.professors.length > 0) {
          setSelectedProfessor(response.data.professors[0].slug);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  const handleRatingsChange = (e) => {
    const { name, value } = e.target;
    const numberValue = value.trim();

    if (numberValue === "" || /^\d+$/.test(numberValue)) {
      const parsedValue = numberValue === "" ? "" : parseInt(numberValue, 10);
      if (parsedValue !== "" && (parsedValue < 1 || parsedValue > 10)) {
        alert("Please enter a number between 1 and 10.");
        return;
      }
      setRatings((prev) => ({ ...prev, [name]: parsedValue }));
    } else {
      alert("Only numbers are allowed.");
    }
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const submitRating = async () => {
    if (!selectedProfessor) {
      alert("First select a prof! If none, add one.");
      return;
    }
    try {
      setLoading(true);
      await axios.put(`${API}/courses/${slug}`, {
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
    } finally {
      setLoading(false);
    }
  };

  const addProfessor = async () => {
    try {
      await axios.post(`${API}/courses/${slug}`, { name: newProfessor });
      setShowAddProfessorModal(false);
      const response = await axios.get(`${API}/courses/${slug}`);
      setCourse(response.data);
      setSelectedProfessor(response.data.professors[response.data.professors.length - 1].slug); // Select the newly added professor
      setNewProfessor(""); // Reset input
    } catch (error) {
      console.error("Error adding professor:", error);
    }
  };

  // Color Theme Configurations
  const themes = {
    cyberpunk: {
      bg: "bg-gray-900",
      inputBg: "bg-blue-900",
      inputBorder: "border-pink-500",
      inputText: "text-pink-400",
      inputPlaceholder: "placeholder-purple-500",
      inputRing: "focus:ring-pink-500",
      buttonBg: "bg-purple-600",
      buttonText: "text-blue-300",
      buttonHover: "hover:bg-purple-700",
      buttonShadow: "shadow-[0_0_10px_rgba(236,72,153,0.7)]",
      cardBg: "bg-gradient-to-br from-blue-800 to-purple-700",
      cardBorder: "border-pink-500",
      cardShadow: "shadow-[0_0_20px_rgba(236,72,153,0.5)]",
      textPrimary: "text-pink-400",
      textSecondary: "text-blue-300",
      spinner: "border-pink-500 border-t-blue-800",
      selectBg: "bg-blue-900",
      selectBorder: "border-pink-500",
      modalBg: "bg-gray-800",
      modalBorder: "border-pink-500",
    },
    pastel: {
      bg: "bg-gray-100",
      inputBg: "bg-lavender-100",
      inputBorder: "border-mint-400",
      inputText: "text-peach-600",
      inputPlaceholder: "placeholder-lavender-400",
      inputRing: "focus:ring-mint-400",
      buttonBg: "bg-peach-400",
      buttonText: "text-lavender-800",
      buttonHover: "hover:bg-peach-500",
      buttonShadow: "shadow-[0_0_10px_rgba(255,218,185,0.7)]",
      cardBg: "bg-gradient-to-br from-lavender-200 to-mint-200",
      cardBorder: "border-peach-400",
      cardShadow: "shadow-[0_0_20px_rgba(255,218,185,0.5)]",
      textPrimary: "text-peach-600",
      textSecondary: "text-mint-600",
      spinner: "border-mint-400 border-t-peach-400",
      selectBg: "bg-lavender-100",
      selectBorder: "border-mint-400",
      modalBg: "bg-gray-200",
      modalBorder: "border-mint-400",
    },
    retro: {
      bg: "bg-gray-700",
      inputBg: "bg-teal-800",
      inputBorder: "border-orange-500",
      inputText: "text-pink-400",
      inputPlaceholder: "placeholder-teal-400",
      inputRing: "focus:ring-orange-500",
      buttonBg: "bg-pink-600",
      buttonText: "text-teal-300",
      buttonHover: "hover:bg-pink-700",
      buttonShadow: "shadow-[0_0_10px_rgba(249,115,22,0.7)]",
      cardBg: "bg-gradient-to-br from-teal-700 to-pink-600",
      cardBorder: "border-orange-500",
      cardShadow: "shadow-[0_0_20px_rgba(249,115,22,0.5)]",
      textPrimary: "text-orange-500",
      textSecondary: "text-teal-300",
      spinner: "border-orange-500 border-t-teal-700",
      selectBg: "bg-teal-800",
      selectBorder: "border-orange-500",
      modalBg: "bg-gray-600",
      modalBorder: "border-orange-500",
    },
  };

  const currentTheme = themes[colorTheme];

  return (
    <div className={`flex flex-col min-h-screen ${currentTheme.bg}`}>
      <Navbar colorTheme={colorTheme} />

      <main className="flex-grow p-6">
        {/* Theme Toggle (for demo purposes, remove in final version if desired) */}
        <div className="max-w-4xl mx-auto mb-4 flex gap-4">
          <button onClick={() => setColorTheme("cyberpunk")} className="px-3 py-1 bg-blue-500 text-white rounded">
            Cyberpunk
          </button>
          <button onClick={() => setColorTheme("pastel")} className="px-3 py-1 bg-lavender-500 text-white rounded">
            Pastel
          </button>
          <button onClick={() => setColorTheme("retro")} className="px-3 py-1 bg-teal-500 text-white rounded">
            Retro
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="flex justify-center mt-6">
              <div className={`w-12 h-12 border-4 ${currentTheme.spinner} rounded-full animate-spin`}></div>
            </div>
          )}
          {course ? (
            <div className={`p-6 ${currentTheme.cardBg} ${currentTheme.cardBorder} rounded-2xl ${currentTheme.cardShadow}`}>
              <h2 className={`text-3xl font-extrabold ${currentTheme.textPrimary} uppercase mb-4`}>
                Edit Course: {course.name}
              </h2>
              <p className={`${currentTheme.textSecondary} font-mono mb-4`}>
                Code: {course.slug}
              </p>

              {/* Professor Selection */}
              <div className="flex items-center gap-4 mb-6">
                <label htmlFor="professor-select" className={`${currentTheme.textPrimary} font-bold`}>
                  Select Professor:
                </label>
                <select
                  id="professor-select"
                  value={selectedProfessor}
                  onChange={(e) => setSelectedProfessor(e.target.value)}
                  className={`p-2 ${currentTheme.selectBg} ${currentTheme.selectBorder} rounded-lg ${currentTheme.inputText} focus:outline-none focus:ring-4 ${currentTheme.inputRing} font-mono`}
                >
                  {course.professors.map((prof) => (
                    <option key={prof.slug} value={prof.slug} className={currentTheme.inputText}>
                      {prof.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowAddProfessorModal(true)}
                  className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-4 py-2 rounded-lg font-bold uppercase ${currentTheme.buttonHover} transition-all ${currentTheme.buttonShadow}`}
                >
                  Add Professor
                </button>
              </div>

              {/* Add Professor Modal */}
              {showAddProfessorModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className={`p-6 ${currentTheme.modalBg} ${currentTheme.modalBorder} rounded-2xl ${currentTheme.cardShadow}`}>
                    <h3 className={`text-xl font-bold ${currentTheme.textPrimary} uppercase mb-4`}>
                      Add a New Professor
                    </h3>
                    <input
                      type="text"
                      placeholder="Professor Name"
                      value={newProfessor}
                      onChange={(e) =>
                        setNewProfessor(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
                      }
                      className={`w-full p-3 mb-4 ${currentTheme.inputBg} ${currentTheme.inputBorder} rounded-lg ${currentTheme.inputText} ${currentTheme.inputPlaceholder} focus:outline-none focus:ring-4 ${currentTheme.inputRing} font-mono`}
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={addProfessor}
                        className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-4 py-2 rounded-lg font-bold uppercase ${currentTheme.buttonHover} transition-all ${currentTheme.buttonShadow}`}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddProfessorModal(false)}
                        className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-4 py-2 rounded-lg font-bold uppercase ${currentTheme.buttonHover} transition-all ${currentTheme.buttonShadow}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Ratings Section */}
              <h3 className={`text-xl font-bold ${currentTheme.textPrimary} uppercase mb-4`}>
                Add Ratings
              </h3>
              <div className="space-y-4">
                {[
                  { name: "attendance", label: "Attendance (1-10)" },
                  { name: "difficulty", label: "Course Difficulty (1-10)" },
                  { name: "grading", label: "Grading (1-10)" },
                  { name: "overall", label: "Overall (1-10)" },
                ].map((field) => (
                  <div key={field.name}>
                    <input
                      type="number"
                      placeholder={field.label}
                      name={field.name}
                      value={ratings[field.name]}
                      onChange={handleRatingsChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full p-3 ${currentTheme.inputBg} ${currentTheme.inputBorder} rounded-lg ${currentTheme.inputText} ${currentTheme.inputPlaceholder} focus:outline-none focus:ring-4 ${currentTheme.inputRing} font-mono`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={submitRating}
                  className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-6 py-3 rounded-lg font-extrabold uppercase ${currentTheme.buttonHover} transition-all ${currentTheme.buttonShadow}`}
                >
                  Submit Ratings
                </button>
                <Link
                  to="/"
                  className={`inline-block ${currentTheme.textPrimary} ${currentTheme.textHover} font-bold uppercase tracking-wider transition-all hover:scale-105`}
                >
                  Home
                </Link>
              </div>
            </div>
          ) : (
            <p className={`${currentTheme.textSecondary} text-center font-mono text-xl`}>
              Loading course details...
            </p>
          )}
        </div>
      </main>

      <Footer colorTheme={colorTheme} />
    </div>
  );
};

export default EditCourse;