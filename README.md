# CLOAK Website (CLOAKWEBSITE)

The public website for CLOAK, a slot-based QR ticketing system for venues. It describes what the mobile app (CLOAKMobile) and backend (CLOAKBE) do today. Built with React, TypeScript, and Vite.

## 🎯 Overview

CLOAKWEBSITE is a static, responsive information site with four pages:

- **Home** (`/`) - What CLOAK is, real app screenshots, and what it does today
- **How it works** (`/about`) - The flow for venues and guests, step by step
- **Features** (`/features`) - Technical detail: signed QR codes, roles, slot locking, architecture
- **Status** (`/status`) - What works, what is half built, and what is not available yet

The site makes no API calls and has no sign-up, portal or pricing: CLOAK is in development and not publicly released.

### Keeping the site in step with the app

The site only states what the current build does. When the app or backend changes:

1. Update `src/config/status.ts` (the list behind the Status page) and `lastUpdated` in `src/config/app.ts`.
2. Update the copy on the page that describes the changed behaviour.
3. Retake the screenshots in `public/screenshots/` if a screen changed. They are captured from the app's web build at 375x812 with demo data.

## 🛠️ Technology Stack

- **React 18+** - UI library
- **TypeScript** - Type safety and better DX
- **Vite** - Next-gen build tool (lightning fast)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library (prepared)
- **Vitest** - Unit testing framework
- **Vercel** - Hosting & deployment

## 📋 Project Structure

```
CLOAKWEBSITE/
├── src/
│   ├── pages/                       # Page components (routed screens)
│   │   ├── LandingPage.tsx          # Home: hero, screenshots, what works today
│   │   ├── About.tsx                # How it works, for venues and guests
│   │   ├── Features.tsx             # Technical features and architecture
│   │   └── Status.tsx               # Project status (renders config/status.ts)
│   ├── components/
│   │   ├── Header.tsx               # Navigation bar
│   │   ├── Footer.tsx               # Footer
│   │   ├── Layout.tsx               # Main layout wrapper, sets page titles
│   │   ├── PhoneFrame.tsx           # App screenshot in a phone outline
│   │   ├── PageHero.tsx             # Green wave header that opens every page
│   │   ├── Waves.tsx                # Header waves, bottom waves, squiggle
│   │   ├── CloakUI.tsx              # Hanger mark, icon blobs, chips, ticket card
│   │   └── UI/
│   │       ├── Button.tsx           # Reusable button
│   │       ├── Input.tsx            # Form input
│   │       ├── Badge.tsx            # Badge component
│   │       ├── Alert.tsx            # Alert/notification
│   │       ├── Container.tsx        # Width container
│   │       └── index.ts             # Barrel export
│   ├── config/
│   │   ├── app.ts                   # Name, stage, navigation, screenshot list
│   │   ├── status.ts                # What works / is half built / is missing
│   │   └── seo.ts                   # Page titles and descriptions per route
│   ├── stores/
│   │   └── useAppStore.ts           # Zustand global state
│   ├── hooks/
│   │   ├── useTheme.ts              # Theme management
│   │   ├── useLocalStorage.ts       # Local storage hook
│   │   ├── usePageMeta.ts           # Sets title and description per route
│   │   └── index.ts                 # Barrel export
│   ├── types/
│   │   └── index.ts                 # TypeScript types & interfaces
│   ├── utils/
│   │   └── helpers.ts               # Utility functions
│   ├── __tests__/
│   │   ├── Button.test.tsx          # Component tests
│   │   ├── useLocalStorage.test.ts  # Hook tests
│   │   ├── pages.test.tsx           # Every page renders; redirects and nav work
│   │   └── setup.ts                 # Test configuration
│   ├── App.tsx                      # Main app component with routing
│   ├── index.css                    # Global styles
│   ├── main.tsx                     # Entry point
│   └── vite-env.d.ts                # Vite type definitions
├── public/
│   ├── screenshots/                 # Real app screens used on the pages
│   └── favicon.svg                  # CLOAK mark
├── .env.example                     # Example environment variables
├── .gitignore
├── vite.config.ts                   # Vite configuration
├── vitest.config.ts                 # Vitest configuration
├── tsconfig.json                    # TypeScript config
├── tsconfig.app.json                # App-specific TS config
├── tsconfig.node.json               # Build tool TS config
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── INSTRUCTOR.md                    # Template documentation
├── vercel.json                      # Vercel deployment config
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or 20+)
- npm or yarn package manager
- npm account (for Vercel deployment)

### Local Development

**1. Install dependencies:**

```bash
npm install
```

**2. Start development server:**

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module reloading (HMR).

**3. Build for production:**

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

**4. Preview production build:**

```bash
npm run preview
```

## 📝 Available Scripts

| Command          | Purpose                                |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Start dev server (http://localhost:5173) |
| `npm run build`  | Build for production                   |
| `npm run preview`| Preview production build locally       |
| `npm run lint`   | Run ESLint                            |
| `npm run test`   | Run Vitest unit tests                 |
| `npm run test:ui`| Run tests in UI mode                  |
| `npm run dashboard` | Site plus the local venue dashboard (see below) |
| `npm run dashboard:sample` | Same, with built-in sample statistics |

### Local venue dashboard

A venue can sign in at `/login` and see its statistics at `/dashboard`:
slots occupied and free right now, tickets issued and released per day,
average hold time, a page per service and recent activity.

The dashboard only exists in local development. It talks to the CLOAK
backend (CLOAKBE) running on this computer, so the public build that Vercel
deploys leaves it out, and it stays off unless the page is served from
`localhost`.

1. In `CLOAKBE`, load the sample data and start the API:
   `make seed`, then `make dev` (API on http://localhost:8080).
2. Here, run `npm run dashboard` and open http://localhost:5173/login.
3. Sign in with the sample venue from the CLOAKBE README
   (`venue@cloak.test`).

To point at a backend on another port, override the URL:
`VITE_API_URL=http://localhost:8081 npm run dashboard`.

## 🎨 Design System

CLOAKWEBSITE follows a modern, professional design system:

### Colors

The same palette as the mobile app (`CLOAKMobile/lib/core/colors/app_colors.dart`), defined as named colours in `tailwind.config.js`:

- **Greens**: `leaf` (`#387452`, primary), `forest` (`#244F38`), `fern` (`#5C9A76`), `sage` (`#9CCBAA`), `mint` (`#DDEEDC`)
- **Cream**: `cream` (`#FBF5E6`, page), `surface` (`#FFFDF8`, cards), `sand` (`#F4EBD6`), `line` (`#E5DAC0`)
- **Warm accents**: `apricot` (`#EFA35C`), also used for the "In development" markers, and `terracotta` (`#E6835A`)
- **Text**: `ink` (`#22382C`), `ink-soft` (`#5D6E63`), `on-leaf` (`#FFFBF0`, cream on green)
- **Status**: `success` (`#3F9B62`), `warning` (`#D9922B`), `danger` (`#C9523D`)

### Shapes

The site borrows the app's shapes (`CLOAKMobile/lib/shared/components/cloak_ui.dart`):

- `PageHero` - the green wave header that opens every page
- `HeaderWaves`, `BottomWaves`, `Squiggle` in `components/Waves.tsx` - the layered waves and the squiggly rule under headings
- `IconBlob`, `Chip`, `SectionHeading`, `TicketCard`, `HangerMark` in `components/CloakUI.tsx`
- `.card`, `.btn-primary`, `.btn-outline`, `.chip`, `.blob` in `src/index.css` - soft cards, pill buttons, pebble shapes

### Typography

- **Headings**: Fredoka, semibold (`font-display`)
- **Body**: Nunito, medium, with extra-bold for buttons and labels (`font-sans`)

Both fonts are self-hosted through the `@fontsource` packages imported in `src/main.tsx`, so the site makes no requests to a font service.

### Components

Pre-built reusable components in `src/components/UI/`:

- `Button` - CTA buttons with variants
- `Input` - Form input fields
- `Badge` - Labels/tags
- `Alert` - Notifications
- `Container` - Max-width wrapper

## 🔗 API Integration

The pages are static and do not call the CLOAKBE API today. A small fetch wrapper exists in `src/services/api.ts` for when they do; it reads the API endpoint from `.env`:

```env
VITE_API_URL=http://localhost:8080
```

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` for local development:

```env
# Backend API (only read by src/services/api.ts)
VITE_API_URL=http://localhost:8080
```

**Note**: Only variables prefixed with `VITE_` are exposed to the frontend.

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

UI mode:

```bash
npm run test:ui  # Opens Vitest UI at http://localhost:51204
```

## 📦 Adding New Components

**1. Create component file:**

```bash
touch src/components/MyComponent.tsx
```

**2. Write component:**

```typescript
interface MyComponentProps {
  title: string
  onClick?: () => void
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
    </div>
  )
}
```

**3. Export from barrel index (if in folders):**

```typescript
// src/components/UI/index.ts
export { MyComponent } from './MyComponent'
```

**4. Use in pages:**

```typescript
import { MyComponent } from '@/components'

export default function SomePage() {
  return <MyComponent title="Hello" />
}
```

## 📄 Adding New Pages

**1. Create page file:**

```bash
touch src/pages/NewPage.tsx
```

**2. Write page:**

```typescript
export default function NewPage() {
  return (
    <div className="space-y-6">
      <h1>New Page</h1>
      {/* page content */}
    </div>
  )
}
```

**3. Add route in `App.tsx`:**

```typescript
import NewPage from './pages/NewPage'

const routes = [
  // ... existing routes
  {
    path: '/new-page',
    element: <NewPage />,
  },
]
```

## 🎯 State Management

Global state with Zustand:

```typescript
// src/stores/useAppStore.ts
import { create } from 'zustand'

interface AppStore {
  user: User | null
  setUser: (user: User) => void
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

Usage in components:

```typescript
function Header() {
  const { user, setUser } = useAppStore()
  return <div>{user?.name || 'Guest'}</div>
}
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

**1. Connect GitHub repository:**

```bash
npm install -g vercel
vercel  # Login and follow prompts
```

**2. Configure environment variables in Vercel dashboard:**

- `VITE_API_URL` - Backend API endpoint

**3. Automatic deployments:**

Vercel automatically deploys on every push to `main` branch.

### Manual Build & Deployment

```bash
# Build
npm run build

# Deploy to your hosting (Netlify, AWS S3, etc)
# Usually just upload the dist/ folder
```

### Build Output

After `npm run build`, the `dist/` folder contains:

```
dist/
├── index.html      # Entry HTML
├── assets/
│   ├── [hash].js   # Bundled JavaScript
│   └── [hash].css  # Bundled CSS
└── [static assets]
```

## 🔍 SEO

SEO metadata is managed in `src/config/seo.ts`:

```typescript
const SEO = {
  title: 'CLOAK - Digital Ticketing Platform',
  description: 'Secure, modern ticketing for events and venues',
  keywords: ['tickets', 'events', 'QR codes'],
  ogImage: '/og-image.png',
}
```

Update `index.html` and use in page components for proper meta tags.

## 🐛 Troubleshooting

### Port 5173 Already in Use

```bash
npm run dev -- --port 5174  # Use different port
```

### Build Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### CSS Not Applying

```bash
# Rebuild Tailwind cache
npm run build
```

See `tailwind.config.js` for template configuration.

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Router](https://reactrouter.com)
- [Zustand](https://zustand-demo.vercel.app)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/my-feature`
5. Open Pull Request

## 📄 License

MIT License - See LICENSE file

## ❓ Questions?

Check the docs folder or open an issue on GitHub.

---

**Built with ❤️ for the CLOAK ticketing system**
