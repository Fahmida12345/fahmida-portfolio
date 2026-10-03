import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Eye } from 'lucide-react'
import { GithubIcon } from './icons/BrandIcons'
import { cn } from '../lib/cn'
import { ProjectVisual } from './ProjectVisual'

const MAX_BADGES = { featured: 8, standard: 4 }

export function ProjectCard({ project, onViewDetails, index = 0, featured = false }) {
  const reduceMotion = useReducedMotion()
  const badgeLimit = featured ? MAX_BADGES.featured : MAX_BADGES.standard
  const overflow = project.technologies.length - badgeLimit

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : Math.min(index * 0.08, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card',
        'transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-lift focus-within:border-accent/45',
        featured && 'md:flex-row md:items-stretch',
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        className={cn(
          'relative w-full overflow-hidden border-line bg-surface-2',
          featured
            ? 'aspect-[16/10] border-b md:aspect-auto md:w-[52%] md:border-b-0 md:border-r'
            : 'aspect-[16/10] border-b',
        )}
      >
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
          <ProjectVisual variant={project.visual} accent={featured} title={project.title} />
        </div>
        <span className="absolute left-4 top-4 rounded-lg border border-line bg-canvas/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur-sm">
          {project.number}
        </span>
        {featured ? (
          <span className="absolute right-4 top-4 rounded-lg border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent backdrop-blur-sm">
            Flagship
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
            {project.kicker}
          </p>
          <h3 className={cn('leading-tight', featured ? 'text-xl sm:text-2xl' : 'text-lg')}>
            <button
              type="button"
              onClick={() => onViewDetails(project)}
              className="text-left transition-colors duration-200 hover:text-accent focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {project.title}
              <span className="sr-only"> — open project details</span>
            </button>
          </h3>
          <p className="text-[14.5px] leading-relaxed text-muted">{project.summary}</p>
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, badgeLimit).map((technology) => (
            <li
              key={technology}
              className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {technology}
            </li>
          ))}
          {overflow > 0 ? (
            <li className="rounded-lg border border-line px-2.5 py-1 font-mono text-[11px] text-muted/70">
              +{overflow}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <GithubIcon className="size-4" />
            GitHub
            <span className="sr-only"> repository for {project.title}</span>
          </a>

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Live Demo
              <span className="sr-only"> for {project.title}</span>
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}

          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="group/details ml-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-medium text-accent transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Eye className="size-4" />
            View Details
            <span className="sr-only"> for {project.title}</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}