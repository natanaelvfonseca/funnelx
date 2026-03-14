---
name: kogna-premium-ui
description: Apply Kogna's premium SaaS UI style to existing React and Tailwind screens without changing business logic, routes, or architecture. Use when the user asks to redesign, refine, or visually refactor a Kogna page, dashboard, card grid, empty state, or settings screen, especially if they want the polished style used in the "Minhas IAs" screen.
---

# Kogna Premium UI

## Overview

Use this skill to elevate existing Kogna screens into a more premium, modern, light-first SaaS experience while preserving the current flows, data contracts, and component responsibilities.

This skill is for **visual and UX refactors**, not product redesigns or logic changes.

## When to use

- The user wants a Kogna page to feel more premium, modern, refined, or more "SaaS".
- The request is to improve headers, cards, tables, empty states, search bars, or CTA hierarchy.
- The user references the style of the current `MyAIs` page or asks to replicate that language elsewhere.
- The screen should remain compatible with dark mode, but the request is not to redesign the theme system itself.

## Do first

1. Read `.agent/skills/brand-identity/SKILL.md`.
2. Read `resources/design-tokens.json` and `resources/tech-stack.md` from the brand skill when making styling decisions.
3. Inspect the target page and list what must remain untouched:
   - routes
   - handlers
   - API calls
   - modals
   - data shape
   - business rules

## Core workflow

1. Identify the current page structure.
   Keep the same information architecture unless the existing order clearly harms readability.

2. Preserve behavior.
   Do not change endpoint usage, form behavior, conditional logic, or feature scope unless the user explicitly asks.

3. Upgrade the visual hierarchy.
   Improve title treatment, supporting copy, CTA priority, card anatomy, status presentation, spacing, and action clarity.

4. Apply the Kogna premium language.
   Use a light-first surface system, restrained orange accents, stronger typography, softer depth, rounded modern corners, and subtle motion.

5. Check responsive and dark mode behavior.
   The page should read well on mobile and remain elegant in dark mode.

## Visual rules

### Product feel

- Aim for "premium SaaS for AI and WhatsApp operations".
- Prefer calm polish over loud decoration.
- Make the page feel expensive through hierarchy, spacing, and restraint.

### Color

- Orange is the accent, not the whole palette.
- Use orange to highlight primary actions, small glows, chips, or focal details.
- Keep neutrals sophisticated and bright in light mode.
- In dark mode, preserve contrast without neon overload.

### Typography

- Use the project's existing display and body font utilities.
- Titles should feel intentional and slightly tighter.
- Supporting copy should be shorter, cleaner, and easier to scan.

### Layout

- Favor strong page headers with a clear top action.
- Group related information into clearly separated visual blocks.
- Prefer 24px to 32px rhythm for premium spacing.
- Use rounded corners generously, usually `rounded-2xl` to `rounded-[32px]`.

### Components

- Cards should feel like control surfaces, not plain containers.
- Status badges must be cleaner, more legible, and more consistent.
- Action buttons should have a clear primary/secondary hierarchy.
- Empty states should feel curated, not generic.

### Motion

- Use subtle hover lift, border emphasis, and shadow transitions.
- Avoid excessive animation or ornamental motion.

## Guardrails

- Do not invent new multi-step flows.
- Do not add features outside the request.
- Do not remove important information already visible on the screen.
- Do not add a per-page dark mode toggle unless the user explicitly asks for it.
- Do not break the architecture to chase visuals.
- Use Tailwind utilities, not ad hoc CSS files or styled-components.

## Pattern reference

Read [references/patterns.md](references/patterns.md) when you need the concrete recipe for:

- premium page headers
- stat summaries
- card anatomy
- status and WhatsApp connection presentation
- empty states
- dark mode and responsive checks

## Live example

Use `src/pages/brain/MyAIs.tsx` as the current implementation example of this style inside the Kogna app.
