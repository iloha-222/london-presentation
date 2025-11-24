# SINI London Presentation Slides

A presentation built with Astro following the Three Cups website design style.

## Current Status

✅ **Project Setup Complete**
- Astro project initialized with Tailwind CSS
- All visual assets (pictures, illustrations, icons) copied to public folder
- Three Cups design system applied (fonts, colors, styling)
- Presentation layout with keyboard navigation created
- Built and ready to view!

✅ **Currently Includes:**
- Slide 1: Title slide - The Three Sacreds
- Slide 2: The Three Sacreds Explained

⚠️ **To Complete:**
The presentation needs 17 more slides added based on your presentation notes.

## Quick Start

```bash
# View the current presentation
open dist/index.html

# Or start dev server to make changes
npm run dev

# After making changes, rebuild
npm run build
```

## Adding Remaining Slides

Open `src/pages/index.astro` and add slides 3-19 before the closing `</PresentationLayout>` tag.

The remaining slides to add:
- Slide 3: Tibetan Buddhist Art as Teaching
- Slide 4: LunARC Lunar Mission  
- Slide 5: Overview Effect
- Slide 6: The Knowledge Gap
- Slide 7: Yab-Yum Example
- Slide 8-9: Why SINI Can Bridge
- Slide 10: EDP Students
- Slide 11-15: Practical Partnership Models (4 components)
- Slide 16: Success in 5 Years
- Slide 17: The Urgency
- Slide 18: Closing Appeal
- Slide 19: Final Questions

## Navigation

- **Arrow Down/Space:** Next slide
- **Arrow Up:** Previous slide  
- **Home:** First slide
- **End:** Last slide
- **Scroll:** Navigate slides

## File Structure

- `src/pages/index.astro` - Main presentation
- `src/layouts/PresentationLayout.astro` - Layout with navigation
- `src/styles/global.css` - Three Cups design system
- `public/` - All your images
- `dist/` - Built HTML (ready to present!)

## Design Colors

- Burnt Orange: #d45c26
- Golden: #f5b611
- Mint: #9ed7c7
- Light Beige: #f9f2e6
- Dark Brown: #453c36

The presentation follows the exact same aesthetic as the Three Cups website!
