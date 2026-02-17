import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { getCourseReviews, getCourseRatingSummary } from "../services/reviewService";
import { getPublicBatches } from "../services/batchService";
import RatingStars from "../components/RatingStars";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import EmptyState from "../components/EmptyState";

export default function CourseDetail() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [ratingSummary, setRatingSummary] = useState({ average_rating: 0, total_reviews: 0 });
    const [batches, setBatches] = useState([]);
    const [course, setCourse] = useState(null);
    const [error, setError] = useState("");

    const userRole = JSON.parse(localStorage.getItem("user") || "{}")?.role;
    const isStudent = userRole === "student";

    useEffect(() => {
        loadCourseData();
    }, [courseId]);

    const loadCourseData = async () => {
        try {
            setLoading(true);
            setError("");

            const [reviewsData, ratingsData, batchesData] = await Promise.all([
                getCourseReviews(courseId),
                getCourseRatingSummary(courseId),
                getPublicBatches({ courseId, limit: 50 }),
            ]);

            setReviews(Array.isArray(reviewsData) ? reviewsData : []);
            setRatingSummary({
                average_rating: parseFloat(ratingsData?.average_rating || 0),
                total_reviews: parseInt(ratingsData?.total_reviews || 0),
            });

            const batchList = Array.isArray(batchesData?.batches) ? batchesData.batches : [];
            setBatches(batchList);

            // Get course info from first batch
            if (batchList.length > 0) {
                setCourse({
                    title: batchList[0].course_title,
                    instructor_name: batchList[0].instructor_name,
                });
            }
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Failed to load course details");
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmitted = () => {
        loadCourseData();
    };

    if (loading) {
        return (
            <Box sx={{ py: 8, backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !course) {
        return (
            <Box sx={{ py: 8, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
                <Container maxWidth="lg">
                    <Alert severity="error">{error || "Course not found"}</Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#f8fafc", minHeight: "calc(100vh - 80px)" }}>
            <Container maxWidth="lg">
                <Button
                    startIcon={<ArrowBackRoundedIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 3, textTransform: "none" }}
                >
                    Back
                </Button>

                <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 3 }}>
                    <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                            {course.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            By {course.instructor_name}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                            <RatingStars
                                rating={ratingSummary.average_rating}
                                size="medium"
                                showNumber
                                reviewCount={ratingSummary.total_reviews}
                            />
                        </Box>

                        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                            <Tab label="Overview" />
                            <Tab label={`Reviews (${ratingSummary.total_reviews})`} />
                        </Tabs>
                    </CardContent>
                </Card>

                {tab === 0 && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Available Batches
                        </Typography>

                        {batches.length === 0 ? (
                            <EmptyState
                                icon="folder"
                                title="No Batches Available"
                                description="There are currently no batches available for this course. Check back later for new batch announcements."
                            />
                        ) : (
                            <Grid container spacing={2.2}>
                                {batches.map((batch) => (
                                    <Grid key={batch.id} size={{ xs: 12, md: 6 }}>
                                        <Card elevation={0} sx={{ borderRadius: 2.5, border: "1px solid #e2e8f0" }}>
                                            <CardContent sx={{ p: 2.5 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                                    {batch.batch_name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                    <strong>Status:</strong> {batch.status || "Upcoming"}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                    <strong>Start Date:</strong>{" "}
                                                    {batch.start_date ? new Date(batch.start_date).toLocaleDateString() : "TBA"}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 1.5 }}>
                                                    <strong>Seats:</strong>{" "}
                                                    {batch.available_seats === null ? "Open" : `${batch.available_seats} left`}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => navigate(`/batches?courseId=${courseId}`)}
                                                    sx={{ borderRadius: 2, textTransform: "none" }}
                                                >
                                                    View Details & Enroll
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                )}

                {tab === 1 && (
                    <Box>
                        {isStudent && <ReviewForm courseId={courseId} onReviewSubmitted={handleReviewSubmitted} />}

                        {reviews.length === 0 ? (
                            <EmptyState
                                icon="review"
                                title="No Reviews Yet"
                                description="Be the first to share your experience! Submit a review to help other students decide."
                            />
                        ) : (
                            <Stack spacing={2}>
                                {reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </Stack>
                        )}
                    </Box>
                )}
            </Container>
        </Box>
    );
}
