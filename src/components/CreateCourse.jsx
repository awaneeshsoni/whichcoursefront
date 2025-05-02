import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

const API = import.meta.env.VITE_API_URL;

const CreateCourse = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [colorTheme, setColorTheme] = useState("cyberpunk"); 

  const handleNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
    setCourseCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseCode || /\s/.test(courseCode)) {
      setError("Course code must contain only lowercase letters and numbers without spaces.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API}/courses`, {
        name: courseName,
        slug: courseCode,
      });
      alert("Course created successfully!");
      navigate(`/courses/${response.data.course.slug}`);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Course already exists!");
      } else {
        console.error("Error creating course:", err);
        setError("Error creating course. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
      errorText: "text-red-400",
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
      errorText: "text-red-500",
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
      errorText: "text-red-400",
    },
  };

  const currentTheme = themes[colorTheme];

  return (
    <div className={`flex flex-col min-h-screen ${currentTheme.bg}`}>
      <Navbar colorTheme={colorTheme} />

      <main className="flex-grow p-6">
        <div className="max-w-2xl mx-auto mb-4 flex gap-4">
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

        <div className="max-w-2xl mx-auto">
          <h2 className={`text-3xl font-extrabold ${currentTheme.textPrimary} uppercase mb-6`}>
            Create a New Course
          </h2>
          <form onSubmit={handleSubmit} className={`p-6 ${currentTheme.cardBg} ${currentTheme.cardBorder} rounded-2xl ${currentTheme.cardShadow}`}>
            <div className="mb-4">
              <label htmlFor="courseName" className={`${currentTheme.textPrimary} font-bold block mb-2`}>
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={handleNameChange}
                required
                className={`w-full p-3 ${currentTheme.inputBg} ${currentTheme.inputBorder} rounded-lg ${currentTheme.inputText} ${currentTheme.inputPlaceholder} focus:outline-none focus:ring-4 ${currentTheme.inputRing} font-mono`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="courseCode" className={`${currentTheme.textPrimary} font-bold block mb-2`}>
                Course Code (slug)
              </label>
              <input
                type="text"
                id="courseCode"
                value={courseCode}
                onChange={handleCodeChange}
                required
                pattern="[a-z0-9]+"
                title="Only lowercase letters and numbers allowed"
                className={`w-full p-3 ${currentTheme.inputBg} ${currentTheme.inputBorder} rounded-lg ${currentTheme.inputText} ${currentTheme.inputPlaceholder} focus:outline-none focus:ring-4 ${currentTheme.inputRing} font-mono`}
              />
              {error && (
                <p className={`${currentTheme.errorText} mt-2 font-mono`}>{error}</p>
              )}
            </div>

            {loading && (
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 border-4 ${currentTheme.spinner} rounded-full animate-spin`}></div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-6 py-3 rounded-lg font-extrabold uppercase ${currentTheme.buttonHover} transition-all ${currentTheme.buttonShadow}`}
              >
                Create Course
              </button>
              <Link
                to="/"
                className={`inline-block ${currentTheme.textPrimary} ${currentTheme.textHover} font-bold uppercase tracking-wider transition-all hover:scale-105`}
              >
                Back Home
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer colorTheme={colorTheme} />
    </div>
  );
};

export default CreateCourse;