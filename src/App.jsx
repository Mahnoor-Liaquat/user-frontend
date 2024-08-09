import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./pages/Courses.jsx";
import Navbar from "./components/Navbar.jsx";
import YourProfile from "./pages/YourProfile.jsx";
import MainPage from './pages/MainPage';



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<YourProfile/>} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
