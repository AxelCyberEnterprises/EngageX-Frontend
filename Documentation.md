# Frontend Documentation: EngageX Virtual Presentation Practice Platform

## Project Overview

The Virtual Presentation Practice Platform is a web-based, mobile-friendly application designed to elevate speaking skills for sales professionals, entrepreneurs, athletes, and corporate leaders. It provides an immersive, AI-powered environment to prepare, persuade, and perfect presentations with confidence. The platform combines a hybrid coaching model with AI-driven insights and certified coach feedback to deliver personalized, actionable guidance.

### Key Features and Benefits

- **Real-Time Feedback**: Receive instant feedback on live presentations and slide decks, with tools to compare sessions and track progress over time.
- **Hybrid Coaching Model**: Combines generative AI with certified coach insights for data-driven, human-expert feedback.
- **Performance Metrics**: Tracks standout metrics aligned with industry benchmarks for measurable impact.
- **Expert Feedback**: Provides guidance on sales presentations and client pitches to strengthen delivery.
- **Inspirational Delivery**: Supports impactful communication for role models, public figures, and industry leaders.
- **Storytelling Excellence**: Refines skills in transformative communication, presence, and emotional connection.
- **Session Recordings**: Allows downloading audio/video recordings and comprehensive performance feedback reports.

## Technology Stack

The frontend is built with the following technologies:

- **Framework**: React v19.0.0
- **Styling**: Tailwind CSS v4.0.9
- **Language**: TypeScript
- **Build Tool**: Vite v4.0.8
- **State Management**: Redux (via @reduxjs/toolkit v2.6.1, react-redux v9.2.0)
- **Data Fetching**: Axios v1.8.3, React Query v5.68.0
- **UI Components**: Material-UI v6.4.6, Radix UI (various components), Lucide React v0.477.0
- **Other Libraries**:
    - Form handling: react-hook-form v7.54.2, @hookform/resolvers v4.1.3, zod v3.24.2
    - PDF handling: react-pdf v9.2.1, html2pdf.js v0.10.3, jspdf v3.0.1
    - Media: react-media-recorder v1.7.1
    - Charts: react-chartjs-2 v5.3.0, recharts v2.15.1, react-apexcharts v1.7.0
    - Other utilities: date-fns v4.1.0, uuid v11.1.0, socket.io-client v4.8.1, etc.
- Full dependency list available in package.json.

## Project Structure

The frontend codebase is organized as follows:

```
public/
├── assets/                     # Design system, landing page assets, session-related assets
└── fonts/                      # Custom fonts (e.g., Neue)
src/
├── assets/images/              # JPEGs, PNGs, SVGs, WebPs
├── components/                 # Reusable UI components
│   ├── authPageComponents/     # Authentication-related components
│   ├── contact/                # Contact page components
│   ├── controlled-fields/      # Form input components
│   ├── dashboard/              # Dashboard components
│   │   ├── agreementModal/     # Modal for agreements
│   │   └── performance-improvement/ # Performance tracking components
│   ├── dialogs/                # Dialog components
│   │   └── dialog-contents/start-session/ # Start session dialog
│   ├── features/               # Feature-specific components
│   ├── forms/                  # Form components (e.g., PitchPracticeForm, PublicSpeakingForm)
│   ├── help/                   # Help/support components
│   ├── homepage/               # Homepage components
│   ├── layouts/                # Layout components
│   ├── modals/modalVariants/   # Modal variants
│   ├── press/                  # Press page components
│   ├── pricing/                # Pricing page components
│   ├── profileLoader/          # Profile loading components
│   ├── select/                 # Custom select components
│   ├── session/                # Session-related components
│   ├── skeletons/              # Loading skeletons
│   ├── tables/                 # Table components (e.g., performance-metric-table, session-history-table)
│   ├── ui/custom-toasts/       # Custom toast notifications
│   └── widgets/pdf-viewer/     # PDF viewer widget
├── config/                     # Configuration files
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── pages/                      # Page components
│   ├── Dashboard/              # Dashboard pages (Admin, User)
│   ├── Press/                  # Press page
│   ├── Sessions/               # Sessions page
│   └── auth/                   # Authentication pages
├── schemas/                    # Zod schemas for validation
│   └── dashboard/user/         # User-specific schemas
├── store/                      # Redux store
│   └── slices/dashboard/user/  # Redux slices for dashboard
├── styles/                     # Styling files
│   ├── base/                   # Base styles
│   ├── components/             # Component-specific styles
│   ├── pages/dashboard/        # Dashboard page styles (Admin, User)
│   └── utils/                  # Utility styles
└── types/                      # TypeScript type definitions
```

## Setup Instructions

To set up the frontend locally:

1. Clone the repository: git clone <repo-url>
2. Navigate to the project directory: cd <project-directory>
3. Install dependencies: yarn install
4. Create a .env file in the root directory with the following variables:
    
    ```
    VITE_API_URL=<primary-api-url>
    VITE_SECONDARY_API_URL=<secondary-api-url>
    ```
    
5. Start the development server: yarn start
6. The app will be available at http://localhost:5173.

## Key Features and Components

- **Dashboard** (src/pages/Dashboard.js): Displays user/admin stats, session metrics, and performance insights.
- **Auth Components** (src/components/authPageComponents): Handles login, registration, and authentication flows.
- **Session Components** (src/components/session): Manages session creation, recording, and feedback display.
- **Forms** (src/components/forms): Includes PitchPracticeForm, PresentationPracticeForm, and PublicSpeakingForm for practice session setup.
- **Tables** (src/components/tables): Displays performance metrics, recent sessions, session comparisons, and session history for both admin and user roles.
- **PDF Viewer** (src/components/widgets/pdf-viewer): Renders slide decks and session reports.
- **Modals and Dialogs** (src/components/modals, src/components/dialogs): Handles session start, agreements, and other interactive prompts.

## Routing

The app uses react-router-dom v7.2.0 for navigation:

- / → Home page
- /login → Login page
- /dashboard → User or Admin dashboard (role-based rendering)

## State Management

State is managed using Redux (@reduxjs/toolkit, react-redux):

- **Stores**: Manages user authentication, chatbot interactions, user profile, and session data.
- **Location**: Redux slices are located in src/store/slices.
- **Usage**: Components access state via useSelector and dispatch actions via useDispatch.

## API Integration

The frontend communicates with the backend using Axios and React Query. Key endpoints include:

### User-Related Endpoints

- **GET /users/assign/**: List user assignments
- **POST /users/assign/**: Create user assignment
- **GET /users/assign/admin_users/**: List admin users
- **POST /users/assign/assign_user/**: Assign a user
- **GET /users/assign/user_admin/**: List user admins
- **GET/PUT/PATCH/DELETE /users/assign/{id}/**: CRUD operations for assignments
- **POST /users/auth/google-login/**: Google login
- **POST /users/auth/login/**: Standard login
- **POST /users/auth/password-reset/**: Password reset request
- **POST /users/auth/token/login/**: Token-based login
- **POST /users/auth/verify-email/**: Email verification
- **POST /users/contact-us/**: Contact form submission

### Session-Related Endpoints

- **GET/POST /sessions/chunk_sentiment_analysis/**: Sentiment analysis for session chunks
- **GET /sessions/compare-sequences/{sequence_id}/**: Compare session sequences
- **GET /sessions/compare-sessions/{session1_id}/{session2_id}/**: Compare two sessions
- **GET /sessions/dashboard/**: Role-based aggregated dashboard data
- **GET /sessions/performance-analytics/**: Performance analytics
- **GET/PUT /sessions/practice-sessions/{id}/upload-slides/**: Upload slides for sessions
- **GET/POST /sessions/sequence/**: Create/list session sequences
- **GET /sessions/sessions-list/**: List all sessions
- **GET/POST /sessions/sessions-report/{session_id}/**: Generate session reports
- **GET /sessions/sessions/sessions-by-day/**: Sessions grouped by day
- **GET /sessions/sessions/sessions-by-month/**: Sessions grouped by month

## Styling Approach

- **Primary Styling**: Tailwind CSS v4.0.9 for utility-first styling.
- **Global Styles**: Defined in src/styles/global.css.
- **Component-Specific Styles**: Located in src/styles/components and src/styles/pages.
- **Utilities**: Additional utilities in src/styles/utils.
- **Libraries**: Uses Material-UI and Radix UI for pre-styled components.

## Testing

No testing framework is currently implemented. Developers are encouraged to add Jest or React Testing Library for unit and integration tests as needed.

## Build and Deployment

- **Build**: Run yarn build to create a production-ready build in the dist folder.
- **Deployment**: Deploy to Render using their CLI or dashboard:
    1. Ensure the production build is created.
    2. Follow Render’s deployment instructions for static sites or Node.js apps.
    3. Set environment variables (VITE_API_URL, VITE_SECONDARY_API_URL) in the Render dashboard.

## Contributing Guidelines

- **Branch Naming**: Use feature/<feature-name> for new features, fix/<bug-name> for bug fixes.
- **Pull Requests**: Submit PRs to the main branch with a clear description of changes.
- **Code Style**: Follow TypeScript conventions and ensure linting passes (yarn lint).
- **Commits**: Use descriptive commit messages (e.g., Add session comparison table component).

## Known Issues or Limitations

- No known issues reported at this time.

## Contact and Support

- **Frontend Team**: Reach out on Slack at #frontend-support.
- **Issues**: Report bugs or feature requests via the project’s GitHub repository.

## Environment Variables

The following .env variables are required:

```
VITE_API_URL=<primary-api-url>
VITE_SECONDARY_API_URL=<secondary-api-url>
```

## Target Audience

This documentation is intended for:

- New developers onboarding to the project.
- Maintainers updating or extending the frontend.
- External contributors collaborating on features or bug fixes.