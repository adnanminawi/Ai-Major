import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Student.css";
function Students(){
    const[stud, setStud]=useState([]);

    useEffect(() => {
    fetchInfo();
    }, []);

    const fetchInfo = async ()=>{
    try {
        const res = await axios.get("http://localhost:5001/student");
        setStud(res.data);
        }catch (err) {
        console.log(err);
        }
        };



        return(

<div className="students-page">
    <div className="students-page__header">
      <p className="students-page__label">All records</p>
      <h1 className="students-page__title">Students</h1>
    </div>

    <div className="students-card">
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Section</th>
            <th>Grades</th>
            <th>Interests</th>
            <th>Majors</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stud.map(s => (
            <tr key={s.student_id}>
              <td className="students-table__name">{s.name}</td>
              <td className="students-table__cell-muted">{s.email}</td>
              <td><span className="students-table__section">{s.section_name}</span></td>
              <td className="students-table__cell-muted">{s.grades.map(g => `${g.subject_name}: ${g.grade}`).join(", ")}</td>
              <td className="students-table__cell-muted">{s.interests.map(i => i.interest_name).join(", ")}</td>
              <td className="students-table__cell-muted">{s.majors.map(m => `${m.major_name}: ${m.score}`).join(", ")}</td>
              <td>
                <Link to={`/dashboard/students/${s.student_id}`} className="students-table__view">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
        
        );
  }

export default Students;
