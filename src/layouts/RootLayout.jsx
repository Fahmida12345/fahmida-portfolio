import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function RootLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-accent/40 focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:text-accent"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}