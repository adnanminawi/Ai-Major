import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import "../styles/StudentProfile.css";

function StudentProfile(){
  const [prof, setProf]=useState(null);
  const { student_id } = useParams();
  const [error, setError] = useState(null);
  
useEffect(() => {
  fetchInfo();
}, [student_id]);

  const fetchInfo=async ()=>{
    setProf(null);
    setError(null);
    try{
      const res = await axios.get(`http://localhost:5001/student/${student_id}`);
      setProf(res.data);
      }catch(err){
      setError("Student not found");
      }
    
  };
  if (error) return <p>{error}</p>;
  if (!prof) return <p>Student Profile {student_id}</p>


  return(
    <div className="profile-page">
    <Link to="/dashboard/students" className="profile-page__back">← Back to students</Link>

    <div className="profile-header">
      <div className="profile-avatar">{prof.student.name.charAt(0).toUpperCase()}</div>
      <div className="profile-header__info">
        <h1 className="profile-header__name">{prof.student.name}</h1>
        <p className="profile-header__email">{prof.student.email}</p>
        <span className="profile-header__section">{prof.student.section_name} Section</span>
      </div>
    </div>

    <div className="profile-grid">
      <div className="profile-section">
        <h3 className="profile-section__title">Grades</h3>
        <ul className="profile-list">
          {prof.grades.map((g, i) => (
            <li key={i} className="profile-list__item">
              <span className="profile-list__key">{g.subject_name}</span>
              <span className="profile-list__value">{g.grade}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h3 className="profile-section__title">Interests</h3>
        <div className="profile-tag-list">
          {prof.interest.map((it, i) => (
            <span key={i} className="profile-tag">{it.interest_name}</span>
          ))}
        </div>
      </div>

      <div className="profile-section" style={{ gridColumn: "1 / -1" }}>
        <h3 className="profile-section__title">Recommended Majors</h3>
        {prof.majors.map((m, i) => (
          <div key={i} className="profile-major">
            <div className="profile-major__header">
              <span className="profile-major__name">{m.major_name}</span>
              <span className="profile-major__score">{m.score}%</span>
            </div>
            <div className="profile-major__bar">
              <div className="profile-major__fill" style={{ width: `${m.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
export default StudentProfile;