import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// The app's fonts, self-hosted: Fredoka for headings, Nunito for body text.
import '@fontsource/fredoka/latin-600.css'
import '@fontsource/nunito/latin-500.css'
import '@fontsource/nunito/latin-700.css'
import '@fontsource/nunito/latin-800.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
