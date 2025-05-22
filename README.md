# PeerReview Network

A modern MVP for a Research Peer Review Social Network, built with Next.js, React, and Tailwind CSS. This project simulates a full-featured academic peer review platform with user profiles, paper submission, reviewer matching, analytics, and more—all in a single-page, frontend-only application.

---

## Features

### User Management & Profiles
- Registration and login (simulated, no backend)
- Institutional email and credential fields
- User profiles: name, institution, position, degrees, research fields, avatar
- ORCID (optional, UI only)
- Privacy controls and verification badge (simulated)
- Activity metrics (papers submitted, reviews completed)

### Content Management
- Multi-step paper submission wizard
- File upload UI (PDF/DOCX, not stored)
- Metadata: title, abstract, keywords, field, co-authors
- Draft/versioning and status indicators
- Search and filter by field, title, author, etc.

### Discovery & Matching
- Personalized feed based on user expertise
- Reviewer matching (simulated match score)
- Advanced search and filters
- Field-based categorization and tags

### Review Process
- Request to review, accept/decline
- Standardized review template (ratings, comments)
- Review progress tracking and status
- Author can view reviews (no threaded feedback)

### Communication & Notifications
- In-app notification center (simulated)
- Notification preferences (UI only)
- No real email or messaging (UI only)

### Analytics
- Dashboard with stats, charts, and activity heatmap (dummy data)

### Technical Foundation
- Next.js 15, React 19, Tailwind CSS 3
- Responsive, accessible design
- All data is in-memory (no backend, no persistence)

---

## Limitations (MVP/Prototype)
- **No backend:** All data is simulated and resets on reload
- **No real authentication, email, or document storage**
- **No real-time messaging or notifications**
- **No document preview or anti-plagiarism**
- **No API or database**
- **No production security**

This is a frontend MVP for demo, user testing, and product validation.

---

## Getting Started

### Prerequisites
- Node.js v18.18.0 or higher (Node 20+ recommended)
- npm (comes with Node.js)

### Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   [http://localhost:3000](http://localhost:3000)

### Project Structure
```
peer-review-network/
├── app/
│   ├── page.js         # Main app logic (all UI, state, and components)
│   ├── layout.js       # Root layout and font setup
│   └── globals.css     # Tailwind CSS directives
├── public/             # Static assets (icons, etc.)
├── tailwind.config.ts  # Tailwind config
├── package.json        # Project metadata and scripts
└── ...
```

---

## Scripts
- `npm run dev` — Start the dev server (Turbopack, hot reload)
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint code

---

## Customization & Extending
- All logic is in `app/page.js` (single file for MVP)
- To add a backend, connect API calls in the provider components
- To persist data, replace dummy data with real API/database
- For production, implement authentication, storage, and security

---

## License
This MVP is for demo and educational purposes. For production use, add proper backend, security, and compliance.
