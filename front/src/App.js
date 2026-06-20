import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import DashboardLayout from "./components/DashboardLayout";
import StudentProfile from "./pages/StudentProfile";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chat"
          element={
            <iframe
              title="MajorMind AI Assistant"
              src="https://landbot.online/v3/H-3449208-XRR8V6PMVIAZILBQ/index.html"
              style={{ width: "100%", height: "100vh", border: "none", display: "block" }}
            />
          }
        />
       <Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Dashboard />} />        {/* shows at /dashboard */}
  <Route path="students" element={<Students />} /> {/* shows at /dashboard/students */}
  <Route path="students/:student_id" element={<StudentProfile />} /> {/* show the student profile*/}
</Route>
      </Routes>
    </Router>
  );
}

export default App;