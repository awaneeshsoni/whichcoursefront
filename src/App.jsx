import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CourseDetail from "./components/CourseDetail";
import EditCourse from "./components/EditCourse";
import "./App.css";
import Home from "./components/Home";
import CreateCourse from "./components/CreateCourse";

const App = () => {
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/edit/:slug" element={<EditCourse />} />
          <Route path="/createcourse" element={<CreateCourse />} />
        </Routes>
    </Router>
  );
};

export default App;
