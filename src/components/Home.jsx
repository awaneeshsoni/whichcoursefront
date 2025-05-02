import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [search, setSearch] = useState("cs101");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [colorTheme, setColorTheme] = useState("cyberpunk"); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(`${API}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/courses/${search}`);
      setCourse(response.data);
    } catch (error) {
      alert("Course not found! Slay a new one!");
      setCourse(null);
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

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search Courses"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))
              }
              className={`flex-1 p-3 ${currentTheme.inputBg} ${currentTheme.inputBorder} rounded-lg ${currentTheme.inputText} ${currentTheme.inputPlaceholder} focus:outline-none focus:ring-4 ${currentTheme.inputRing} font-mono`}
            />
            <button
              onClick={handleSearch}
              className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-6 py-3 rounded-lg font-extrabold uppercase ${currentTheme.buttonHover} transition-all ${currentTheme.buttonShadow}`}
            >
              Slay
            </button>
          </div>
          <Link
            to={"/createcourse"}
            className={`inline-block ${currentTheme.textPrimary} hover:${currentTheme.textSecondary} font-bold uppercase tracking-wider`}
          >
            Add Course
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center mt-6">
            <div className={`w-12 h-12 border-4 ${currentTheme.spinner} rounded-full animate-spin`}></div>
          </div>
        )}

        {course && (
          <div className={`max-w-2xl mx-auto mt-8 p-6 ${currentTheme.cardBg} ${currentTheme.cardBorder} rounded-2xl ${currentTheme.cardShadow}`}>
            <h3 className={`text-2xl font-extrabold ${currentTheme.textPrimary} uppercase`}>
              Course: {course.name}
            </h3>
            <p className={`${currentTheme.textSecondary} font-mono`}>Code: {course.slug}</p>
            {course.professors && course.professors.length > 0 ? (
              <div className="mt-4">
                <h4 className={`text-xl font-bold ${currentTheme.textPrimary} uppercase`}>Professors:</h4>
                <ol className={`list-decimal pl-6 mt-2 space-y-2 ${currentTheme.textSecondary} font-mono`}>
                  {course.professors.map((prof, index) => (
                    <li key={index}>
                      <strong>Prof. {prof.name}</strong>
                      <br />
                      Rating: {prof.ratings.overall || "No rating"}
                      {" "} Entries: {prof.ratings.entries}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className={`${currentTheme.textSecondary} mt-2 font-mono`}>No profs, no cap.</p>
            )}
            <Link
              to={`/courses/${course.slug}`}
              className={`mt-4 inline-block ${currentTheme.textPrimary} hover:${currentTheme.textSecondary} font-bold uppercase tracking-wider`}
            >
              More Info
            </Link>
          </div>
        )}

        <div className="max-w-6xl mx-auto mt-10">
          <h2 className={`text-4xl font-extrabold ${currentTheme.textPrimary} mb-6 uppercase animate-pulse`}>
            Courses
          </h2>
          {fetchLoading ? (
            <div className="flex justify-center">
              <div className={`w-12 h-12 border-4 ${currentTheme.spinner} rounded-full animate-spin`}></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className={`p-4 ${currentTheme.cardBg} ${currentTheme.cardBorder} rounded-2xl ${currentTheme.cardShadow} hover:scale-105 transition-all`}
                >
                  <h3 className={`text-xl font-extrabold ${currentTheme.textPrimary} uppercase`}>
                    {course.name}
                  </h3>
                  <p className={`${currentTheme.textSecondary} font-mono`}>Code: {course.slug}</p>
                  <Link
                    to={`/courses/${course.slug}`}
                    className={`mt-2 inline-block ${currentTheme.textPrimary} hover:${currentTheme.textSecondary} font-bold uppercase tracking-wider`}
                  >
                    Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className={`${currentTheme.textSecondary} text-center font-mono text-2xl`}>
              No courses, no cap.
            </p>
          )}
        </div>
      </main>

      <Footer colorTheme={colorTheme} />
    </div>
  );
}