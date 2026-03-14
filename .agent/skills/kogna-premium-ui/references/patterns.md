# Kogna Premium UI Patterns

Use this file when applying the `kogna-premium-ui` skill to a real screen.

## 1. Design direction

Named direction: `Premium light-first SaaS for AI operations`

The page should feel:

- polished
- professional
- modern
- valuable
- operationally clear

References in spirit:

- Linear
- Stripe
- Vercel
- Attio

Do not copy these products. Use them only as a quality bar for restraint and hierarchy.

## 2. Header recipe

Use a stronger page header when the page is strategic or overview-oriented.

Recommended structure:

1. Small eyebrow or label chip
2. Large display title
3. Short supporting paragraph
4. One primary action
5. Optional search field
6. Optional compact stats

### Header rules

- Keep the primary CTA on the right on desktop and stacked cleanly on mobile.
- Search should be supportive, not dominant.
- If stats are shown, keep them compact and visual, not dashboard-heavy.
- Use soft depth and subtle backdrop blur only when it improves polish.

## 3. Card recipe

Use cards as "control surfaces".

Recommended anatomy:

1. Brand or category icon block
2. Eyebrow or meta label
3. Strong item title
4. Type badge and status badge
5. One or more grouped info blocks
6. Description block
7. Footer with secondary status copy and primary action

### Card rules

- Give the title the strongest visual weight.
- Separate dense information into internal sections instead of stacking raw text.
- Use rounded corners, premium shadows, and a restrained hover lift.
- The primary action should feel intentional, not like a plain text button.

## 4. Status and connectivity

Statuses must be immediately readable.

### Badge rules

- Use subtle tinted backgrounds, borders, and readable text.
- Pair status text with a dot when useful.
- Keep casing consistent across the page.

### WhatsApp presentation

- Treat connection state as an information block, not a loose label.
- Make the instance name readable and the connection status explicit.
- Use green only for connection semantics, not as a competing accent system.

## 5. Empty states

An empty state should still feel like product.

Include:

1. Focused icon or visual marker
2. Confident title
3. Short explanatory copy
4. Direct CTA if applicable

Avoid:

- generic placeholders
- apologetic copy
- weak call-to-action language

## 6. Responsive behavior

Check all of these:

- Header stacks naturally on mobile.
- Search and CTA remain easy to tap.
- Cards collapse to one column with comfortable spacing.
- Badge clusters wrap cleanly.
- Footer actions still read as actions, not clutter.

## 7. Dark mode behavior

Dark mode should be elegant, not high-contrast chaos.

Rules:

- Keep orange as a highlight, not a flood color.
- Lift important surfaces with border and depth, not bright fills.
- Preserve text hierarchy with softer neutral ranges.
- Avoid washed-out gray on gray combinations.

## 8. Implementation rules

- Keep logic, handlers, API calls, props, and architecture unchanged unless the user asks otherwise.
- Prefer local component extraction only when it improves clarity within the same screen scope.
- Reuse existing Tailwind tokens and project utilities first.
- Do not add a local dark-mode toggle unless requested.

## 9. Audit checklist

Before finishing, verify:

- Does the page feel premium without becoming noisy?
- Is the title hierarchy clearly stronger than before?
- Are the cards easier to scan in under 3 seconds?
- Is orange used with discipline?
- Does mobile still feel deliberate?
- Does dark mode still look intentional?
- Did the refactor avoid logic and architecture changes?
