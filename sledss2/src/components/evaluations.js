import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SocializationImg from './images/sp.png';
import LearningImg from './images/Lp.png';
import ExerciseImg from './images/ep.png';
import DietImg from './images/dp.png';
import StressImg from './images/stp.png';
import SleepImg from './images/Slp.png';

const Evaluations = () => {
  const navigate = useNavigate();
  const [completedTests, setCompletedTests] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userID"); // Get current user ID
    if (!userId) return; // If no user is logged in, do nothing

    const storedCompletedTests = JSON.parse(localStorage.getItem("completedTests")) || {};
    console.log("Loaded completed tests:", storedCompletedTests); // Debugging

    setCompletedTests(storedCompletedTests[userId] || {}); // ✅ Load only the current user's completed tests
  }, []);

  const categories = [
    { name: "Socialize", color: "#B90E3E", image: SocializationImg, route: "/socialization" },
    { name: "Learning", color: "#D38F5D", image: LearningImg, route: "/learning" },
    { name: "Exercise", color: "#E8C547", image: ExerciseImg, route: "/exercise" },
    { name: "Diet", color: "#2E8B57", image: DietImg, route: "/diet" },
    { name: "Stress", color: "#38B6FF", image: StressImg, route: "/stress" },
    { name: "Sleep", color: "#A685E2", image: SleepImg, route: "/sleep" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>S.L.E.D.S.S. Evaluations</h1>
      <div style={styles.grid}>
        {categories.map((category) => {
          const testInfo = completedTests[category.name]; // ✅ Get test completion data
          return (
            <div key={category.name} style={styles.categoryContainer}>
              <img src={category.image} alt={category.name} style={styles.image} />
              <div style={styles.buttonContainer}>
                <button
                  style={{ ...styles.button, backgroundColor: category.color }}
                  onClick={() => navigate(category.route)}
                >
                  {category.name}
                </button>
                {/* ✅ Show only the completion date if test is completed */}
                {testInfo && testInfo.completedAt && (
                  <span style={styles.completedDate}>
                    Completed on: {testInfo.completedAt.split(',')[0]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
  },
  title: {
    fontSize: "20px", // Increased font size here
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  image: {
    width: "100px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "5px",
  },
  button: {
    width: "120px",
    height: "40px",
    color: "white",
    border: "none",
    borderRadius: "20px",
    fontSize: "20px", // Increased font size here
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  completedDate: {
    fontSize: "20px", // Increased font size here
    color: "#555",
    marginTop: "5px",
  },
};

export default Evaluations;
