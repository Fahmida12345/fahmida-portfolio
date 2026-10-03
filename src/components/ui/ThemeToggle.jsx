import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { IconButton } from './Button'

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <IconButton
      onClick={toggleTheme}
      className={className}
      label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      <span className="relative block size-4">
        <Sun
          className={`absolute inset-0 size-4 transition-all duration-300 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
          }`}
        />
        <Moon
          className={`absolute inset-0 size-4 transition-all duration-300 ${
            isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </span>
    </IconButton>
  )
}