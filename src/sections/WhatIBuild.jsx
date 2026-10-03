import { motion, useReducedMotion } from 'framer-motion'
import { capabilities } from '../data/skills'
import { TechIcon } from '../components/icons/TechIcon'
import { Section, SectionHeading } from '../components/ui/Primitives'

export function WhatIBuild() {
  const reduceMotion = useReducedMotion()

  return (
    <Section labelledBy="what-i-build-heading" className="border-y border-line bg-canvas-soft">
      <div className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Focus"
          title="What I Build"
          titleId="what-i-build-heading"
          description="Four areas of work, described in terms of what actually gets built."
          className="max-w-2xl"
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => (
            <motion.li
              key={capability.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-card border border-line bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -bottom-16 h-32 bg-accent/8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="relative grid size-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent transition-colors duration-300 group-hover:border-accent/35 group-hover:bg-accent-soft">
                <TechIcon name={capability.icon} className="size-[22px]" />
              </span>
              <h3 className="relative text-[16px] leading-snug">{capability.title}</h3>
              <p className="relative text-[13.5px] leading-relaxed text-muted">{capability.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  )
}