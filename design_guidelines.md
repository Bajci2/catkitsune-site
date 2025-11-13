# Design Guidelines: Gamified Quest Platform

## Design Approach
**Reference-Based**: Drawing inspiration from successful gamification platforms like Duolingo, Habitica, and Discord's leveling systems. The design emphasizes achievement, progression, and friendly competition with a modern gaming aesthetic.

## Core Design Principles
1. **Energy & Excitement**: Bold typography, dynamic layouts, and celebratory moments
2. **Clear Progression**: Visual feedback for every action and achievement
3. **Competitive Spirit**: Leaderboard prominence with rank indicators
4. **Approachable Gaming**: Fun without overwhelming casual users

## Typography System
- **Display Font**: Poppins (via Google Fonts) - Bold (700) for headings, SemiBold (600) for subheadings
- **Body Font**: Inter (via Google Fonts) - Regular (400) for text, Medium (500) for emphasis
- **Scale**: text-5xl for hero titles, text-3xl for page headers, text-xl for card titles, text-base for body

## Layout System
**Spacing Units**: Consistently use Tailwind units of 3, 4, 6, 8, 12, and 16
- Tight spacing: p-3, gap-4
- Standard spacing: p-6, gap-6
- Generous spacing: p-8, py-12
- Section spacing: py-16

## Component Library

### Navigation Header
- Sticky top navigation with logo, main nav items (Quests, Leaderboard), user avatar with points badge
- Right-aligned profile dropdown showing total points and rank
- Height: h-16 with px-6 horizontal padding

### Hero Section
Full-width hero (h-96) with:
- Diagonal gradient overlay
- Centered headline "Complete Quests. Earn Points. Climb the Ranks."
- Current user stats display: Total Points, Completed Quests, Current Rank
- Primary CTA "View Active Quests" button with backdrop blur

### Quest Cards (Grid Layout)
3-column grid (lg:grid-cols-3 md:grid-cols-2 grid-cols-1) with gap-6:
- Card structure: Rounded corners (rounded-xl), shadow-lg
- Top badge: Category tag with difficulty indicator (Easy/Medium/Hard)
- Quest icon: 64x64 custom icon placeholder area
- Title: text-xl font-semibold
- Description: text-sm with max 2 lines
- Footer: Points value prominently displayed, "Start Quest" or "Claim Reward" button
- Progress bar for active quests (0-100% with smooth fill animation)

### Leaderboard Component
Structured list with alternating row backgrounds:
- Top 3: Enlarged cards with medal icons (1st: gold, 2nd: silver, 3rd: bronze)
- Rank 4+: Compact rows showing rank number, avatar, username, points total
- Current user highlighted with distinct border treatment
- Scroll container with max height, smooth scrolling

### User Profile Section
Single column layout (max-w-2xl centered):
- Profile header: Avatar (96x96), username, member since date
- Stats grid: 3 columns showing Total Points, Quests Completed, Current Rank
- Achievement badges: Horizontal scroll of unlocked achievements
- Recent activity feed: List of last 10 completed quests

### Quest Detail Modal/Page
- Large quest icon at top
- Quest title (text-3xl)
- Difficulty badge and category tag
- Detailed description paragraph
- Requirements checklist with checkboxes
- Points reward prominently displayed
- Dual action buttons: "Accept Quest" primary, "Cancel" secondary

## Icons
**Heroicons** (via CDN) for all UI elements:
- Trophy for achievements
- Star for points
- Fire for streaks
- CheckCircle for completed quests
- LockClosed for locked quests
- ChartBar for leaderboard
- User for profile

## Animations
Minimal but impactful:
- Hover scale on quest cards (scale-105 transition)
- Confetti burst on quest completion (use canvas-confetti library)
- Smooth number counting for points updates
- Progress bar fill animation (transition-all duration-500)

## Images
**Hero Section**: 
- Large background image (1920x800) showing diverse people celebrating achievements or gaming setup
- Diagonal gradient overlay for text readability
- Position: object-cover, center-aligned

**Quest Cards**:
- Category-specific icons (64x64) - use icon library, not photos
- Achievement badges as SVG illustrations

**Leaderboard**:
- User avatars (40x40 circular) - placeholder with initials if no upload

## Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation for quest cards and leaderboard
- Focus indicators with 2px outline
- Screen reader announcements for point gains and rank changes
- Minimum touch target 44x44px for mobile