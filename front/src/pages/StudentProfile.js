import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>Student Information</h1>
      <h2> Name : {prof.student.name}</h2>
      <h2> Email : {prof.student.email}</h2>
      <h2> Section : {prof.student.section_name}</h2>
      <h2> List of Interests : </h2>
      <ul>
      {prof.interest.map((i, index) => (
      <li key={index}>{i.interest_name}</li>
      ))}
      </ul>
      <h2>Grades : </h2>
      <ul>
      {prof.grades.map((g, index) => (
      <li key={index}>{g.subject_name}: {g.grade}</li>
      ))}
      </ul>
      <h3>Majors : </h3>
      <ul>
      {prof.majors.map((m, index)=>(
      <li key={index}>{m.major_name}: {m.score}</li>
      ))}
      </ul>
    </div>
  );
}
export default StudentProfile;