import React from "react";

export default function Footer() {
  const [colorTheme] = React.useState("cyberpunk"); // Change to 'cyberpunk', 'pastel', or 'retro'

  // Color Theme Configurations
  const themes = {
    cyberpunk: {
      bg: "bg-gray-900",
      textPrimary: "text-pink-400",
      textSecondary: "text-blue-300",
      textHover: "hover:text-blue-300",
      border: "border-t-4 border-pink-500",
      shadow: "shadow-[0_0_10px_rgba(236,72,153,0.7)]",
    },
    pastel: {
      bg: "bg-gray-100",
      textPrimary: "text-peach-600",
      textSecondary: "text-mint-600",
      textHover: "hover:text-mint-600",
      border: "border-t-4 border-mint-400",
      shadow: "shadow-[0_0_10px_rgba(255,218,185,0.7)]",
    },
    retro: {
      bg: "bg-gray-700",
      textPrimary: "text-orange-500",
      textSecondary: "text-teal-300",
      textHover: "hover:text-teal-300",
      border: "border-t-4 border-orange-500",
      shadow: "shadow-[0_0_10px_rgba(249,115,22,0.7)]",
    },
  };

  const currentTheme = themes[colorTheme];

  return (
    <footer className={`${currentTheme.bg} ${currentTheme.border} ${currentTheme.shadow} mt-auto`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className={`font-extrabold text-lg ${currentTheme.textPrimary}`}>
              WhichCourse
            </p>
            <p className={`text-sm ${currentTheme.textSecondary}`}>
              Helping you find the perfect course
            </p>
          </div>
          
          <div className="flex gap-6 text-sm font-mono">
            <a
              href="#"
              className={`${currentTheme.textSecondary} ${currentTheme.textHover} transition-colors hover:scale-105`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`${currentTheme.textSecondary} ${currentTheme.textHover} transition-colors hover:scale-105`}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className={`${currentTheme.textSecondary} ${currentTheme.textHover} transition-colors hover:scale-105`}
            >
              Contact Us
            </a>
          </div>
        </div>
        
        <div className={`mt-4 text-center text-xs ${currentTheme.textSecondary} font-mono opacity-75`}>
          © {new Date().getFullYear()} WhichCourse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}