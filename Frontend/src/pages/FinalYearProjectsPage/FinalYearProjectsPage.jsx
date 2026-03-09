import { useEffect, useRef, useState } from "react";
import {
    Box, Container, Typography, Grid, Stack, Chip, Card, Avatar, Divider, IconButton,
} from "@mui/material";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

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

const domains = [
    { icon: SmartToyRoundedIcon, title: "Artificial Intelligence & ML", desc: "Build smart models, recommendation systems, NLP apps, and computer vision projects with real datasets.", color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
    { icon: DataObjectRoundedIcon, title: "Full Stack Web Development", desc: "End-to-end web applications with React, Node.js, MongoDB - production-grade code with deployment.", color: "#0891b2", bg: "rgba(8,145,178,0.08)" },
    { icon: CloudRoundedIcon, title: "Cloud & DevOps", desc: "AWS/Azure-hosted projects with CI/CD pipelines, containerization, and infrastructure as code.", color: "#0f766e", bg: "rgba(15,118,110,0.08)" },
    { icon: SecurityRoundedIcon, title: "Cybersecurity", desc: "Penetration testing tools, vulnerability scanners, network security monitors, and ethical hacking projects.", color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
    { icon: MemoryRoundedIcon, title: "IoT & Embedded Systems", desc: "Smart home automation, sensor networks, Arduino/Raspberry Pi-based systems with real-time dashboards.", color: "#d97706", bg: "rgba(217,119,6,0.08)" },
    { icon: StorageRoundedIcon, title: "Data Science & Analytics", desc: "Data pipelines, EDA, visualization dashboards, and predictive analytics projects with actionable insights.", color: "#7c3aed", bg: "rgba(124,58,237,0.08)" },
];

const process = [
    { step: "01", icon: "🎯", title: "Topic Selection & Feasibility", desc: "Choose from 200+ curated project ideas or pitch your own. We assess feasibility and align it with industry trends.", color: "#6366f1" },
    { step: "02", icon: "📋", title: "Requirements & System Design", desc: "Define scope, architecture, tech stack, and timeline. We prepare a detailed project proposal (SRS document).", color: "#0891b2" },
    { step: "03", icon: "💻", title: "Guided Development", desc: "Bi-weekly mentor check-ins, code reviews, and hands-on help at every stage of your project implementation.", color: "#0f766e" },
    { step: "04", icon: "📄", title: "IEEE-Standard Documentation", desc: "Professional abstract, report, and presentation preparation that meets university and publication standards.", color: "#d97706" },
    { step: "05", icon: "🚀", title: "Final Presentation & Demo", desc: "Practice your live demo with our mentors, refine your Q&A responses, and ace your project viva.", color: "#dc2626" },
];

const testimonials = [
    { name: "Sai Charan", role: "B.Tech Final Year, CSE | JNTU", text: "My AI-based attendance system built under THAKSA guidance scored 95/100 in the viva! The mentors helped me with everything from coding to documentation. Couldn't have done it without them.", rating: 5, avatar: "SC", color: "#6366f1" },
    { name: "Lakshmi Devi", role: "B.Tech Final Year, ECE | Osmania", text: "The IoT smart home project I built with THAKSA's guidance won the Best Project award at our college fest! The step-by-step support was amazing. THAKSA team is incredibly dedicated.", rating: 5, avatar: "LD", color: "#d97706" },
];

function WhatsAppFloat() {
    return (
        <Box sx={{ position: "fixed", bottom: { xs: 20, md: 28 }, right: { xs: 18, md: 28 }, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1.5 }}>
            <IconButton component="a" href="tel:+919908597337" sx={{ width: 50, height: 50, bgcolor: "#6366f1", color: "#fff", boxShadow: "0 8px 24px rgba(99,102,241,0.45)", "&:hover": { bgcolor: "#4f46e5", transform: "scale(1.12)" }, transition: "transform 0.2s" }}>
                <PhoneRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <IconButton component="a" href="https://wa.me/919908597337?text=Hi%20THAKSA%2C%20I'm%20interested%20in%20Final%20Year%20Project%20guidance!" target="_blank" rel="noopener noreferrer" sx={{ width: 60, height: 60, bgcolor: "#25D366", color: "#fff", boxShadow: "0 8px 28px rgba(37,211,102,0.5)", "&:hover": { bgcolor: "#1ebe58", transform: "scale(1.12)" }, transition: "transform 0.2s" }}>
                <WhatsAppIcon sx={{ fontSize: 30 }} />
            </IconButton>
        </Box>
    );
}

export default function FinalYearProjectsPage() {
    return (
        <Box sx={{ bgcolor: "#fff" }}>
            {/* Hero */}
            <Box sx={{ py: { xs: 8, md: 12 }, background: "linear-gradient(135deg,#fff7ed 0%,#fef9ee 50%,#fff7ed 100%)", borderBottom: "1px solid rgba(15,23,42,0.06)", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: -80, right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(217,119,6,0.15) 0%,transparent 70%)", pointerEvents: "none" }} />
                <Container maxWidth="md" sx={{ position: "relative" }}>
                    <RevealBox>
                        <Box sx={{ width: 80, height: 80, borderRadius: "24px", background: "linear-gradient(135deg,#d97706,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3, boxShadow: "0 16px 40px rgba(217,119,6,0.4)" }}>
                            <RocketLaunchRoundedIcon sx={{ color: "#fff", fontSize: 40 }} />
                        </Box>
                        <Chip label="Guided Build | Documentation | Viva Support" sx={{ bgcolor: "rgba(217,119,6,0.1)", color: "#d97706", fontWeight: 700, mb: 2 }} />
                        <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.2rem", md: "3.5rem" }, color: "#0f172a", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", lineHeight: 1.1, mb: 2 }}>
                            Final Year{" "}
                            <Box component="span" sx={{ background: "linear-gradient(90deg,#d97706,#ea580c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Projects
                            </Box>
                        </Typography>
                        <Typography sx={{ color: "#475569", fontSize: { xs: "1rem", md: "1.1rem" }, maxWidth: 560, mx: "auto", lineHeight: 1.75 }}>
                            Build your final year project with clear guidance from topic selection to implementation, documentation, and viva preparation.
                        </Typography>
                    </RevealBox>
                </Container>
            </Box>

            {/* Stats */}
            <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#fff" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {[
                            { value: "200+", label: "Project Topics", color: "#d97706" },
                            { value: "300+", label: "Projects Delivered", color: "#ea580c" },
                            { value: "100%", label: "On-Time Delivery", color: "#0f766e" },
                            { value: "4.9/5", label: "Student Rating", color: "#6366f1" },
                        ].map((s, i) => (
                            <Grid key={s.label} size={{ xs: 6, md: 3 }}>
                                <RevealBox delay={i * 80}>
                                    <Box sx={{ textAlign: "center", p: 3, border: "1.5px solid rgba(15,23,42,0.06)", borderRadius: 4, "&:hover": { boxShadow: "0 12px 28px rgba(15,23,42,0.08)" }, transition: "box-shadow 0.3s" }}>
                                        <Typography sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.8rem" }, background: `linear-gradient(135deg,${s.color},${s.color}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</Typography>
                                        <Typography sx={{ color: "#64748b", fontWeight: 600, fontSize: "0.88rem" }}>{s.label}</Typography>
                                    </Box>
                                </RevealBox>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Domains */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fafafa" }}>
                <Container maxWidth="lg">
                    <RevealBox sx={{ mb: { xs: 5, md: 7 } }}>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", color: "#d97706", textTransform: "uppercase", letterSpacing: "0.12em", mb: 1.5 }}>Project Domains</Typography>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", mb: 1.5 }}>
                            Pick Your{" "}
                            <Box component="span" sx={{ color: "#d97706" }}>Domain of Interest</Box>
                        </Typography>
                        <Typography sx={{ color: "#475569", maxWidth: 540, lineHeight: 1.75 }}>
                            Choose from six practical project domains based on your interest, available timeline, and academic requirements.
                        </Typography>
                    </RevealBox>
                    <Grid container spacing={2.5}>
                        {domains.map((d, i) => {
                            const Icon = d.icon;
                            return (
                                <Grid key={d.title} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <RevealBox delay={i * 90}>
                                        <Card elevation={0} sx={{ border: "1.5px solid rgba(15,23,42,0.06)", borderRadius: 4, p: 3, height: "100%", transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateY(-6px)", boxShadow: "0 16px 32px rgba(15,23,42,0.08)" } }}>
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
                </Container>
            </Box>

            {/* Process */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
                <Container maxWidth="lg">
                    <RevealBox sx={{ mb: { xs: 5, md: 7 } }}>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.12em", mb: 1.5 }}>How It Works</Typography>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, color: "#0f172a", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", mb: 1.5 }}>
                            From Idea to{" "}
                            <Box component="span" sx={{ background: "linear-gradient(90deg,#0f766e,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Viva-Ready</Box>
                        </Typography>
                        <Typography sx={{ color: "#475569", maxWidth: 520, lineHeight: 1.75 }}>A simple 5-step process to keep your work organized, reviewable, and ready for final evaluation.</Typography>
                    </RevealBox>
                    <Stack spacing={2.5}>
                        {process.map((p, i) => (
                            <RevealBox key={p.step} delay={i * 80}>
                                <Card elevation={0} sx={{ border: "1.5px solid rgba(15,23,42,0.06)", borderRadius: 4, p: { xs: 2.5, md: 3.5 }, transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateX(8px)", boxShadow: "0 12px 28px rgba(15,23,42,0.08)" } }}>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ xs: "flex-start", sm: "center" }}>
                                        <Box sx={{ flexShrink: 0, textAlign: "center" }}>
                                            <Typography sx={{ fontSize: "2rem", mb: 0.5 }}>{p.icon}</Typography>
                                            <Typography sx={{ fontWeight: 900, color: p.color, fontSize: "0.8rem" }}>{p.step}</Typography>
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography sx={{ fontWeight: 800, color: "#0f172a", fontSize: "1.05rem", mb: 0.5 }}>{p.title}</Typography>
                                            <Typography sx={{ color: "#64748b", fontSize: "0.92rem", lineHeight: 1.65 }}>{p.desc}</Typography>
                                        </Box>
                                        <CheckCircleRoundedIcon sx={{ color: p.color, fontSize: 28, flexShrink: 0, display: { xs: "none", sm: "block" } }} />
                                    </Stack>
                                </Card>
                            </RevealBox>
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* Testimonials */}
            <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "#fff7ed" }}>
                <Container maxWidth="lg">
                    <RevealBox sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.8rem", md: "2.6rem" }, color: "#0f172a", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", mb: 1 }}>
                            Project{" "}
                            <Box component="span" sx={{ color: "#d97706" }}>Success Stories</Box>
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
            <Box sx={{ py: { xs: 8, md: 12 }, background: "linear-gradient(135deg,#0f172a 0%,#1c1007 100%)", textAlign: "center" }}>
                <Container maxWidth="sm">
                    <RevealBox>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.8rem" }, color: "#fff", fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif", mb: 2 }}>
                            Start Your{" "}
                            <Box component="span" sx={{ background: "linear-gradient(90deg,#fcd34d,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Project Journey</Box>
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.65)", mb: 4, lineHeight: 1.75 }}>
                            If you need support for your final year project, contact us and we will guide you step by step.
                        </Typography>
                        <Box component="a" href="https://wa.me/919908597337?text=Hi%20THAKSA%2C%20I%20need%20help%20with%20my%20Final%20Year%20Project!" target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, bgcolor: "#25D366", color: "#fff", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", px: 4, py: 1.8, borderRadius: 3, boxShadow: "0 12px 28px rgba(37,211,102,0.4)", transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 20px 40px rgba(37,211,102,0.5)" } }}>
                            <WhatsAppIcon sx={{ fontSize: 24 }} /> Chat on WhatsApp
                        </Box>
                    </RevealBox>
                </Container>
            </Box>

            <WhatsAppFloat />
        </Box>
    );
}


