---
name: apple-design
description: Design, build, or review Apple-inspired web interfaces with direct manipulation, fluid spring motion, spatial consistency, translucent materials, refined typography, and accessible motion. Use for gesture-driven UI, sheets, drawers, drag/swipe interactions, momentum, interruptible transitions, or critiques grounded in Apple-style interaction principles; do not use merely because a project targets Apple platforms.
---

# Apple Design

Translate Apple's interaction and visual-design principles into practical web implementations. Aim for interfaces that feel direct, predictable, spatially coherent, and restrained—not superficial copies of Apple chrome.

## Choose the Relevant Guidance

- For dragging, swiping, sheets, springs, momentum, velocity handoff, rubber-banding, or animation implementation, read [references/fluid-motion.md](references/fluid-motion.md).
- For glass/material effects, depth, type, reduced motion, contrast, and multimodal feedback, read [references/visual-craft.md](references/visual-craft.md).
- For product critique, information architecture, labels, wayfinding, agency, safety, simplicity, or design process, read [references/design-foundations.md](references/design-foundations.md).

Read only the references relevant to the request. When a task spans interaction, visuals, and product structure, combine them rather than treating motion as a finishing layer.

## Working Principles

1. Preserve the user's chosen stack, product direction, and scope. Apply these principles within the existing design system unless a redesign is requested.
2. Start with purpose and interaction behavior. Make the common path obvious, keep people in control, and ensure every screen communicates where they are, what they can do, and how to leave.
3. Make touched content respond immediately and continuously. Gesture-driven elements should track the pointer 1:1, inherit release velocity, and remain interruptible.
4. Maintain spatial logic. Enter and exit along matching paths, originate overlays from their triggers, and use depth or translucency to explain hierarchy.
5. Prefer restrained, critically damped motion. Add bounce only when momentum or physical interaction justifies it.
6. Treat accessibility as a component behavior. Provide reduced-motion, reduced-transparency where supported, increased-contrast, keyboard, focus, and text-scaling behavior.
7. Prototype interactive behavior and verify it at full speed and frame-by-frame. Check interruption, reversal, resize, rotation, input-method changes, and accessibility preferences.

## Review Output

When reviewing an interface, report concrete findings tied to observable behavior. Prioritize issues that break agency, continuity, predictability, accessibility, or legibility. Recommend the smallest change that restores the intended relationship, and include implementation details only when useful.
