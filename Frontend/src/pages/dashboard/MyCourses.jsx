import { useEffect, useState } from "react";
import { getApprovedCourses } from "../../services/userServices";
import CourseCard from "./CourseCard";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  },[]);

  const fetchMyCourses = async () => {
    try {
      const data = await getApprovedCourses();
      console.log("My courses:",data);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (courses.length === 0) {
    return <p>You have not enrolled in any courses yet.</p>;
  }

  return (
    <div>
      <h1 style={title}>My Courses</h1>
      <p style={subtitle}>Track and continue your learning</p>

      <div style={grid}>
        {courses.map((course) => (
          <CourseCard 
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </div>
  );
}


const title = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "6px",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "32px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
};
