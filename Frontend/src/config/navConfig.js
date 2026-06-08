export const navMenus = {
  base: [
    { label: "Home", to: "/" },
    { label: "Training", to: "/training" },
    { label: "Courses", to: "/courses" },
    { label: "Batches", to: "/batches" },
    { label: "Contact", to: "/contact" },
  ],
  home: [
    { label: "Home", to: "/" },
    { label: "Training", to: "/training" },
    { label: "Courses", to: "/courses" },
    { label: "Batches", to: "/batches" },
    { label: "Contact", to: "/contact" },
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
  const isTrainingContext = trainingContextPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isHome) return { menu: navMenus.home, fixed: true, authVisible: true };
  if (isTrainingContext) return { menu: navMenus.trainingContext, fixed: true, authVisible: true };

  return { menu: navMenus.base, fixed: false, authVisible: true };
}
