import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseContent, markComplete } from "../../services/courseService";

export default function CourseLearning() {
    const { courseId } = useParams();
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetchContent();
    },[]);

    const fetchContent = async () => {
        const data = await getCourseContent(courseId);
        console.log("Get course content data: ",data);
        setModules(data);
    };

    const markAsComplete = async (lessonId) => {
        try {
            await markComplete(lessonId);
            alert("Lesson marked as complete");
            fetchContent();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to mark as complete");
        }
    };

    return (
        <div>
            <h2>Course Content</h2>

            {modules.map((module) => (
            <div key={module.module_id} style={{ marginBottom: "20px" }}>
                <h3>{module.module_title}</h3>

                {module.lessons.map((lesson) => (
                <div key={lesson.id} style={lessonCard}>
                    <span>
                    {lesson.title}
                    </span>
                    {lesson.completed ? (
                    <span style={completedBadge}>Completed ✅</span>
                    ) : (
                    <button onClick={() => markComplete(lesson.id)}>
                        Mark Complete
                    </button>
                    )}
                </div>
                ))}
            </div>
            ))}
        </div>
    )
}


const lessonCard = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  border: "1px solid #e2e8f0",
  marginBottom: "8px",
  borderRadius: "8px"
};

const completedBadge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600"
};
