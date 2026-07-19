---
name: Auvia
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#79f7ea'
  on-secondary-container: '#007169'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#79f7ea'
  secondary-fixed-dim: '#5adace'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max-width: 1280px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
  stack-gap: 16px
---

## Brand & Style

The design system is built upon a foundation of **Sophisticated Minimalism**, blending the precision of high-end productivity tools with the serenity of wellness applications. It aims to project a "Human-Centric Expert" personality, moving away from sterile institutional aesthetics toward a warm, intelligent interface that feels like a high-tier professional companion.

The visual narrative prioritizes clarity and breathing room, utilizing expansive white space to reduce cognitive load—a critical factor for professionals in regulated industries. The aesthetic combines the crisp execution found in developer-centric tools with the soft, inviting nature of modern health-tech. The result is a UI that feels reliable, anticipatory, and deeply respectful of the user's focus.

## Colors

The palette is anchored by **Deep Midnight Blue**, representing professional authority and the depth of expertise. This is contrasted by **Soft Turquoise**, used sparingly as an "Evolution Accent" to signify health, AI activity, and positive progress.

- **Primary (#0A192F):** Used for typography, primary navigation, and heavy structural elements.
- **Secondary (#4FD1C5):** Used for interactive highlights, success states, and subtle AI indicators.
- **Backgrounds:** The interface utilizes a "layered white" approach. Base surfaces are pure white (#FFFFFF), while background canvases and secondary containers use a cool, subtle gray (#F8FAFC) to define boundaries without heavy lines.
- **Supportive Neutrals:** Slate grays are used for secondary text and borders to maintain a low-contrast, gentle visual hierarchy.

## Typography

This design system employs a dual-font strategy to balance character with utility. 

**Plus Jakarta Sans** is used for headlines. Its slightly rounded terminals and modern geometric construction provide a friendly, approachable entrance to information. It should be typeset with tight letter-spacing for a premium, editorial feel.

**Inter** serves as the workhorse for all functional text, body copy, and data-heavy labels. It is chosen for its exceptional legibility in technical contexts. Body text should maintain generous line-heights (1.5x minimum) to ensure readability during long-form clinical or professional review.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. While the central content container honors a 1280px maximum width on desktop to prevent excessive line lengths, the internal components utilize a fluid 12-column grid.

- **Desktop (1024px+):** 12 columns, 24px gutters, 48px outer margins.
- **Tablet (768px - 1023px):** 8 columns, 20px gutters, 32px outer margins.
- **Mobile (Up to 767px):** 4 columns, 16px gutters, 16px outer margins.

The spacing rhythm is strictly based on a **4px baseline grid**. Components should prioritize vertical "stack" spacing of 16px or 24px to create a sense of organized, rhythmic calm. Whitespace is treated as a functional element to group related concepts without the need for intrusive divider lines.

## Elevation & Depth

Hierarchy in the design system is achieved through **Soft Tonal Layering** rather than high-contrast shadows.

1.  **Level 0 (Canvas):** The base background layer (#F8FAFC).
2.  **Level 1 (Card/Surface):** Pure white (#FFFFFF) with a very subtle, diffused shadow (0px 4px 20px rgba(10, 25, 47, 0.04)). This level is used for primary content cards and modules.
3.  **Level 2 (Interaction/Floating):** Used for menus and modals. Features a slightly more pronounced shadow (0px 10px 30px rgba(10, 25, 47, 0.08)) and a 1px border using the neutral gray to define edges against the white background.

Avoid heavy black shadows or multiple stacking levels. The depth should feel airy, almost as if components are floating on a cushion of light.

## Shapes

The shape language is defined by **Moderate Rounding**, striking a balance between professional precision and organic approachability. 

- **Primary Components:** (Buttons, Cards, Inputs) utilize a 12px to 16px corner radius. This creates a "friendly-tech" feel that distinguishes the product from more rigid, traditional corporate software.
- **Small Components:** (Chips, Checkboxes) use a 6px to 8px radius to maintain visual consistency at smaller scales.
- **Icons:** Should follow the same logic—utilizing rounded caps and corners with a 2px stroke weight to echo the typography's friendly yet professional tone.

## Components

### Buttons
- **Primary:** Deep Midnight Blue background with white text. High contrast, signaling definitive action.
- **Secondary:** Transparent background with a 1px Slate border and Midnight Blue text.
- **Ghost:** No border or background; text-only until hover, where a Soft Turquoise tint appears.

### Input Fields
Inputs use a white background with a 1px light gray border (#E2E8F0). On focus, the border transitions to Soft Turquoise with a subtle glow (2px blur). Labels are always positioned above the field in **label-md** style.

### Cards
Cards are the primary container. They must have a white background, 16px rounded corners, and the "Level 1" shadow. Padding inside cards should be a minimum of 24px to maintain the "Calm" aesthetic.

### Chips & Badges
Used for status and tagging. They use a light tint of the Secondary color (Soft Turquoise at 10% opacity) with the Secondary color at full opacity for the text. Rounded-pill shape.

### AI Indicators
Auvia’s AI presence is represented by subtle, animated Soft Turquoise gradients or small, glowing dots. Avoid literal robot icons; use abstract, pulse-like animations to suggest the AI is "listening" or "thinking."

### Lists
List items are separated by whitespace or a very faint 1px border (#F1F5F9). Each item should have ample vertical padding (12px-16px) to remain legible for high-stakes professional data review.
