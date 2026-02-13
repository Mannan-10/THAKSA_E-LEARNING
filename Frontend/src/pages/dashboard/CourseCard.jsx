import { useEffect, useState } from "react";
import { getCourseProgress } from "../../services/userServices";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        fetchProgress();
    },[]);

    const fetchProgress = async () => {
        try {
            const data = await getCourseProgress(course.id);
            setProgress(data.progress);
        } catch (error) {
            console.error("Progress error:", error);            
        }
    };

    return (
        <div style={card}>
            <h3 style={titleStyle}>{course.title}</h3>

            <p style={muted}>Level: {course.level}</p>
            <p style={muted}>Price: {course.price}</p>

            <div style={progressWrap}>
                <div 
                    style={{
                        ...progressBar,
                        width: `${progress}%`,
                        background:
                            progress === 100
                                ? "#16a34a"
                                : progress > 50
                                ? "#2563eb"
                                : "#f59e0b",
                    }}
                />
            </div>
            <p style={muted}>{progress}% completed</p>
            <Link to={`/dashboard/courses/${course.id}`} style={btn}>
                Continue Learning 
            </Link>
        </div>
    );
}

const progressBar = {
    height: "8px",
    borderRadius: "4px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  marginBottom: "20px",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "8px",
};

const muted = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "4px",
};

const progressWrap = {
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "6px",
  overflow: "hidden",
  margin: "14px 0",
};

const btn = {
  display: "inline-block",
  marginTop: "14px",
  background: "#2563eb",
  color: "white",
  padding: "10px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
};
