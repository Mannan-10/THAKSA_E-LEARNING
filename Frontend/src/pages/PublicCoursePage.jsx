import { useEffect, useState } from "react";
import { getPublicCourses } from "../services/userServices";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";

export const PublicCoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [level, setLevel] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchCourses();
    },[page]);

    const fetchCourses = async () => {
        try {
            const res = await getPublicCourses({
                search,
                level,
                page,
                limit: 6,
            });
            console.log(res);
            setCourses(res.courses);
            setTotalPages(res.totalPages);
        } catch (error) {
            console.error("Error fetching courses:",error);
        }
    };

  return (
        <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Explore Courses
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            value={level}
            displayEmpty
            onChange={(e) => setLevel(e.target.value)}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button fullWidth variant="contained" onClick={fetchCourses}>
            Filter
          </Button>
        </Grid>
      </Grid>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Instructor: {course.instructor_name}
                </Typography>
                <Typography variant="body2">
                  Level: {course.level}
                </Typography>
                <Typography sx={{ mt: 1 }} fontWeight="bold">
                  ₹ {course.price}
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  variant="outlined"
                  fullWidth
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </Container>
  )
}
