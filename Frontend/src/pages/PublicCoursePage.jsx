import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getPublicCourses } from "../services/userServices";

export const PublicCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let active = true;

    const loadCourses = async () => {
      try {
        const res = await getPublicCourses({
          search,
          level,
          page,
          limit: 6,
        });
        if (!active) return;
        setCourses(res.courses || []);
        setTotalPages(res.totalPages || 1);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    loadCourses();
    return () => {
      active = false;
    };
  }, [page, search, level]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Explore Courses
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Search Courses"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Select
            fullWidth
            value={level}
            displayEmpty
            onChange={(e) => {
              setLevel(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Button fullWidth variant="contained" onClick={() => setPage(1)}>
            Filter
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Instructor: {course.instructor_name}
                </Typography>
                <Typography variant="body2">Level: {course.level}</Typography>
                <Typography sx={{ mt: 1 }} fontWeight="bold">
                  INR {course.price}
                </Typography>
                <Button sx={{ mt: 2 }} variant="outlined" fullWidth>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </Container>
  );
};
