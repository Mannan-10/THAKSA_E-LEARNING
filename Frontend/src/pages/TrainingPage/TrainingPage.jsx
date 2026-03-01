import { useEffect, useRef, useState } from "react";
import {
    Box, Container, Typography, Grid, Stack, Chip, Card, Avatar, Divider, IconButton,
} from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function RevealBox({ children, delay = 0, direction = "up", sx = {} }) {
    const { ref, visible } = useReveal();
    const t = { up: visible ? "translateY(0)" : "translateY(48px)", left: visible ? "translateX(0)" : "translateX(-48px)", right: visible ? "translateX(0)" : "translateX(48px)" };
    return (
        <Box ref={ref} sx={{ opacity: visible ? 1 : 0, transform: t[direction], transition: `all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`, ...sx }}>
            {children}
        </Box>
    );
}

const phases = [
    { num: "01", title: "Aptitude & Logical Reasoning", desc: "Intensive sessions covering quantitative aptitude, verbal reasoning, and logical thinking — the foundation for every placement test.", color: "#6366f1" },
    { num: "02", title: "Technical Skill Building", desc: "Domain-specific coding, DSA, system design, and debugging workshops aligned with top company hiring patterns.", color: "#0891b2" },
    { num: "03", title: "Soft Skills & Interview Prep", desc: "Communication mastery, group discussion practice, HR interview simulations, and resume building with industry experts.", color: "#0f766e" },
    { num: "04", title: "Mock Interviews & Feedback", desc: "Real-time 1-on-1 mock interviews with professionals followed by detailed personalized feedback sessions.", color: "#d97706" },
    { num: "05", title: "Placement Drive", desc: "Dedicated placement drives with THAKSA's network of 100+ hiring partners across IT, product, and service companies.", color: "#dc2626" },
];

const outcomes = [
    { value: "500+", label: "Students Placed", color: "#6366f1" },
    { value: "100+", label: "Hiring Partners", color: "#0891b2" },
    { value: "85%", label: "Placement Rate", color: "#0f766e" },
    { value: "4.8 LPA", label: "Avg. Package", color: "#d97706" },
];

const companies = ["TCS", "Infosys", "Wipro", "HCL", "Cognizant", "Capgemini", "Tech Mahindra", "Accenture"];

const testimonials = [
    { name: "Aditya Kumar", role: "Placed at TCS | ECE Graduate", text: "THAKSA's placement program completely changed my trajectory. From zero confidence to cracking TCS in 3 months — the mock interviews were incredibly realistic!", rating: 5, avatar: "AK", color: "#6366f1" },
    { name: "Keerthi Nair", role: "Placed at Infosys | CSE Graduate", text: "The structured approach to aptitude and technical prep was game-changing. The mentors knew exactly what companies look for. Got placed in my dream company!", rating: 5, avatar: "KN", color: "#0f766e" },
];

function WhatsAppFloat() {
    return (
        <Box sx={{ position: "fixed", bottom: { xs: 20, md: 28 }, right: { xs: 18, md: 28 }, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1.5 }}>
            <IconButton component="a" href="tel:+919908597337" sx={{ width: 50, height: 50, bgcolor: "#6366f1", color: "#fff", boxShadow: "0 8px 24px rgba(99,102,241,0.45)", "&:hover": { bgcolor: "#4f46e5", transform: "scale(1.12)" }, transition: "transform 0.2s" }}>
                <PhoneRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <IconButton component="a" href="https://wa.me/919908597337?text=Hi%20THAKSA%2C%20I'm%20interested%20in%20the%20Training%20%26%20Placement%20program!" target="_blank" rel="noopener noreferrer" sx={{ width: 60, height: 60, bgcolor: "#25D366", color: "#fff", boxShadow: "0 8px 28px rgba(37,211,102,0.5)", "&:hover": { bgcolor: "#1ebe58", transform: "scale(1.12)" }, transition: "transform 0.2s" }}>
                <WhatsAppIcon sx={{ fontSize: 30 }} />
            </IconButton>
        </Box>
    );
}

export default function TrainingPage() {
    return (
        <Box sx={{ bgcolor: "#fff" }}>
            {/* Hero */}
            <Box sx={{ py: { xs: 8, md: 12 }, background: "linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 50%, #f0f9ff 100%)", borderBottom: "1px solid rgba(15,23,42,0.06)", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: -80, left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,118,110,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
                <Container maxWidth="md" sx={{ position: "relative" }}>
                    <RevealBox>
                        <Box sx={{ width: 80, height: 80, borderRadius: "24px", background: "linear-gradient(135deg,#0f766e,#0891b2)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3, boxShadow: "0 16px 40px rgba(15,118,110,0.4)" }}>
                            <WorkspacePremiumRoundedIcon sx={{ color: "#fff", fontSize: 40 }} />
                        </Box>
                        <Chip label="Career Launch Program" sx={{ bgcolor: "rgba(15,118,110,0.1)", color: "#0f766e", fontWeight: 700, mb: 2 }} />
                        <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.2rem", md: "3.5rem" }, color: "#0f172a", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", lineHeight: 1.1, mb: 2 }}>
                            Training &{" "}
                            <Box component="span" sx={{ background: "linear-gradient(90deg,#0f766e,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Placement
                            </Box>
                        </Typography>
                        <Typography sx={{ color: "#475569", fontSize: { xs: "1rem", md: "1.1rem" }, maxWidth: 540, mx: "auto", lineHeight: 1.75 }}>
                            A comprehensive, end-to-end placement preparation program that transforms students into confident professionals, ready to crack any campus drive or off-campus placement.
                        </Typography>
                    </RevealBox>
                </Container>
            </Box>

            {/* Outcomes */}
            <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#fff" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {outcomes.map((o, i) => (
                            <Grid key={o.label} size={{ xs: 6, md: 3 }}>
                                <RevealBox delay={i * 80}>
                                    <Box sx={{ textAlign: "center", p: 3, border: "1.5px solid rgba(15,23,42,0.06)", borderRadius: 4, "&:hover": { boxShadow: "0 12px 28px rgba(15,23,42,0.08)" }, transition: "box-shadow 0.3s" }}>
                                        <Typography sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.8rem" }, background: `linear-gradient(135deg,${o.color},${o.color}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{o.value}</Typography>
                                        <Typography sx={{ color: "#64748b", fontWeight: 600, fontSize: "0.88rem" }}>{o.label}</Typography>
                                    </Box>
                                </RevealBox>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Program Phases */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f8faff" }}>
                <Container maxWidth="lg">
                    <RevealBox sx={{ mb: { xs: 5, md: 7 } }}>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.12em", mb: 1.5 }}>Program Roadmap</Typography>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", mb: 1.5 }}>
                            Your Journey to{" "}
                            <Box component="span" sx={{ color: "#0f766e" }}>Getting Placed</Box>
                        </Typography>
                        <Typography sx={{ color: "#475569", maxWidth: 560, lineHeight: 1.75 }}>
                            A structured 5-phase program designed to take you from where you are today to where you want to be — placed at your dream company.
                        </Typography>
                    </RevealBox>
                    <Stack spacing={2.5}>
                        {phases.map((phase, i) => (
                            <RevealBox key={phase.num} delay={i * 80}>
                                <Card elevation={0} sx={{ border: "1.5px solid rgba(15,23,42,0.06)", borderRadius: 4, p: { xs: 2.5, md: 3.5 }, transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateX(8px)", boxShadow: "0 12px 28px rgba(15,23,42,0.08)" } }}>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ xs: "flex-start", sm: "center" }}>
                                        <Box sx={{ width: 60, height: 60, borderRadius: 3, bgcolor: `${phase.color}15`, border: `2px solid ${phase.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <Typography sx={{ fontWeight: 900, color: phase.color, fontSize: "1.1rem" }}>{phase.num}</Typography>
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography sx={{ fontWeight: 800, color: "#0f172a", fontSize: "1.05rem", mb: 0.5 }}>{phase.title}</Typography>
                                            <Typography sx={{ color: "#64748b", fontSize: "0.92rem", lineHeight: 1.65 }}>{phase.desc}</Typography>
                                        </Box>
                                        <CheckCircleRoundedIcon sx={{ color: phase.color, fontSize: 28, flexShrink: 0, display: { xs: "none", sm: "block" } }} />
                                    </Stack>
                                </Card>
                            </RevealBox>
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* Hiring Partners */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
                <Container maxWidth="lg">
                    <RevealBox sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", color: "#0891b2", textTransform: "uppercase", letterSpacing: "0.12em", mb: 1.5 }}>Our Network</Typography>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", mb: 1.5 }}>
                            Hiring{" "}
                            <Box component="span" sx={{ background: "linear-gradient(90deg,#0891b2,#0f766e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Partners</Box>
                        </Typography>
                        <Typography sx={{ color: "#475569", maxWidth: 480, mx: "auto", lineHeight: 1.7 }}>
                            Our graduates have been placed in India's top IT and product companies through our expanding hiring network.
                        </Typography>
                    </RevealBox>
                    <Grid container spacing={2.5} justifyContent="center">
                        {companies.map((c, i) => (
                            <Grid key={c} size={{ xs: 6, sm: 4, md: 3 }}>
                                <RevealBox delay={i * 70}>
                                    <Box sx={{ border: "1.5px solid rgba(15,23,42,0.08)", borderRadius: 3, p: 2.5, textAlign: "center", transition: "all 0.3s", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 24px rgba(15,23,42,0.08)", borderColor: "rgba(15,118,110,0.3)" } }}>
                                        <Box sx={{ width: 52, height: 52, borderRadius: "50%", bgcolor: "rgba(15,118,110,0.08)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1.5 }}>
                                            <BusinessRoundedIcon sx={{ color: "#0f766e", fontSize: 26 }} />
                                        </Box>
                                        <Typography sx={{ fontWeight: 800, color: "#0f172a", fontSize: "0.9rem" }}>{c}</Typography>
                                    </Box>
                                </RevealBox>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials */}
            <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "#f8faff" }}>
                <Container maxWidth="lg">
                    <RevealBox sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.8rem", md: "2.6rem" }, color: "#0f172a", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", mb: 1 }}>
                            Placement{" "}
                            <Box component="span" sx={{ color: "#0f766e" }}>Success Stories</Box>
                        </Typography>
                    </RevealBox>
                    <Grid container spacing={3}>
                        {testimonials.map((t, i) => (
                            <Grid key={t.name} size={{ xs: 12, md: 6 }}>
                                <RevealBox delay={i * 120}>
                                    <Card elevation={0} sx={{ border: "1.5px solid rgba(15,23,42,0.06)", borderRadius: 4, p: { xs: 3, md: 3.5 }, height: "100%", "&:hover": { boxShadow: "0 16px 32px rgba(15,23,42,0.08)" }, transition: "box-shadow 0.3s" }}>
                                        <Stack direction="row" sx={{ mb: 1.5 }}>{Array(t.rating).fill(null).map((_, si) => <StarRoundedIcon key={si} sx={{ fontSize: 18, color: "#f59e0b" }} />)}</Stack>
                                        <Typography sx={{ color: "#334155", lineHeight: 1.75, fontSize: "0.95rem", mb: 2.5, fontStyle: "italic" }}>"{t.text}"</Typography>
                                        <Divider sx={{ mb: 2 }} />
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <Avatar sx={{ bgcolor: `${t.color}18`, color: t.color, fontWeight: 900, border: `2px solid ${t.color}33` }}>{t.avatar}</Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: 800, color: "#0f172a", fontSize: "0.92rem" }}>{t.name}</Typography>
                                                <Typography sx={{ color: t.color, fontSize: "0.8rem", fontWeight: 700 }}>{t.role}</Typography>
                                            </Box>
                                        </Stack>
                                    </Card>
                                </RevealBox>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA */}
            <Box sx={{ py: { xs: 8, md: 12 }, background: "linear-gradient(135deg,#0f172a 0%,#134e4a 100%)", textAlign: "center" }}>
                <Container maxWidth="sm">
                    <RevealBox>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.8rem" }, color: "#fff", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", mb: 2 }}>
                            Ready to Get{" "}
                            <Box component="span" sx={{ background: "linear-gradient(90deg,#6ee7b7,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Placed?</Box>
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.65)", mb: 4, lineHeight: 1.75 }}>
                            Join THAKSA's Training & Placement program and take the first step towards your dream career. Contact us on WhatsApp now!
                        </Typography>
                        <Box component="a" href="https://wa.me/919908597337?text=Hi%20THAKSA%2C%20I'm%20interested%20in%20Training%20%26%20Placement%20program!" target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, bgcolor: "#25D366", color: "#fff", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", px: 4, py: 1.8, borderRadius: 3, boxShadow: "0 12px 28px rgba(37,211,102,0.4)", transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 20px 40px rgba(37,211,102,0.5)" } }}>
                            <WhatsAppIcon sx={{ fontSize: 24 }} /> Chat on WhatsApp
                        </Box>
                    </RevealBox>
                </Container>
            </Box>

            <WhatsAppFloat />
        </Box>
    );
}
