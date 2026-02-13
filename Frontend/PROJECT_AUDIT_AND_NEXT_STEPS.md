# Frontend + Workflow Audit (Professional Summary)

## Current Status
- Build: passing (`npm run build`)
- Lint: passing (`npm run lint`)
- Route guards: role-based redirects are enforced
- Dashboard shells: responsive for Student/Admin/Instructor
- Admin and Instructor dashboards: auto-refresh every 20s + on window focus + manual refresh

## High-Impact Fixes Already Applied
- Admin dashboard crash path fixed when API fails or returns partial payload
- Revenue statistics fixed for payment status case inconsistencies (`success` vs `SUCCESS`)
- Mobile table responsiveness hardened in admin and instructor pages
- Catch-all route fallback added to prevent broken workflow on unknown paths
- OTP verify page now uses shared API service (no hardcoded fetch URL)

## Remaining Improvement Opportunities

### 1) Data Source Consistency
- Several pages still use mock/static arrays (student/instructor/admin side pages).
- Replace with real API-backed data and add loading/empty/error states per page.

### 2) API and Domain Layer Structure
- Introduce feature-based API modules:
  - `src/features/admin/api/*`
  - `src/features/instructor/api/*`
  - `src/features/student/api/*`
- Add a shared response parser to normalize inconsistent payload shapes.

### 3) State and Caching
- Move fetch logic from component-level to data hooks.
- Adopt React Query (or equivalent) for caching, retries, stale-while-revalidate, and optimistic updates.

### 4) UX Reliability
- Replace `window.confirm` and `alert` with MUI dialogs/snackbars.
- Add global toast/error boundary handling for better failure UX.

### 5) Performance
- Bundle is large (Vite warning >500KB).
- Add route-level code splitting with `React.lazy` and dynamic imports for admin/instructor/student sections.

### 6) Testing and QA
- Add unit tests for route guards and helper formatters.
- Add integration tests for:
  - login role redirects
  - admin dashboard refresh
  - forgot-password/OTP flow
- Add Playwright e2e checks for responsive navigation and role workflows.

### 7) Accessibility and Content Quality
- Add explicit table captions and aria labels for action buttons.
- Ensure color contrast checks on status chips/buttons.
- Standardize wording and punctuation across pages for professional consistency.

## Recommended Professional Structure (Target)

```text
src/
  app/
    router/
    providers/
    theme/
  features/
    auth/
      pages/
      api/
      components/
      hooks/
    admin/
      pages/
      api/
      components/
      hooks/
    instructor/
      pages/
      api/
      components/
      hooks/
    student/
      pages/
      api/
      components/
      hooks/
  shared/
    components/
    ui/
    hooks/
    utils/
    constants/
  services/
    http/
```

## Next Practical Steps (Priority)
1. Integrate React Query and migrate dashboard fetches into hooks.
2. Convert static/mock instructor and student management pages to real APIs.
3. Add lazy loading for route groups and verify bundle reduction.
4. Implement snackbar/dialog system and remove all `alert`/`confirm` usage.
5. Add CI checks: lint + build + test.
