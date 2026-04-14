# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage so it feels more editorial, distinctive, and cohesive while preserving booking clarity and existing functionality.

**Architecture:** Keep the existing homepage route and section structure, but upgrade the shared visual system and rewrite the most visible homepage sections to use a stronger editorial layout language. Keep business logic and booking behavior intact, with styling and composition changes concentrated in homepage-facing components.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Vitest, Testing Library

---

## File Structure

- Modify: `src/index.css`
  - Replace the current font pairing and extend the global visual tokens for a more atmospheric, editorial brand system.
- Modify: `src/components/Navbar.tsx`
  - Upgrade the masthead layout, CTA treatment, and mobile menu styling while preserving anchor navigation behavior.
- Modify: `src/components/HeroSection.tsx`
  - Rebuild the hero composition, trust callouts, and motion style.
- Modify: `src/components/ProductShowcase.tsx`
  - Replace the current symmetric product-card layout with a more art-directed showcase.
- Modify: `src/components/PricingSection.tsx`
  - Strengthen hierarchy, featured plan treatment, and trust framing.
- Modify: `src/components/AboutSection.tsx`
  - Turn the founder story into a more editorial split layout and upgrade the supporting trust points.
- Modify: `src/components/TestimonialsSection.tsx`
  - Make testimonials feel curated and brand-aligned instead of generic cards.
- Modify: `src/components/DeliverySection.tsx`
  - Apply the new visual system to the delivery block while keeping it practical.
- Modify: `src/components/FAQSection.tsx`
  - Refresh the section heading and accordion shell to match the new homepage language.
- Modify: `src/components/ContactSection.tsx`
  - Improve the CTA and contact card composition.
- Modify: `src/components/Footer.tsx`
  - Give the footer stronger hierarchy and brand closure.
- Create: `src/test/homepage-redesign.test.tsx`
  - Confirm the homepage still renders the redesigned information architecture and key CTAs.

### Task 1: Shared Visual System And Guardrail Test

**Files:**
- Modify: `src/index.css`
- Test: `src/test/homepage-redesign.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";

describe("homepage redesign", () => {
  test("renders the redesigned homepage frame with key conversion anchors", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    expect(
      screen.getAllByRole("link", { name: /book nu|book din højtaler nu/i }).length
    ).toBeGreaterThan(0);

    expect(
      screen.getByRole("heading", { name: /lej en soundboks go/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /simple priser|priser der er til at forstå/i })
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/test/homepage-redesign.test.tsx`
Expected: FAIL because the new test file does not exist yet and/or the pricing heading assertion does not match the current redesign copy.

- [ ] **Step 3: Write minimal implementation**

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 218 30% 7%;
    --foreground: 35 33% 96%;
    --card: 222 24% 10%;
    --card-foreground: 35 33% 96%;
    --popover: 222 24% 10%;
    --popover-foreground: 35 33% 96%;
    --primary: 24 95% 56%;
    --primary-foreground: 220 30% 8%;
    --secondary: 220 22% 14%;
    --secondary-foreground: 35 33% 96%;
    --muted: 220 18% 16%;
    --muted-foreground: 220 12% 70%;
    --accent: 24 95% 56%;
    --accent-foreground: 220 30% 8%;
    --border: 220 18% 22%;
    --input: 220 18% 22%;
    --ring: 24 95% 56%;
    --radius: 1rem;
    --font-heading: 'Syne', sans-serif;
    --font-body: 'Manrope', sans-serif;
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-body);
    background-image:
      radial-gradient(circle at top, hsl(24 95% 56% / 0.12), transparent 28%),
      radial-gradient(circle at 80% 20%, hsl(35 90% 80% / 0.06), transparent 18%),
      linear-gradient(180deg, hsl(222 26% 9%), hsl(218 30% 7%));
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-heading);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/test/homepage-redesign.test.tsx`
Expected: PASS after the test file exists and the homepage still exposes the expected core content.

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/test/homepage-redesign.test.tsx
git commit -m "feat: add homepage redesign visual foundation"
```

### Task 2: Hero, Navbar, And Product Showcase

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/ProductShowcase.tsx`
- Test: `src/test/homepage-redesign.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
test("shows editorial hero trust points and upgraded primary actions", () => {
  render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>
  );

  expect(screen.getByText(/fra 150 kr/i)).toBeInTheDocument();
  expect(screen.getByText(/ingen depositum/i)).toBeInTheDocument();
  expect(screen.getByText(/levering i aalborg/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/test/homepage-redesign.test.tsx`
Expected: FAIL because the current hero/navbar/product content does not yet include the new trust-point presentation.

- [ ] **Step 3: Write minimal implementation**

```tsx
// Navbar: keep routing logic, but wrap the brand in a stronger masthead with
// an eyebrow label and refined CTA shell.

// HeroSection: replace the current multi-ring animated composition with:
// - editorial headline block
// - two CTA buttons
// - compact trust strip with price / delivery / no deposit
// - calmer product image motion and background panel framing

// ProductShowcase: replace three equal cards with:
// - one large primary product stage
// - one side rail of feature stats
// - one secondary image column for alternate angles
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/test/homepage-redesign.test.tsx`
Expected: PASS with the new hero trust points present.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/components/HeroSection.tsx src/components/ProductShowcase.tsx src/test/homepage-redesign.test.tsx
git commit -m "feat: redesign homepage hero and showcase"
```

### Task 3: Pricing, About, And Testimonials

**Files:**
- Modify: `src/components/PricingSection.tsx`
- Modify: `src/components/AboutSection.tsx`
- Modify: `src/components/TestimonialsSection.tsx`
- Test: `src/test/homepage-redesign.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
test("preserves the pricing and trust narrative after the redesign", () => {
  render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>
  );

  expect(screen.getByText(/betal ved overlevering/i)).toBeInTheDocument();
  expect(screen.getByText(/historien bag|nordjysk iværksætter/i)).toBeInTheDocument();
  expect(screen.getByText(/tilfredse kunder|rigtige oplevelser/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/test/homepage-redesign.test.tsx`
Expected: FAIL once the section headings and testimonial presentation are changed without preserving the targeted trust copy.

- [ ] **Step 3: Write minimal implementation**

```tsx
// PricingSection:
// - rewrite the section intro and spacing
// - keep three core pricing paths
// - make the featured weekend option more intentional
// - integrate trust badges into the section shell

// AboutSection:
// - split the founder story into an editorial two-column composition
// - move supporting "why choose us" points into a more varied layout

// TestimonialsSection:
// - replace uniform cards with a mixed testimonial composition
// - keep the same testimonial data and social-proof purpose
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/test/homepage-redesign.test.tsx`
Expected: PASS with trust copy preserved inside the redesigned sections.

- [ ] **Step 5: Commit**

```bash
git add src/components/PricingSection.tsx src/components/AboutSection.tsx src/components/TestimonialsSection.tsx src/test/homepage-redesign.test.tsx
git commit -m "feat: redesign homepage trust sections"
```

### Task 4: Lower Funnel Sections, Footer, And Verification

**Files:**
- Modify: `src/components/DeliverySection.tsx`
- Modify: `src/components/FAQSection.tsx`
- Modify: `src/components/ContactSection.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/test/homepage-redesign.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
test("keeps practical contact and FAQ conversion paths visible", () => {
  render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /ofte stillede spørgsmål/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /kontakt/i })).toBeInTheDocument();
  expect(screen.getByText(/kjellerupsgade 4, 9000 aalborg/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/test/homepage-redesign.test.tsx`
Expected: FAIL if the lower funnel sections are reworked before their required contact and FAQ cues are restored.

- [ ] **Step 3: Write minimal implementation**

```tsx
// DeliverySection:
// - turn the section into a stronger framed logistics block

// FAQSection:
// - keep accordion behavior, upgrade shell and heading treatment

// ContactSection:
// - give the CTA and contact cards more hierarchy

// Footer:
// - add stronger brand close and cleaner column balance
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/test/homepage-redesign.test.tsx`
Expected: PASS with FAQ, contact, and address content still visible.

- [ ] **Step 5: Run full verification**

Run: `npm test`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/DeliverySection.tsx src/components/FAQSection.tsx src/components/ContactSection.tsx src/components/Footer.tsx src/test/homepage-redesign.test.tsx
git commit -m "feat: complete homepage redesign"
```
