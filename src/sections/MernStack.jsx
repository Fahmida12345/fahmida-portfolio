import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { mernStack } from '../data/skills'
import { TechIcon } from '../components/icons/TechIcon'
import { Reveal, Section, SectionHeading } from '../components/ui/Primitives'

const LIFECYCLE = [
  'Responsive React interfaces',
  'REST API design',
  'Authentication',
  'Database modelling',
  'Backend services',
]

export function MernStack() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="stack" labelledBy="stack-heading" className="border-y border-line bg-canvas-soft">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-accent/8 blur-[110px]" />
      </div>

      <div className="relative flex flex-col gap-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            eyebrow="Primary stack"
            title="MERN Stack"
            titleId="stack-heading"
            description="My primary stack is the MERN stack, allowing me to work across the complete web application lifecycle — from responsive React interfaces to REST APIs, authentication, databases and backend services."
            className="max-w-xl"
          />

          <Reveal delay={0.1} className="lg:max-w-sm">
            <ul className="flex flex-col gap-2.5 rounded-card border border-line bg-surface p-5">
              {LIFECYCLE.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-muted">
                  <CheckCircle2 className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mernStack.map((tech, index) => (
            <motion.li
              key={tech.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-card border border-line bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-70"
              />
              <span className="relative grid size-12 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                <TechIcon name={tech.icon} className="size-6" />
              </span>
              <div className="relative flex flex-col gap-1.5">
                <h3 className="text-[17px] leading-tight">{tech.name}</h3>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent/80">
                  {tech.role}
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{tech.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  )
}