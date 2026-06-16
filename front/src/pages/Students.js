import React, { useEffect, useState } from "react";
import axios from "axios";

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

<section className="dashboard">
  <div className="dashboard__inner">
    <div className="dashboard__header">
      <p className="dashboard__label">All records</p>
      <h2 className="dashboard__title">Student assessments</h2>
    </div>
 <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>email</th>
                <th>Section</th>
                <th>Grades</th>
                <th>Interest</th>
                <th>Major</th>
                </tr>
            </thead>
            <tbody>
                {stud.map( s=> (
                <tr key={s.student_id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.section_name}</td>
                <td>{s.grades.map(g => `${g.subject_name}: ${g.grade}`).join(", ")}</td>
                <td>{s.interests.map(i => i.interest_name).join(", ")}</td>
                <td>{s.majors.map(m => `${m.major_name}: ${m.score}`).join(", ")}</td>
                </tr>))}
            </tbody>
        </table>
  </div>
</section>
        
        );
  }

export default Students;
