import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { getCourseContent, markComplete } from "../../services/courseService";

export default function CourseLearning() {
    const { courseId } = useParams();
    const [modules, setModules] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);

    useEffect(() => {
        fetchContent();
    },[]);

    const fetchContent = async () => {
        const data = await getCourseContent(courseId);
        console.log("Get course content data: ",data);
        setModules(data);

        if (data.length > 0 && data[0].lessons.length > 0) {
            setCurrentLesson(data[0].lessons[0]);
        }
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
        <div style={layout}>
    
            <div style={videoSection}>
            {currentLesson ? (
                <>
                <ReactPlayer
                    url={currentLesson.video_url}
                    controls
                    width="100%"
                    height="480px"
                />
                <div style={{ marginTop: "16px", color: "#475569", lineHeight: "1.6" }}>
                    <p>{currentLesson.description}</p>
                </div>

                <h2 style={{ marginTop: "20px" }}>
                    {currentLesson.title}
                </h2>

                {!currentLesson.completed && (
                    <button
                    style={completeBtn}
                    onClick={() => markAsComplete(currentLesson.id)}
                    >
                    Mark Complete
                    </button>
                )}

                {currentLesson.completed && (
                    <span style={completedBadge}>Completed ✅</span>
                )}
                </>
            ) : (
                <p>Select a lesson</p>
            )}
            </div>

            {/* RIGHT SIDE - SIDEBAR */}
            <div style={sidebar}>
            {modules.map((module) => (
                <div key={module.module_id}>
                <h4 style={moduleTitle}>{module.module_title}</h4>

                {module.lessons.map((lesson) => (
                    <div
                    key={lesson.id}
                    style={{
                        ...lessonItem,
                        background:
                        currentLesson?.id === lesson.id
                            ? "#e0f2fe"
                            : "transparent",
                    }}
                    onClick={() => setCurrentLesson(lesson)}
                    >
                    {lesson.title}
                    {lesson.completed && " ✅"}
                    </div>
                ))}
                </div>
            ))}
            </div>
        </div>
    )
}

const layout = {
  display: "flex",
  gap: "20px",
};

const videoSection = {
  flex: 3,
  background: "white",
  padding: "20px",
  borderRadius: "16px",
};

const sidebar = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const moduleTitle = {
  fontWeight: "700",
  marginTop: "10px",
  marginBottom: "8px",
};

const lessonItem = {
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "6px",
};

const completeBtn = {
  marginTop: "12px",
  padding: "8px 16px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const completedBadge = {
  display: "inline-block",
  marginTop: "12px",
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "20px",
};
