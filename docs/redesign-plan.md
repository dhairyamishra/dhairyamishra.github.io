# Portfolio Redesign Plan

## Objective

Reposition the site so it communicates senior engineering skill more clearly and more quickly.

Primary goals:

- Make technical depth legible within the first 10 seconds.
- Replace broad self-description with evidence-based proof of skill.
- Improve readability and seriousness with a light theme.
- Create a task list we can execute incrementally and mark complete.

## Design Direction

### Theme Shift

Move from the current dark neon aesthetic to a white background system with restrained gold and red accents.

Design intent:

- White background communicates clarity, confidence, and editorial polish.
- Gold is used for emphasis, highlights, and premium/research signals.
- Red is used for primary calls to action, selected states, and high-attention elements.
- Neutrals should do most of the work; accent colors should be sparse and meaningful.

### Color System

Proposed palette direction:

- Background: warm white or soft ivory
- Surface: pure white
- Primary text: near-black charcoal
- Secondary text: muted warm gray
- Border: light warm gray
- Primary accent: deep red
- Secondary accent: rich gold

Usage rules:

- Red = action, focus, selected state, key CTAs
- Gold = achievements, metrics, publication/research emphasis
- Avoid large saturated fills except for key buttons or small highlight blocks
- Remove glow-heavy styling; replace with contrast, spacing, and typography hierarchy

## Strategic Content Changes

### Homepage

The homepage should answer:

1. What kind of engineer is this?
2. What hard problems has he solved?
3. What evidence proves that?

Planned changes:

- Rewrite hero headline and subheadline to be sharper and more specific.
- Replace generic stats with proof-oriented metrics.
- Add a "Selected Technical Wins" section.
- Replace the current broad skills grid with capability statements backed by evidence.
- Make featured projects feel evaluative, not just presentational.

### Projects

Each project should consistently communicate:

- problem
- constraints
- architecture
- role/ownership
- tradeoffs
- measurable result

Planned changes:

- Standardize project-page structure.
- Improve project cards to foreground impact and ownership.
- Add evaluation-oriented filters beyond simple technical categories.
- Identify the top 3 flagship projects and make them visibly distinct.

### Experience

The experience page should work as a decision-support page, not only a timeline.

Planned changes:

- Add a summary block above the timeline.
- Surface years of experience, domains, and strongest outcomes.
- Make each role easier to scan for responsibility and impact.

## UX Changes

### Navigation and Flow

- Keep top navigation simple and executive.
- Make it easier for different visitors to find the right proof quickly.
- Add fast paths such as:
  - Best for recruiters
  - Best for engineers
  - Best for research

### Homepage Information Hierarchy

- Reduce decorative emphasis in the hero.
- Increase useful decision-making information above the fold.
- Improve section pacing so the homepage reads like a strong technical profile, not a gallery.

### Project Discovery

Replace or augment current filters with intent-based filters:

- Production Systems
- ML / AI
- Research
- Computer Vision
- LLMs
- Data Infrastructure
- Accessibility
- Leadership / Ownership

## Implementation Phases

### Phase 1 — Visual Foundation

Focus:

- Introduce the white + gold + red theme tokens
- Refactor global styles and shared components
- Remove neon-dependent styling

### Phase 2 — Homepage Repositioning

Focus:

- Rewrite hero copy
- Replace stats
- Replace skills section
- Add technical wins section
- Rebalance CTA hierarchy

### Phase 3 — Project Evaluation UX

Focus:

- Improve project cards
- Improve project listing filters
- Standardize project detail page structure
- Highlight top flagship projects

### Phase 4 — Experience Positioning

Focus:

- Add summary panel
- Improve scanability of role entries
- Align experience content with engineering narrative

### Phase 5 — Final Polish

Focus:

- Accessibility pass
- Consistency pass
- Copy tightening
- Mobile review

## Task Checklist

Use this as the live execution checklist. We will mark items complete as we proceed.

### Foundation

- [x] Audit all current color and glow tokens in global styles
- [x] Define new light-theme palette variables
- [x] Update shared button, badge, card, and border styles
- [x] Update typography contrast for light backgrounds
- [x] Remove or reduce neon/glow effects across shared components

### Homepage

- [x] Rewrite hero headline, subheadline, and CTA hierarchy
- [x] Replace current stats with impact-oriented proof points
- [x] Add a "Selected Technical Wins" section
- [x] Replace broad skills grid with evidence-backed capability blocks
- [x] Rework featured projects section to emphasize ownership and outcomes

### Projects

- [x] Redesign `src/components/ProjectCard.astro`
- [x] Add stronger project filters on `src/pages/projects.astro`
- [ ] Define and apply a standard narrative structure for project MDX pages
- [x] Highlight top flagship projects visually and structurally
- [x] Surface metrics and role ownership more prominently

### Experience

- [ ] Add a summary panel to `src/pages/experience.astro`
- [ ] Improve timeline content scanability
- [ ] Surface strongest outcomes and domains above the timeline

### Copy and Positioning

- [ ] Tighten homepage positioning statement
- [ ] Normalize project descriptions for clarity and rigor
- [ ] Ensure language emphasizes engineering judgment, scale, and outcomes

### QA

- [ ] Review desktop readability
- [ ] Review mobile readability
- [ ] Check color contrast accessibility
- [ ] Check consistency of buttons, badges, and section headers
- [ ] Run build and verify no regressions

## Recommended Execution Order

1. Theme foundation
2. Homepage redesign
3. Project card and projects index redesign
4. Project detail content structure
5. Experience page improvements
6. Final QA pass

## Notes

- The redesign should make the site feel more credible, more editorial, and more technically serious.
- The strongest signal should come from clarity of thought, quality of evidence, and visual restraint.
- Visual polish matters, but it should support credibility rather than compete with it.
