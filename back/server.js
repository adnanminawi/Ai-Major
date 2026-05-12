import express from "express";
import cors from "cors";
import mysql from "mysql";
import axios from "axios";
import dotenv from 'dotenv';
import rateLimit from "express-rate-limit";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const rate = rateLimit({ windowMs:120000 , max:10} );

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(rate);

app.get("/", (req, res) => {
  res.send("AI Major Assistant API is running");
});

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Promise wrapper for mysql pool queries
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function calculateAbilities(section_name, math, physics, chemistry, biology, economics, sociology) {
  let math_ability = 0;
  let science_ability = 0;
  let social_ability = 0;

  if (section_name === "LS") {
    math_ability = Number(math || 0) / 60;
    science_ability =
      (Number(physics || 0) / 60 + Number(chemistry || 0) / 60 + Number(biology || 0) / 80) / 3;
  } else if (section_name === "GS") {
    math_ability = Number(math || 0) / 120;
    science_ability = (Number(physics || 0) / 80 + Number(chemistry || 0) / 60) / 2;
  } else if (section_name === "ES") {
    math_ability = Number(math || 0) / 50;
    social_ability = (Number(economics || 0) / 60 + Number(sociology || 0) / 60) / 2;
  }

  return {
    math_ability: Number(math_ability.toFixed(2)),
    science_ability: Number(science_ability.toFixed(2)),
    social_ability: Number(social_ability.toFixed(2)),
  };
}

const checkApiKey = (req, res, next) => {
 if(req.headers['x-api-key']=== process.env.API_key) next() 
 else{res.status(401).json({ error: "Unauthorized" })} };

app.post("/student", checkApiKey, async (req, res) => {
 if (!req.body.section_name) {
  return res.json({
    major1: "Computer Science",
    score1: 90,
    major2: "Engineering", 
    score2: 7,
    major3: "Mathematics",
    score3: 3,
  });
}
  const {
    name, email, section_name,
    math, physics, chemistry, biology, economics, sociology,
    interest,
  } = req.body;

  const abilities = calculateAbilities(section_name, math, physics, chemistry, biology, economics, sociology);

  const interestArray = Array.isArray(interest)
    ? interest
    : typeof interest === "string" && interest.trim() !== ""
    ? interest.split(",").map((i) => i.trim())
    : [];

  const grades = [
    { subject: "math", grade: math },
    { subject: "physics", grade: physics },
    { subject: "chemistry", grade: chemistry },
    { subject: "biology", grade: biology },
    { subject: "economics", grade: economics },
    { subject: "sociology", grade: sociology },
  ].filter((g) => g.grade !== undefined && g.grade !== null && g.grade !== "");

  try {
    // 1. Get section_id
    const sectionRows = await query(
      "SELECT section_id FROM baccalaureate_section WHERE section_name = ?",
      [section_name]
    );
    const section_id = sectionRows[0].section_id;

    // 2. Insert student
    const studentResult = await query(
      "INSERT INTO student (`name`, `email`, `section_id`) VALUES (?, ?, ?)",
      [name, email, section_id]
    );
    const student_id = studentResult.insertId;

    // 3. Insert grades
    await Promise.all(
      grades.map(async (g) => {
        const subjectRows = await query(
          "SELECT subject_id FROM subject WHERE subject_name = ?",
          [g.subject]
        );
        await query(
          "INSERT INTO grades (`student_id`, `subject_id`, `grade`) VALUES (?, ?, ?)",
          [student_id, subjectRows[0].subject_id, g.grade]
        );
      })
    );

    // 4. Insert interests
    await Promise.all(
      interestArray.map(async (interestName) => {
        const interestRows = await query(
          "SELECT interest_id FROM interest WHERE interest_name = ?",
          [interestName]
        );
        await query(
          "INSERT INTO student_interest (`student_id`, `interest_id`) VALUES (?, ?)",
          [student_id, interestRows[0].interest_id]
        );
      })
    );

    // 5. Call ML API
    const mlResponse = await axios.post("http://localhost:5002/predict-major", {
      section: section_name,
      math_ability: abilities.math_ability,
      science_ability: abilities.science_ability,
      social_ability: abilities.social_ability,
      interests: interestArray,
    });

    const recommendations = mlResponse.data.recommendations;

    // 6. Insert recommendation
    const recommendationResult = await query(
      "INSERT INTO recommendation (`student_id`) VALUES (?)",
      [student_id]
    );
    const recommendation_id = recommendationResult.insertId;

    // 7. Insert recommendation details
    await Promise.all(
      recommendations.map(async (rec) => {
        const majorRows = await query(
          "SELECT major_id FROM major WHERE major_name = ?",
          [rec.major]
        );
        await query(
          "INSERT INTO recommendation_detail (`recommendation_id`, `major_id`, `score`) VALUES (?, ?, ?)",
          [recommendation_id, majorRows[0].major_id, rec.score]
        );
      })
    );
    return res.json({
      major1: recommendations[0]?.major || "",
      score1: recommendations[0]?.score || "",
      major2: recommendations[1]?.major || "",
      score2: recommendations[1]?.score || "",
      major3: recommendations[2]?.major || "",
      score3: recommendations[2]?.score || "",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});