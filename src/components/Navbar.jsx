import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [colorTheme] = React.useState("cyberpunk"); 

  const themes = {
    cyberpunk: {
      bg: "bg-gray-900",
      textPrimary: "text-pink-400",
      textHover: "hover:text-blue-300",
      shadow: "shadow-[0_0_10px_rgba(236,72,153,0.7)]",
      border: "border-b-4 border-pink-500",
    },
    pastel: {
      bg: "bg-gray-100",
      textPrimary: "text-peach-600",
      textHover: "hover:text-mint-600",
      shadow: "shadow-[0_0_10px_rgba(255,218,185,0.7)]",
      border: "border-b-4 border-mint-400",
    },
    retro: {
      bg: "bg-gray-700",
      textPrimary: "text-orange-500",
      textHover: "hover:text-teal-300",
      shadow: "shadow-[0_0_10px_rgba(249,115,22,0.7)]",
      border: "border-b-4 border-orange-500",
    },
  };

  const currentTheme = themes[colorTheme];

  return (
    <nav className={`${currentTheme.bg} ${currentTheme.shadow} ${currentTheme.border}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl font-extrabold tracking-tight ${currentTheme.textPrimary} ${currentTheme.textHover} transition-all`}
        >
          WhichCourse
        </Link>
        
        <div className="flex gap-6">
          <Link
            to="/"
            className={`${currentTheme.textPrimary} ${currentTheme.textHover} font-bold uppercase tracking-wider transition-all hover:scale-105`}
          >
            Home
          </Link>
          <Link
            to="/createcourse"
            className={`${currentTheme.textPrimary} ${currentTheme.textHover} font-bold uppercase tracking-wider transition-all hover:scale-105`}
          >
            Add Course
          </Link>
        </div>
      </div>
    </nav>
  );
}