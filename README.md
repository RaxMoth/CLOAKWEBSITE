# CLOAK Website (CLOAKWEBSITE)

The public-facing marketing and business portal for the CLOAK digital ticketing platform. Built with React, TypeScript, and Vite for optimal performance and developer experience.

## 🎯 Overview

CLOAKWEBSITE is a modern, responsive web application that serves as:

- **Marketing Hub** - Landing page showcasing CLOAK features and benefits
- **Business Portal** - Dashboard for businesses to manage services, view analytics, and monitor tickets
- **Customer Access** - Information about events and services
- **Partner Onboarding** - Sign-up and documentation for new businesses

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
│   │   ├── LandingPage.tsx          # Home/hero section
│   │   ├── Features.tsx             # Feature showcase
│   │   ├── Services.tsx             # Services overview
│   │   ├── Portfolio.tsx            # Case studies/examples
│   │   ├── About.tsx                # About CLOAK
│   │   └── [Other pages]
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx           # Navigation bar
│   │   │   ├── Footer.tsx           # Footer
│   │   │   └── Layout.tsx           # Main layout wrapper
│   │   ├── UI/
│   │   │   ├── Button.tsx           # Reusable button
│   │   │   ├── Input.tsx            # Form input
│   │   │   ├── Card.tsx             # Card component
│   │   │   ├── Badge.tsx            # Badge component
│   │   │   ├── Alert.tsx            # Alert/notification
│   │   │   ├── Container.tsx        # Width container
│   │   │   └── index.ts             # Barrel export
│   │   ├── Card.tsx                 # Feature card
│   │   ├── FeatureComponent.tsx     # Feature showcase
│   │   ├── Month.tsx                # Calendar component
│   │   └── [Other components]
│   ├── config/
│   │   ├── app.ts                   # App-level config
│   │   ├── seo.ts                   # SEO metadata
│   │   └── firebase.ts              # Firebase setup (optional)
│   ├── stores/
│   │   └── useAppStore.ts           # Zustand global state
│   ├── hooks/
│   │   ├── useTheme.ts              # Theme management
│   │   ├── useLocalStorage.ts       # Local storage hook
│   │   └── index.ts                 # Barrel export
│   ├── types/
│   │   └── index.ts                 # TypeScript types & interfaces
│   ├── utils/
│   │   └── helpers.ts               # Utility functions
│   ├── __tests__/
│   │   ├── Button.test.tsx          # Component tests
│   │   ├── useLocalStorage.test.ts  # Hook tests
│   │   └── setup.ts                 # Test configuration
│   ├── App.tsx                      # Main app component with routing
│   ├── index.css                    # Global styles
│   ├── main.tsx                     # Entry point
│   └── vite-env.d.ts                # Vite type definitions
├── public/                          # Static assets (images, fonts, etc)
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

## 🎨 Design System

CLOAKWEBSITE follows a modern, professional design system:

### Colors

- **Primary**: Blue (`#0066ff`)
- **Secondary**: Gray (`#666666`)
- **Success**: Green (`#00ff00`)
- **Error**: Red (`#ff0000`)
- **Background**: Almost Black (`#0a0a0a`)
- **Card**: Dark Gray (`#1a1a1a`)
- **Text**: White (`#ffffff`)

### Typography

- **Display**: Bold, large headings
- **Heading**: Semibold, section titles
- **Body**: Regular, content text
- **Small**: Smaller, secondary text

### Components

Pre-built reusable components in `src/components/UI/`:

- `Button` - CTA buttons with variants
- `Input` - Form input fields
- `Card` - Content cards
- `Badge` - Labels/tags
- `Alert` - Notifications
- `Container` - Max-width wrapper

## 🔗 API Integration

The website connects to CLOAKBE API:

```typescript
// Example: Fetch featured services
const response = await fetch(`${API_URL}/api/v1/services?limit=6`)
const services = await response.json()
```

Configure API endpoint in `.env`:

```env
VITE_API_URL=http://localhost:8080
```

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` for local development:

```env
# Backend API
VITE_API_URL=http://localhost:8080

# Firebase (optional, for CMS/analytics)
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
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
