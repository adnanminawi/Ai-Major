import React from "react";
import { Outlet,NavLink } from "react-router-dom";
import "../styles/DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar__brand">MajorMind</div>
        <nav className="sidebar__nav">
        <NavLink to="/dashboard" end className="sidebar__link">Dashboard</NavLink>
        <NavLink to="/dashboard/students" className="sidebar__link">Students</NavLink>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />   {/* ← this slot fills with the current page */}
      </main>
    </div>
  );
}
export default DashboardLayout;