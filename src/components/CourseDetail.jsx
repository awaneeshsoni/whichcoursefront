import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; 
import Footer from "./Footer";
const API = import.meta.env.VITE_API_URL;

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [colorTheme, setColorTheme] = useState("cyberpunk"); 

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/courses/${slug}`);
        setCourse(response.data);
        if (response.data.professors.length > 0) {
          setSelectedProfessor(response.data.professors[0]);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

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
    },
  };

  const currentTheme = themes[colorTheme];

  return (
    <div className={`flex flex-col min-h-screen ${currentTheme.bg}`}>
      <Navbar colorTheme={colorTheme} />

      <main className="flex-grow p-6">
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
          {course && (
            <div className={`p-6 ${currentTheme.cardBg} ${currentTheme.cardBorder} rounded-2xl ${currentTheme.cardShadow}`}>
              <h2 className={`text-3xl font-extrabold ${currentTheme.textPrimary} uppercase mb-4`}>
                {course.name}
              </h2>
              <p className={`${currentTheme.textSecondary} font-mono mb-4`}>
                Course Code: {course.slug}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <label className={`${currentTheme.textPrimary} font-bold`}>Professor:</label>
                <select
                  onChange={(e) =>
                    setSelectedProfessor(
                      course.professors.find((prof) => prof.slug === e.target.value)
                    )
                  }
                  className={`p-2 ${currentTheme.selectBg} ${currentTheme.selectBorder} rounded-lg ${currentTheme.inputText} focus:outline-none focus:ring-4 ${currentTheme.inputRing} font-mono`}
                >
                  {course.professors.map((prof) => (
                    <option key={prof.slug} value={prof.slug} className={currentTheme.inputText}>
                      {prof.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProfessor && (
                <div className="space-y-2">
                  <p className={`${currentTheme.textSecondary} font-mono`}>
                    Attendance: {selectedProfessor.ratings.attendance || "No cap"}
                  </p>
                  <p className={`${currentTheme.textSecondary} font-mono`}>
                    Grading: {selectedProfessor.ratings.grading || "No cap"}
                  </p>
                  <p className={`${currentTheme.textSecondary} font-mono`}>
                    Course Difficulty: {selectedProfessor.ratings.difficulty || "No cap"}
                  </p>
                  <p className={`${currentTheme.textSecondary} font-mono`}>
                    Overall Rating: {selectedProfessor.ratings.overall || "No cap"}
                  </p>
                  <p className={`${currentTheme.textSecondary} font-mono`}>
                    Total Entries: {selectedProfessor.ratings.entries}
                  </p>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <Link
                  to={`/edit/${course.slug}`}
                  className={`inline-block ${currentTheme.textPrimary} ${currentTheme.textHover} font-bold uppercase tracking-wider transition-all hover:scale-105`}
                >
                  Add Rating/Professors
                </Link>
                <Link
                  to="/"
                  className={`inline-block ${currentTheme.textPrimary} ${currentTheme.textHover} font-bold uppercase tracking-wider transition-all hover:scale-105`}
                >
                  Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer colorTheme={colorTheme} />
    </div>
  );
};

export default CourseDetail;