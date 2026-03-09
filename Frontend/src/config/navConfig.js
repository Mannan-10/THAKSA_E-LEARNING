export const navMenus = {
  base: [
    { label: "Home", to: "/" },
    { label: "Workshops", to: "/workshops" },
    { label: "Training", to: "/training" },
  ],
  home: [
    { label: "Home", to: "/" },
    { label: "Workshops", to: "/workshops" },
    { label: "Training", to: "/training" },
    { label: "Projects", to: "/final-year-projects" },
    { label: "Placement", to: "/placements" },
  ],
  workshop: [
    { label: "Home", to: "/" },
    { label: "Workshops", to: "/workshops" },
  ],
  projects: [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/final-year-projects" },
  ],
  placements: [
    { label: "Home", to: "/" },
    { label: "Placement", to: "/placements" },
  ],
  trainingContext: [
    { label: "Home", to: "/" },
    { label: "Training", to: "/training" },
    { label: "Courses", to: "/courses" },
    { label: "Batches", to: "/batches" },
    { label: "Contact", to: "/contact" },
  ],
};

const trainingContextPrefixes = ["/training", "/courses", "/batches", "/contact"];

export function getNavContext(pathname) {
  const isHome = pathname === "/";
  const isWorkshop = pathname === "/workshops" || pathname.startsWith("/workshops/");
  const isProjects =
    pathname === "/final-year-projects" || pathname.startsWith("/final-year-projects/");
  const isPlacements = pathname === "/placements" || pathname.startsWith("/placements/");
  const isTrainingContext = trainingContextPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isHome) return { menu: navMenus.home, fixed: true, authVisible: false };
  if (isWorkshop) return { menu: navMenus.workshop, fixed: true, authVisible: false };
  if (isProjects) return { menu: navMenus.projects, fixed: true, authVisible: false };
  if (isPlacements) return { menu: navMenus.placements, fixed: true, authVisible: false };
  if (isTrainingContext) return { menu: navMenus.trainingContext, fixed: true, authVisible: true };

  return { menu: navMenus.base, fixed: false, authVisible: false };
}
