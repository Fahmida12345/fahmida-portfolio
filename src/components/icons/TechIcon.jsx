import {
  Braces,
  Code2,
  Coffee,
  Cpu,
  Database,
  GitBranch,
  Hash,
  LayoutGrid,
  Lock,
  Mail,
  Network,
  Palette,
  Server,
  SquareTerminal,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const TECH_ICONS = {
  braces: Braces,
  code: Code2,
  coffee: Coffee,
  cpu: Cpu,
  database: Database,
  git: GitBranch,
  github: GithubIcon,
  hash: Hash,
  layout: LayoutGrid,
  linkedin: LinkedinIcon,
  lock: Lock,
  mail: Mail,
  network: Network,
  palette: Palette,
  react: null,
  server: Server,
  terminal: SquareTerminal,
}

/** React has no Lucide glyph — a small inline wordmark keeps the set consistent. */
function ReactGlyph({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="2.05" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </svg>
  )
}

export function TechIcon({ name, className = 'size-5' }) {
  if (name === 'react') return <ReactGlyph className={className} />

  const Icon = TECH_ICONS[name] ?? Code2
  return <Icon className={className} />
}

export { GithubIcon, LinkedinIcon }