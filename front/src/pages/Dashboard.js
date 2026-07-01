import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";

function Dashboard(){
    const[stats, setStats]=useState(null);

const fetchInfo = async ()=>{
    try{
    const res = await axios.get("http://localhost:5001/stats");
    setStats(res.data);
    }catch (err) {
    console.log(err);
    };
}
    useEffect(() => {
    fetchInfo();
    }, []);
if (!stats) return <p>Loading...</p>;

return(
    
     <div className="dashboard-page">
    <div className="dashboard-page__header">
      <p className="dashboard-page__label">Overview</p>
      <h1 className="dashboard-page__title">Dashboard</h1>
    </div>

    <div className="stat-grid">
      <div className="stat-card stat-card__accent">
        <div className="stat-card__label">Total students</div>
        <div className="stat-card__value">{stats.total_students}</div>
      </div>

      {stats.sections.map(s => (
        <div key={s.section_name} className="stat-card">
          <div className="stat-card__label">{s.section_name} section</div>
          <div className="stat-card__value">{s.count}</div>
        </div>
      ))}
    </div>
  </div>
);
}
export default Dashboard;