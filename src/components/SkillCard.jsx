import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../lib/cn'
import { TechIcon } from './icons/TechIcon'

export function SkillCard({ skill, primary = false, index = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.3) }}
      className={cn(
        'group flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-300',
        primary
          ? 'border-accent/25 bg-accent-soft hover:border-accent/55'
          : 'border-line bg-surface-2 hover:border-accent/40 hover:bg-surface',
      )}
    >
      <span
        className={cn(
          'grid size-9 shrink-0 place-items-center rounded-lg border transition-colors duration-300',
          primary
            ? 'border-accent/30 bg-canvas/60 text-accent'
            : 'border-line bg-canvas/60 text-muted group-hover:text-accent',
        )}
      >
        <TechIcon name={skill.icon} className="size-[18px]" />
      </span>
      <span className="min-w-0 truncate text-[14px] font-medium text-ink">{skill.name}</span>
    </motion.li>
  )
}

export function SkillGroupCard({ group, index = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : Math.min(index * 0.07, 0.28) }}
      className={cn(
        'flex flex-col gap-4 rounded-card border p-5 transition-colors duration-300 sm:p-6',
        group.emphasis
          ? 'border-accent/30 bg-gradient-to-b from-accent-soft to-transparent shadow-card'
          : 'border-line bg-surface shadow-card hover:border-line-2',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          className={cn(
            'font-mono text-[11px] font-medium uppercase tracking-[0.18em]',
            group.emphasis ? 'text-accent' : 'text-muted',
          )}
        >
          {group.label}
        </h3>
        {group.emphasis ? (
          <span className="rounded-md border border-accent/30 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent">
            Primary
          </span>
        ) : null}
      </div>

      {group.note ? <p className="text-[13px] leading-relaxed text-muted">{group.note}</p> : null}

      <ul className="grid gap-2 sm:grid-cols-2">
        {group.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            primary={group.emphasis}
            index={skillIndex}
          />
        ))}
      </ul>
    </motion.div>
  )
}