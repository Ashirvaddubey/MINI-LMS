# MicroCourses - Mini LMS Platform

A modern, beautiful Learning Management System (LMS) built with React, Next.js, Tailwind CSS, shadcn/ui, and Framer Motion.

## 🎯 Features

### For Learners
- Browse and enroll in courses
- Track learning progress with visual progress bars
- Watch video lessons with transcripts
- Earn certificates upon course completion
- View all enrolled courses and achievements

### For Creators
- Apply to become a course creator
- Create and manage courses
- Track student enrollment and revenue
- Edit course content and lessons

### For Admins
- Review pending course submissions
- Approve or reject courses
- Monitor platform statistics
- Manage course quality

## 📁 Project Structure

\`\`\`
├── app/                          # Next.js app directory
│   ├── courses/                  # Course listing and details
│   ├── learn/                    # Lesson viewer
│   ├── progress/                 # Learner progress tracking
│   ├── creator/                  # Creator application and dashboard
│   │   ├── apply/               # Creator application form
│   │   └── dashboard/           # Creator course management
│   └── admin/                    # Admin panel
│       └── review/              # Course review system
├── components/                   # Reusable React components
│   ├── navbar.tsx               # Role-aware navigation
│   ├── course-card.tsx          # Course display card
│   ├── progress-bar.tsx         # Animated progress indicator
│   └── certificate-modal.tsx    # Certificate display modal
├── lib/                         # Utilities and data
│   └── mock-data.ts            # Mock data for development
└── backend/                     # Backend placeholder structure
    ├── server.js               # Server entry point (placeholder)
    ├── routes/                 # API routes (placeholder)
    ├── controllers/            # Business logic (placeholder)
    ├── models/                 # Database models (placeholder)
    └── config/                 # Configuration (placeholder)
\`\`\`

## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive layout that works on all devices
- **Accessible**: Semantic HTML and ARIA attributes for accessibility
- **Smooth Animations**: Framer Motion for delightful user interactions
- **Role-Based Navigation**: Different views for learners, creators, and admins

## 🚀 Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📝 Notes

- The backend folder contains only placeholder files - no backend implementation is included
- All data is currently mocked in `lib/mock-data.ts`
- The role switcher in the navbar is for demo purposes only
- In a production app, you would need to implement:
  - User authentication
  - Database integration
  - Video hosting/streaming
  - Payment processing
  - Real-time progress tracking

## 🎓 Pages Overview

- `/courses` - Browse all available courses
- `/courses/[id]` - View course details and lessons
- `/learn/[lessonId]` - Watch lessons with video player and transcript
- `/progress` - Track enrolled courses and view certificates
- `/creator/apply` - Apply to become a course creator
- `/creator/dashboard` - Manage courses (creator only)
- `/admin/review/courses` - Review pending courses (admin only)

## 🎨 Color Scheme

The application uses a professional blue-based color scheme:
- Primary: Blue (#2563eb)
- Secondary: Sky Blue (#0ea5e9)
- Accent: Cyan (#06b6d4)
- Success: Emerald (#10b981)
- Warning: Amber (#f59e0b)
- Destructive: Red (#ef4444)

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu on small screens
- Grid layouts that stack on mobile
- Touch-friendly interactive elements

---

Built with ❤️ using modern web technologies
