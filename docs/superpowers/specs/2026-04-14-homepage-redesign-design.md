# Homepage Redesign Design

**Date:** 2026-04-14
**Project:** LejDinLyd marketing site
**Scope:** Redesign the homepage at `/` without changing the site’s core booking flow or brand promise.

## Goal

Create a more distinctive, polished homepage that feels intentionally designed rather than template-based, while preserving the current conversion-focused structure and local trust-building message.

## Design Direction

The redesign should follow an editorial-tech direction:

- Dark, atmospheric foundation with warm orange highlights
- More characterful typography and stronger hierarchy
- Fewer but more deliberate motion moments
- Layouts that feel composed and branded, not just repeated card grids
- A sharper balance between trust, energy, and professionalism

This should feel like a more confident version of the current site, not a different company.

## User Experience Targets

- Visitors should understand the offer within a few seconds: Soundboks rental in Aalborg from 150 DKK/day.
- The homepage should feel trustworthy enough for booking and memorable enough to stand out from generic rental pages.
- The booking CTA should remain prominent throughout the page.
- The page should still work cleanly on mobile, where a large share of local traffic is likely to land first.

## Content Strategy

The existing homepage sections remain useful and should mostly stay in the same narrative order:

1. Navbar
2. Hero
3. Product showcase
4. Pricing
5. About / trust story
6. Testimonials
7. Delivery / booking / FAQ / contact
8. Footer

The redesign should improve presentation and emphasis rather than rewrite the business model or introduce major new content categories.

## Visual System

### Typography

- Replace the current generic startup-style pairing with a more distinctive display/body combination.
- Headings should feel bold and branded, especially in the hero and section intros.
- Body text should remain readable and practical for booking-related content.
- Typography should do more of the visual work, reducing dependence on decorative effects.

### Color

- Keep the existing dark + orange base as the brand anchor.
- Add more depth using layered gradients, lighting, subtle texture, and stronger tonal separation between sections.
- Avoid introducing a rainbow palette or changing the brand into something pastel, neon-heavy, or luxury-black-only.

### Motion

- Keep motion purposeful and concentrated in a few areas: hero entrance, hover states, section reveals.
- Reduce “constant movement everywhere,” especially in the hero product art.
- Motion should support atmosphere and focus, not distract from reading or booking.

### Composition

- Break away from repeated centered headings plus uniform cards where it improves the page.
- Use asymmetry, denser information groupings, and stronger section framing for a more editorial rhythm.
- Maintain clarity and responsiveness; visual ambition must not compromise scanning.

## Component-Level Design

### Navbar

- Keep the sticky navbar, but make it feel more branded and refined.
- Improve logo treatment and spacing so it reads as a designed masthead rather than a default app navbar.
- Preserve smooth anchor navigation and clear booking CTA.

### Hero

- This remains the visual centerpiece.
- Keep the product image and local positioning message, but rebuild the composition to feel more premium and less effect-heavy.
- Add one or two compact trust/value callouts near the hero CTA area, such as pricing, delivery, or no deposit.
- Reduce the number of simultaneous animated layers and replace some with stronger static composition.

### Product Showcase

- Keep it as a proof-of-product section, but give it a more art-directed presentation.
- Product imagery should feel staged and intentional rather than placed inside three similar cards.
- Feature highlights can remain, but should be integrated more tightly with the visual layout.

### Pricing

- Preserve the simple pricing message and direct booking path.
- The pricing section should feel more premium and scannable, with a clearer featured state and stronger trust framing.
- Keep the “no deposit / pay on delivery / flexible pickup” reassurance visible.

### About

- The founder story is a strength and should stay.
- Present it in a way that feels more editorial and less like a centered block of generic marketing text.
- The supporting “why choose us” points can remain, but should use a layout that feels more intentional than four similar boxes.

### Testimonials

- Keep testimonials as social proof, but improve their layout and typography so they feel curated.
- They should support the brand story, not read like generic review cards.

### Lower Funnel Sections

- Delivery, booking, FAQ, and contact should remain practical and reliable.
- These sections should inherit the upgraded visual system without becoming harder to use.
- Booking remains function-first; styling should improve polish without harming usability.

### Footer

- Make the footer feel like a deliberate closing section with better hierarchy and stronger brand presence.
- Preserve navigation, contact details, and trust information.

## Technical Constraints

- Stay within the existing React + Vite + Tailwind + Framer Motion stack.
- Reuse the existing page and section structure where practical.
- Avoid large architectural rewrites or unnecessary component churn.
- Keep performance reasonable by limiting heavy continuous animation.
- Preserve current routing and booking functionality.

## Accessibility and Responsiveness

- Maintain legible contrast and keyboard-friendly interactions.
- Ensure heading sizes, spacing, and layout shifts scale well from mobile to desktop.
- Avoid decorative effects that reduce readability on smaller screens.
- If motion is retained in key areas, it should remain subtle enough not to harm usability.

## Testing Strategy

- Use focused component/page tests where practical for any structural behavior changes.
- Run the existing test suite and production build after the redesign.
- Manually review the homepage visually in desktop and mobile layouts before considering the redesign complete.

## Non-Goals

- No rebrand of business name or core offering
- No booking-system rewrite
- No major copywriting overhaul across the full site
- No redesign of unrelated admin pages unless shared styles require minor adjustments

## Success Criteria

The redesign is successful if:

- The homepage feels more distinctive and intentionally designed than the current version
- The hero is visually strong without feeling noisy
- The lower sections feel cohesive with the hero instead of falling back to template-like layouts
- Core booking and trust signals remain clear
- The site still builds, tests, and works cleanly across breakpoints
