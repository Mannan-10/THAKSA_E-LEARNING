import { useEffect, useRef, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Avatar,
    Card,
    Divider,
    IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import tharunImg from "../HomePage/sections/cofounder-tharunkrishna.png";
import sadvishaImg from "../HomePage/sections/cto-sadvisha-reddy.png";

// ───────────────────────────────────────────────
// Utility hook: fade-in when element enters viewport
// ───────────────────────────────────────────────
function useReveal(delay = 0) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.12 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, visible, delay };
}

function RevealBox({ children, delay = 0, direction = "up", sx = {} }) {
    const { ref, visible } = useReveal();
    const transforms = {
        up: visible ? "translateY(0)" : "translateY(48px)",
        left: visible ? "translateX(0)" : "translateX(-56px)",
        right: visible ? "translateX(0)" : "translateX(56px)",
        fade: "none",
    };
    return (
        <Box
            ref={ref}
            sx={{
                opacity: visible ? 1 : 0,
                transform: transforms[direction],
                transition: `all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}

// ───────────────────────────────────────────────
// SECTION LABEL
// ───────────────────────────────────────────────
function SectionLabel({ text, color = "#6366f1" }) {
    return (
        <Typography
            sx={{
                fontWeight: 800,
                fontSize: "0.75rem",
                color,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                mb: 1.5,
            }}
        >
            {text}
        </Typography>
    );
}

// ───────────────────────────────────────────────
// SECTION 1 — FOUNDERS
// ───────────────────────────────────────────────
function FoundersSection() {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                background:
                    "linear-gradient(135deg, #f0f4ff 0%, #fafbff 50%, #f0fdf9 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* decorative circles */}
            <Box sx={{ position: "absolute", top: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", bottom: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,118,110,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

            <Container maxWidth="lg">
                <RevealBox>
                    <SectionLabel text="Meet Our Leadership" />
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: "2rem", md: "3rem" },
                            color: "#0f172a",
                            fontFamily: "'Merriweather', Georgia, serif",
                            mb: 1.5,
                        }}
                    >
                        Driven by Passion,{" "}
                        <Box component="span" sx={{ background: "linear-gradient(90deg,#6366f1,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Built on Purpose
                        </Box>
                    </Typography>
                    <Typography sx={{ color: "#475569", fontSize: "1.05rem", maxWidth: 580, mb: { xs: 6, md: 8 }, lineHeight: 1.7 }}>
                        THAKSA Academy is led by industry professionals who believe real education happens when passion meets practice.
                    </Typography>
                </RevealBox>

                <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
                    {/* Tharun Krishna – CEO */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} alignItems={{ xs: "center", sm: "flex-start" }}>
                            <RevealBox direction="left" delay={0}>
                                <Box sx={{ position: "relative", flexShrink: 0 }}>
                                    {/* Floating ring animation */}
                                    <Box
                                        sx={{
                                            width: { xs: 160, md: 190 },
                                            height: { xs: 160, md: 190 },
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg,#6366f1,#7c3aed)",
                                            p: "4px",
                                            animation: "floatBob 4s ease-in-out infinite",
                                            "@keyframes floatBob": {
                                                "0%,100%": { transform: "translateY(0px)" },
                                                "50%": { transform: "translateY(-12px)" },
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={tharunImg}
                                            alt="Tharun Krishna – CEO & Co-Founder"
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                border: "4px solid #fff",
                                            }}
                                        />
                                    </Box>
                                    <Chip
                                        label="CEO & Co-Founder"
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            bottom: 4,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            bgcolor: "#6366f1",
                                            color: "#fff",
                                            fontWeight: 700,
                                            fontSize: "0.7rem",
                                            whiteSpace: "nowrap",
                                            boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
                                        }}
                                    />
                                </Box>
                            </RevealBox>

                            <RevealBox direction="up" delay={150}>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", mb: 0.5, fontFamily: "'Merriweather', Georgia, serif" }}>
                                        Tharun Krishna
                                    </Typography>
                                    <Typography sx={{ color: "#6366f1", fontWeight: 700, fontSize: "0.88rem", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                        CEO & Co-Founder
                                    </Typography>
                                    <Typography sx={{ color: "#475569", lineHeight: 1.75, fontSize: "0.95rem" }}>
                                        Tharun is a passionate educator and tech entrepreneur with over 5 years of experience bridging academia and industry. His vision sparked THAKSA Academy to transform how students learn practical skills through immersive, industry-led workshops.
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                        {["Educator", "Technologist", "Mentor"].map((t) => (
                                            <Chip key={t} label={t} size="small" sx={{ bgcolor: "rgba(99,102,241,0.1)", color: "#6366f1", fontWeight: 700, fontSize: "0.72rem" }} />
                                        ))}
                                    </Stack>
                                </Box>
                            </RevealBox>
                        </Stack>
                    </Grid>

                    {/* Sadvisha Reddy – CTO */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} alignItems={{ xs: "center", sm: "flex-start" }}>
                            <RevealBox direction="left" delay={200}>
                                <Box sx={{ position: "relative", flexShrink: 0 }}>
                                    <Box
                                        sx={{
                                            width: { xs: 160, md: 190 },
                                            height: { xs: 160, md: 190 },
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg,#0f766e,#0891b2)",
                                            p: "4px",
                                            animation: "floatBob2 4s ease-in-out infinite 0.8s",
                                            "@keyframes floatBob2": {
                                                "0%,100%": { transform: "translateY(0px)" },
                                                "50%": { transform: "translateY(-12px)" },
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={sadvishaImg}
                                            alt="Sadvisha Reddy – CTO"
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                objectPosition: "top",
                                                border: "4px solid #fff",
                                            }}
                                        />
                                    </Box>
                                    <Chip
                                        label="CTO"
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            bottom: 4,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            bgcolor: "#0f766e",
                                            color: "#fff",
                                            fontWeight: 700,
                                            fontSize: "0.7rem",
                                            boxShadow: "0 4px 12px rgba(15,118,110,0.4)",
                                        }}
                                    />
                                </Box>
                            </RevealBox>

                            <RevealBox direction="up" delay={300}>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", mb: 0.5, fontFamily: "'Merriweather', Georgia, serif" }}>
                                        Sadvisha Reddy
                                    </Typography>
                                    <Typography sx={{ color: "#0f766e", fontWeight: 700, fontSize: "0.88rem", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                        Chief Technology Officer
                                    </Typography>
                                    <Typography sx={{ color: "#475569", lineHeight: 1.75, fontSize: "0.95rem" }}>
                                        Sadvisha leads the technical direction of THAKSA Academy, building scalable learning infrastructure and curating workshop curricula that stay ahead of industry trends. Her deep expertise in software architecture empowers students with cutting-edge skills.
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                        {["Full-Stack", "AI/ML", "Systems"].map((t) => (
                                            <Chip key={t} label={t} size="small" sx={{ bgcolor: "rgba(15,118,110,0.1)", color: "#0f766e", fontWeight: 700, fontSize: "0.72rem" }} />
                                        ))}
                                    </Stack>
                                </Box>
                            </RevealBox>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// ───────────────────────────────────────────────
// SECTION 2 — WORKSHOP DETAILS
// ───────────────────────────────────────────────
const workshopDetails = [
    {
        icon: GroupsRoundedIcon,
        title: "Offline Cohort-Based Learning",
        desc: "Workshops are conducted in-person at partner college campuses, ensuring full hands-on immersion without distractions.",
        color: "#6366f1",
        bg: "rgba(99,102,241,0.08)",
    },
    {
        icon: AccessTimeRoundedIcon,
        title: "1-Day to 3-Day Formats",
        desc: "Choose from flexible formats — single-day intensive workshops or multi-day deep dives tailored to your college schedule.",
        color: "#0891b2",
        bg: "rgba(8,145,178,0.08)",
    },
    {
        icon: EmojiEventsRoundedIcon,
        title: "Certificate of Participation",
        desc: "Every participant receives an industry-recognized certificate co-branded with THAKSA Academy upon completion.",
        color: "#d97706",
        bg: "rgba(217,119,6,0.08)",
    },
    {
        icon: SchoolRoundedIcon,
        title: "Expert-Led Sessions",
        desc: "All workshops are delivered by working professionals and industry veterans with 5+ years of hands-on expertise.",
        color: "#0f766e",
        bg: "rgba(15,118,110,0.08)",
    },
];

const topics = [
    "Full Stack Web Development (React + Node.js)",
    "Software Testing & QA Automation",
    "AWS Cloud & DevOps Fundamentals",
    "Machine Learning & AI Basics",
    "Python for Data Science",
    "UI/UX Design Thinking",
    "Cybersecurity Essentials",
    "Git, GitHub & Agile Workflows",
];

function WorkshopDetailsSection() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
            <Container maxWidth="lg">
                <RevealBox>
                    <SectionLabel text="Our Workshops" color="#0891b2" />
                    <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Merriweather', Georgia, serif", mb: 1.5 }}>
                        Conducted <Box component="span" sx={{ color: "#0891b2" }}>Offline</Box>, Built for Impact
                    </Typography>
                    <Typography sx={{ color: "#475569", maxWidth: 580, lineHeight: 1.75, mb: { xs: 5, md: 7 } }}>
                        Every THAKSA workshop is a live, in-person experience at your campus — interactive, practical, and packed with industry insights that no online course can replicate.
                    </Typography>
                </RevealBox>

                <Grid container spacing={3} sx={{ mb: 7 }}>
                    {workshopDetails.map((d, i) => {
                        const Icon = d.icon;
                        return (
                            <Grid key={d.title} size={{ xs: 12, sm: 6, md: 3 }}>
                                <RevealBox delay={i * 100}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            border: "1.5px solid rgba(15,23,42,0.06)",
                                            borderRadius: 4,
                                            p: 3,
                                            height: "100%",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            "&:hover": { transform: "translateY(-6px)", boxShadow: "0 16px 32px rgba(15,23,42,0.08)" },
                                        }}
                                    >
                                        <Box sx={{ width: 52, height: 52, borderRadius: 3, bgcolor: d.bg, display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                                            <Icon sx={{ color: d.color, fontSize: 28 }} />
                                        </Box>
                                        <Typography sx={{ fontWeight: 800, color: "#0f172a", mb: 1, fontSize: "1rem" }}>{d.title}</Typography>
                                        <Typography sx={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.65 }}>{d.desc}</Typography>
                                    </Card>
                                </RevealBox>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Topics */}
                <RevealBox>
                    <Box sx={{ bgcolor: "rgba(99,102,241,0.04)", border: "1.5px solid rgba(99,102,241,0.12)", borderRadius: 4, p: { xs: 3, md: 4 } }}>
                        <Typography sx={{ fontWeight: 900, fontSize: "1.15rem", color: "#0f172a", mb: 2.5 }}>
                            🎯 Workshop Topics We Cover
                        </Typography>
                        <Grid container spacing={1.5}>
                            {topics.map((t) => (
                                <Grid key={t} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Stack direction="row" spacing={1.2} alignItems="center">
                                        <CheckCircleRoundedIcon sx={{ fontSize: 20, color: "#6366f1", flexShrink: 0 }} />
                                        <Typography sx={{ color: "#334155", fontSize: "0.92rem", fontWeight: 600 }}>{t}</Typography>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </RevealBox>
            </Container>
        </Box>
    );
}

// ───────────────────────────────────────────────
// SECTION 3 — TRUSTED COLLEGES
// ───────────────────────────────────────────────
const colleges = [
    { name: "JNTU Hyderabad", abbr: "JNTU", color: "#6366f1" },
    { name: "Osmania University", abbr: "OU", color: "#0891b2" },
    { name: "CMR College of Engineering", abbr: "CMR", color: "#d97706" },
    { name: "VNR VJIET", abbr: "VNR", color: "#0f766e" },
    { name: "CBIT Osmania", abbr: "CBIT", color: "#7c3aed" },
    { name: "Vasavi College of Engineering", abbr: "VCE", color: "#dc2626" },
    { name: "BVRIT Hyderabad", abbr: "BVRIT", color: "#0891b2" },
    { name: "Sreenidhi Institute of Science and Technology", abbr: "SNIST", color: "#16a34a" },
];

function TrustedCollegesSection() {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                background: "linear-gradient(180deg, #f8faff 0%, #eef6ff 100%)",
            }}
        >
            <Container maxWidth="lg">
                <RevealBox sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
                    <SectionLabel text="Our Reach" color="#6366f1" />
                    <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Merriweather', Georgia, serif", mb: 1.5 }}>
                        Trusted by{" "}
                        <Box component="span" sx={{ background: "linear-gradient(90deg,#6366f1,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Leading Colleges
                        </Box>
                    </Typography>
                    <Typography sx={{ color: "#475569", maxWidth: 520, mx: "auto", lineHeight: 1.7 }}>
                        THAKSA workshops have been conducted at premier engineering colleges across Hyderabad & Telangana, impacting thousands of students.
                    </Typography>
                </RevealBox>

                <Grid container spacing={2.5} justifyContent="center">
                    {colleges.map((c, i) => (
                        <Grid key={c.name} size={{ xs: 6, sm: 4, md: 3 }}>
                            <RevealBox delay={i * 80}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        borderRadius: 4,
                                        border: "1.5px solid rgba(15,23,42,0.06)",
                                        p: 3,
                                        textAlign: "center",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        bgcolor: "#fff",
                                        "&:hover": { transform: "translateY(-6px)", boxShadow: `0 16px 32px ${c.color}22` },
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            bgcolor: `${c.color}18`,
                                            color: c.color,
                                            fontWeight: 900,
                                            fontSize: "1rem",
                                            mx: "auto",
                                            mb: 1.5,
                                            border: `2px solid ${c.color}33`,
                                        }}
                                    >
                                        {c.abbr}
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a", lineHeight: 1.35 }}>
                                        {c.name}
                                    </Typography>
                                </Card>
                            </RevealBox>
                        </Grid>
                    ))}
                </Grid>

                {/* Stats row */}
                <RevealBox delay={200}>
                    <Grid container spacing={3} sx={{ mt: { xs: 5, md: 7 } }}>
                        {[
                            { value: "30+", label: "Colleges Reached" },
                            { value: "5000+", label: "Students Trained" },
                            { value: "98%", label: "Satisfaction Rate" },
                            { value: "50+", label: "Workshops Conducted" },
                        ].map((s) => (
                            <Grid key={s.label} size={{ xs: 6, md: 3 }}>
                                <Box sx={{ textAlign: "center", p: 2 }}>
                                    <Typography sx={{ fontWeight: 900, fontSize: { xs: "2.2rem", md: "2.8rem" }, background: "linear-gradient(90deg,#6366f1,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                        {s.value}
                                    </Typography>
                                    <Typography sx={{ color: "#64748b", fontWeight: 600, fontSize: "0.9rem" }}>{s.label}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </RevealBox>
            </Container>
        </Box>
    );
}

// ───────────────────────────────────────────────
// SECTION 4 — TESTIMONIALS
// ───────────────────────────────────────────────
const testimonials = [
    {
        name: "Priya Sharma",
        role: "Final Year CSE Student",
        college: "CBIT, Hyderabad",
        rating: 5,
        text: "The THAKSA workshop on Full Stack Development was absolutely mind-blowing! The hands-on sessions helped me build a real project in just 2 days. The mentors were incredibly approachable and explained everything clearly. Highly recommend to every engineering student!",
        avatar: "PS",
        color: "#6366f1",
    },
    {
        name: "Dr. M. Suresh Kumar",
        role: "HOD – Computer Science Department",
        college: "VNR VJIET, Hyderabad",
        rating: 5,
        text: "I have collaborated with several training organizations over the years, but THAKSA stands out for their professionalism and curriculum quality. Students who attended their workshops showed remarkable improvement in practical skills. We look forward to future collaborations.",
        avatar: "SK",
        color: "#0f766e",
    },
    {
        name: "Rahul Venkatesh",
        role: "B.Tech 3rd Year – ECE",
        college: "JNTU Hyderabad",
        rating: 5,
        text: "I came in with zero Python knowledge and left with a Machine Learning project in hand! The trainers are insanely talented and patient. The certificate also helped me get my first internship. THAKSA is the real deal!",
        avatar: "RV",
        color: "#d97706",
    },
    {
        name: "Prof. Anjali Reddy",
        role: "Associate Professor",
        college: "Osmania University",
        rating: 5,
        text: "Our college organized a DevOps workshop with THAKSA for 200+ students. The logistics were seamless, the content was industry-relevant, and student feedback was overwhelmingly positive. THAKSA truly delivers on their promises.",
        avatar: "AR",
        color: "#0891b2",
    },
];

function TestimonialsSection() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
            <Container maxWidth="lg">
                <RevealBox sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
                    <SectionLabel text="What People Say" color="#d97706" />
                    <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Merriweather', Georgia, serif", mb: 1.5 }}>
                        Students & Educators{" "}
                        <Box component="span" sx={{ color: "#d97706" }}>Love Us</Box>
                    </Typography>
                    <Typography sx={{ color: "#475569", maxWidth: 500, mx: "auto", lineHeight: 1.7 }}>
                        Thousands of students and faculty members have experienced THAKSA workshops. Here's what they have to say.
                    </Typography>
                </RevealBox>

                <Grid container spacing={3}>
                    {testimonials.map((t, i) => (
                        <Grid key={t.name} size={{ xs: 12, sm: 6 }}>
                            <RevealBox delay={i * 100}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        border: "1.5px solid rgba(15,23,42,0.06)",
                                        borderRadius: 4,
                                        p: { xs: 3, md: 3.5 },
                                        height: "100%",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": { transform: "translateY(-6px)", boxShadow: "0 20px 40px rgba(15,23,42,0.08)" },
                                    }}
                                >
                                    {/* Stars */}
                                    <Stack direction="row" spacing={0.3} sx={{ mb: 2 }}>
                                        {Array(t.rating).fill(null).map((_, si) => (
                                            <StarRoundedIcon key={si} sx={{ fontSize: 20, color: "#f59e0b" }} />
                                        ))}
                                    </Stack>

                                    <Typography sx={{ color: "#334155", lineHeight: 1.75, fontSize: "0.95rem", mb: 2.5, fontStyle: "italic" }}>
                                        "{t.text}"
                                    </Typography>

                                    <Divider sx={{ mb: 2 }} />

                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Avatar sx={{ bgcolor: `${t.color}18`, color: t.color, fontWeight: 900, border: `2px solid ${t.color}33` }}>
                                            {t.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography sx={{ fontWeight: 800, color: "#0f172a", fontSize: "0.92rem" }}>{t.name}</Typography>
                                            <Typography sx={{ color: "#64748b", fontSize: "0.8rem" }}>{t.role}</Typography>
                                            <Typography sx={{ color: t.color, fontSize: "0.78rem", fontWeight: 700 }}>{t.college}</Typography>
                                        </Box>
                                    </Stack>
                                </Card>
                            </RevealBox>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

// ───────────────────────────────────────────────
// SECTION 5 — THAKSA LOGO & MISSION
// ───────────────────────────────────────────────
function MissionSection() {
    return (
        <Box
            sx={{
                py: { xs: 10, md: 14 },
                background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
            }}
        >
            {/* Glow effects */}
            <Box sx={{ position: "absolute", top: "30%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", bottom: "10%", right: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,145,178,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

            <Container maxWidth="md" sx={{ position: "relative" }}>
                <RevealBox>
                    <Box
                        sx={{
                            width: { xs: 90, md: 120 },
                            height: { xs: 90, md: 120 },
                            borderRadius: "28px",
                            background: "linear-gradient(135deg,#6366f1,#0891b2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 4,
                            boxShadow: "0 24px 56px rgba(99,102,241,0.5)",
                            animation: "pulse 3s ease-in-out infinite",
                            "@keyframes pulse": {
                                "0%,100%": { boxShadow: "0 24px 56px rgba(99,102,241,0.5)" },
                                "50%": { boxShadow: "0 32px 72px rgba(99,102,241,0.7)" },
                            },
                        }}
                    >
                        <Typography sx={{ fontWeight: 900, fontSize: { xs: "2.2rem", md: "3rem" }, color: "#fff", fontFamily: "'Merriweather', Georgia, serif" }}>
                            T
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: "2.5rem", md: "4rem" },
                            color: "#fff",
                            fontFamily: "'Merriweather', Georgia, serif",
                            letterSpacing: "-0.02em",
                            mb: 1,
                        }}
                    >
                        THAKSA
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            color: "rgba(255,255,255,0.6)",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            mb: 4,
                        }}
                    >
                        Academy
                    </Typography>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1.4rem", md: "2rem" },
                            color: "rgba(255,255,255,0.92)",
                            lineHeight: 1.5,
                            mb: 2,
                        }}
                    >
                        "Transforming Aspirants into{" "}
                        <Box component="span" sx={{ background: "linear-gradient(90deg,#a5b4fc,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Industry Professionals
                        </Box>
                        "
                    </Typography>

                    <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: 580, mx: "auto", lineHeight: 1.8 }}>
                        At THAKSA, we believe every student deserves the opportunity to work on real problems, guided by real experts, in a real environment. Our mission is to democratize industry-grade education for engineering students across India.
                    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ mt: 5 }}>
                        {["Real Skills", "Real Mentors", "Real Growth"].map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                sx={{
                                    bgcolor: "rgba(255,255,255,0.08)",
                                    color: "rgba(255,255,255,0.85)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    fontWeight: 700,
                                    fontSize: "0.88rem",
                                    px: 1,
                                    py: 2.5,
                                    backdropFilter: "blur(8px)",
                                }}
                            />
                        ))}
                    </Stack>
                </RevealBox>
            </Container>
        </Box>
    );
}

// ───────────────────────────────────────────────
// SECTION 6 — FAQs
// ───────────────────────────────────────────────
const faqs = [
    {
        q: "How can my college organize a THAKSA workshop?",
        a: "It's simple! Reach out via WhatsApp or email with your college details, preferred dates, and expected student count. Our team will get back to you within 24 hours to discuss the workshop format and logistics.",
    },
    {
        q: "Are the workshops conducted online or offline?",
        a: "All THAKSA workshops are conducted in offline (in-person) mode at your college campus. We believe hands-on learning requires real interaction, and our offline format ensures maximum engagement and impact.",
    },
    {
        q: "What is the minimum batch size for a workshop?",
        a: "We typically conduct workshops for groups of 30–300+ students. We can customize the format and content based on your batch size and the specific requirements of your department.",
    },
    {
        q: "What topics/domains does THAKSA cover?",
        a: "We offer workshops in Full Stack Development, Software Testing & QA, AWS DevOps, Machine Learning & AI, Python, UI/UX Design, Cybersecurity, and more. We also offer custom workshops tailored to your curriculum.",
    },
    {
        q: "Will students receive certificates?",
        a: "Yes! Every participant who completes the workshop receives a Certificate of Participation co-branded with THAKSA Academy. Certificates are issued digitally and can also be provided in printed format.",
    },
    {
        q: "What is the cost of conducting a workshop?",
        a: "Workshop pricing depends on the duration (1-day, 2-day, or 3-day), the topic, and the number of students. Please contact us for a customized quote — we offer very competitive pricing tailored to educational institutions.",
    },
    {
        q: "Can students join individually if their college hasn't partnered with THAKSA?",
        a: "Yes! Individual students can register for our open workshops. Check our training & placement page for upcoming individual cohort programs, or contact us directly to get notified of the next batch.",
    },
];

function FaqsSection() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f8faff" }}>
            <Container maxWidth="md">
                <RevealBox sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
                    <SectionLabel text="Frequently Asked Questions" color="#0f766e" />
                    <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Merriweather', Georgia, serif", mb: 1.5 }}>
                        Got Questions?{" "}
                        <Box component="span" sx={{ color: "#0f766e" }}>We Have Answers.</Box>
                    </Typography>
                </RevealBox>

                <Box>
                    {faqs.map((faq, i) => (
                        <RevealBox key={faq.q} delay={i * 60}>
                            <Accordion
                                elevation={0}
                                disableGutters
                                sx={{
                                    border: "1.5px solid rgba(15,23,42,0.07)",
                                    borderRadius: "16px !important",
                                    mb: 1.5,
                                    overflow: "hidden",
                                    "&:before": { display: "none" },
                                    "&.Mui-expanded": { boxShadow: "0 8px 24px rgba(15,23,42,0.08)" },
                                    transition: "box-shadow 0.3s ease",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: "#6366f1" }} />}
                                    sx={{ px: 3, py: 1.5, "&.Mui-expanded": { bgcolor: "rgba(99,102,241,0.03)" } }}
                                >
                                    <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.97rem" }}>
                                        {faq.q}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
                                    <Typography sx={{ color: "#475569", lineHeight: 1.75, fontSize: "0.93rem" }}>
                                        {faq.a}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </RevealBox>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

// ───────────────────────────────────────────────
// SECTION 7 — CONTACT
// ───────────────────────────────────────────────
function ContactSection() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RevealBox direction="left">
                            <SectionLabel text="Get In Touch" color="#6366f1" />
                            <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Merriweather', Georgia, serif", mb: 1.5 }}>
                                Let's Bring a Workshop{" "}
                                <Box component="span" sx={{ color: "#6366f1" }}>to Your Campus</Box>
                            </Typography>
                            <Typography sx={{ color: "#475569", lineHeight: 1.75, mb: 4 }}>
                                Ready to transform how your students learn? Reach out and our team will plan the perfect workshop tailored to your college's needs — within 24 hours.
                            </Typography>

                            <Stack spacing={2.5}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "rgba(37,211,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <WhatsAppIcon sx={{ color: "#25D366", fontSize: 26 }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>WhatsApp Us</Typography>
                                        <Typography
                                            component="a"
                                            href="https://wa.me/919908597337"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ color: "#25D366", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                                        >
                                            +91 99085 97337
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <PhoneRoundedIcon sx={{ color: "#6366f1", fontSize: 24 }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>Call Us</Typography>
                                        <Typography
                                            component="a"
                                            href="tel:+919908597337"
                                            sx={{ color: "#6366f1", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                                        >
                                            +91 99085 97337
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "rgba(8,145,178,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <EmailRoundedIcon sx={{ color: "#0891b2", fontSize: 24 }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>Email Us</Typography>
                                        <Typography
                                            component="a"
                                            href="mailto:info@thaksa.in"
                                            sx={{ color: "#0891b2", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                                        >
                                            info@thaksa.in
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "rgba(217,119,6,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <LocationOnRoundedIcon sx={{ color: "#d97706", fontSize: 24 }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>Our Location</Typography>
                                        <Typography sx={{ color: "#475569", fontWeight: 600, fontSize: "0.93rem" }}>
                                            Hyderabad, Telangana, India
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </RevealBox>
                    </Grid>

                    {/* CTA box */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RevealBox direction="right" delay={150}>
                            <Box
                                sx={{
                                    borderRadius: 5,
                                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
                                    p: { xs: 4, md: 5 },
                                    textAlign: "center",
                                    boxShadow: "0 32px 64px rgba(15,23,42,0.2)",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 72,
                                        height: 72,
                                        borderRadius: "50%",
                                        bgcolor: "rgba(37,211,102,0.15)",
                                        border: "2px solid rgba(37,211,102,0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mx: "auto",
                                        mb: 3,
                                        animation: "popBob 2s ease-in-out infinite",
                                        "@keyframes popBob": {
                                            "0%,100%": { transform: "scale(1)" },
                                            "50%": { transform: "scale(1.08)" },
                                        },
                                    }}
                                >
                                    <WhatsAppIcon sx={{ color: "#25D366", fontSize: 36 }} />
                                </Box>
                                <Typography sx={{ fontWeight: 900, fontSize: "1.5rem", color: "#fff", mb: 1, fontFamily: "'Merriweather', Georgia, serif" }}>
                                    Start a Conversation
                                </Typography>
                                <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 3.5, lineHeight: 1.7 }}>
                                    Tap the button below to chat with us on WhatsApp. We respond within minutes!
                                </Typography>
                                <Box
                                    component="a"
                                    href="https://wa.me/919908597337?text=Hi%20THAKSA%2C%20I'm%20interested%20in%20organizing%20a%20workshop%20at%20our%20college."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        bgcolor: "#25D366",
                                        color: "#fff",
                                        fontWeight: 800,
                                        fontSize: "1.05rem",
                                        textDecoration: "none",
                                        px: 4,
                                        py: 1.8,
                                        borderRadius: 3,
                                        boxShadow: "0 12px 28px rgba(37,211,102,0.4)",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 20px 40px rgba(37,211,102,0.5)" },
                                    }}
                                >
                                    <WhatsAppIcon sx={{ fontSize: 24 }} />
                                    Chat on WhatsApp
                                </Box>
                                <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", mt: 2.5 }}>
                                    +91 99085 97337 · Mon–Sat, 9 AM–7 PM IST
                                </Typography>
                            </Box>
                        </RevealBox>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// ───────────────────────────────────────────────
// WHATSAPP FLOATING BUTTON
// ───────────────────────────────────────────────
function WhatsAppFloat() {
    const [pulse, setPulse] = useState(false);
    useEffect(() => {
        const t = setInterval(() => setPulse((p) => !p), 2500);
        return () => clearInterval(t);
    }, []);

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: { xs: 20, md: 28 },
                right: { xs: 18, md: 28 },
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 1.5,
            }}
        >
            {/* Call button */}
            <IconButton
                component="a"
                href="tel:+919908597337"
                sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "#6366f1",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(99,102,241,0.45)",
                    transition: "transform 0.2s ease",
                    "&:hover": { bgcolor: "#4f46e5", transform: "scale(1.12)" },
                }}
            >
                <PhoneRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>

            {/* WhatsApp button */}
            <Box sx={{ position: "relative" }}>
                {pulse && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: -8,
                            borderRadius: "50%",
                            border: "2px solid rgba(37,211,102,0.5)",
                            animation: "ripple 1s ease-out",
                            "@keyframes ripple": {
                                "0%": { opacity: 1, transform: "scale(0.9)" },
                                "100%": { opacity: 0, transform: "scale(1.5)" },
                            },
                        }}
                    />
                )}
                <IconButton
                    component="a"
                    href="https://wa.me/919908597337?text=Hi%20THAKSA%2C%20I'm%20interested%20in%20your%20workshops!"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "#25D366",
                        color: "#fff",
                        boxShadow: "0 8px 28px rgba(37,211,102,0.5)",
                        transition: "transform 0.2s ease",
                        "&:hover": { bgcolor: "#1ebe58", transform: "scale(1.12)" },
                    }}
                >
                    <WhatsAppIcon sx={{ fontSize: 30 }} />
                </IconButton>
            </Box>
        </Box>
    );
}

// ───────────────────────────────────────────────
// PAGE HERO BANNER
// ───────────────────────────────────────────────
function PageHero() {
    return (
        <Box
            sx={{
                py: { xs: 6, md: 8 },
                background: "linear-gradient(135deg, #eef2ff 0%, #f0f9ff 100%)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                textAlign: "center",
            }}
        >
            <Container maxWidth="md">
                <Chip
                    label="Offline · Hands-On · Industry-Led"
                    sx={{ bgcolor: "rgba(99,102,241,0.1)", color: "#6366f1", fontWeight: 700, mb: 2, fontSize: "0.82rem" }}
                />
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: "2.2rem", md: "3.4rem" },
                        color: "#0f172a",
                        fontFamily: "'Merriweather', Georgia, serif",
                        lineHeight: 1.12,
                        mb: 1.5,
                    }}
                >
                    THAKSA Workshops
                </Typography>
                <Typography sx={{ color: "#475569", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.75, maxWidth: 560, mx: "auto" }}>
                    Immersive, offline workshop experiences delivered at your college campus by industry professionals. Built to make students genuinely job-ready.
                </Typography>
            </Container>
        </Box>
    );
}

// ───────────────────────────────────────────────
// MAIN PAGE
// ───────────────────────────────────────────────
export default function WorkshopPage() {
    return (
        <Box sx={{ bgcolor: "#fff" }}>
            <PageHero />
            <FoundersSection />
            <WorkshopDetailsSection />
            <TrustedCollegesSection />
            <TestimonialsSection />
            <MissionSection />
            <FaqsSection />
            <ContactSection />
            <WhatsAppFloat />
        </Box>
    );
}
