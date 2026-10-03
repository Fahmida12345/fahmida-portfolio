import {
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Lightbulb,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'
import { GithubIcon } from './icons/BrandIcons'
import { ProjectVisual } from './ProjectVisual'

function Block({ icon: Icon, title, children }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        <Icon className="size-3.5 text-accent" />
        {title}
      </h3>
      {children}
    </section>
  )
}

export function ProjectModal({ project, open, onClose }) {
  if (!project) return null

  const { number, title, kicker, role, description, purpose, technologies, features, highlights, github, live } =
    project

  return (
    <Modal open={open} onClose={onClose} title={title} subtitle={`${number} / ${role}`}>
      <div className="flex flex-col gap-8">
        <div className="overflow-hidden rounded-xl border border-line bg-surface-2">
          <div className="aspect-[16/9] w-full">
            <ProjectVisual variant={project.visual} accent={project.featured} title={title} />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-lg border border-accent/25 bg-accent-soft px-2.5 py-1 font-mono text-[11px] text-accent"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <Block icon={Layers} title="Project overview">
            <p className="text-[15px] leading-relaxed text-muted">{description}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted/70">
              {kicker}
            </p>
          </Block>

          <Block icon={Target} title="Problem / purpose">
            <p className="text-[15px] leading-relaxed text-muted">{purpose}</p>
          </Block>

          <Block icon={CheckCircle2} title="Main features">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Zap} title="Development highlights">
            <ul className="grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight.title}
                  className="rounded-xl border border-line bg-surface-2 p-4 transition-colors duration-300 hover:border-accent/40"
                >
                  <h4 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                    <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
                    {highlight.title}
                  </h4>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{highlight.text}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Lightbulb} title="Links">
            <div className="flex flex-wrap gap-2.5">
              <Button as="a" href={github} target="_blank" rel="noreferrer noopener" size="md">
                <GithubIcon className="size-4" />
                View Repository
                <ArrowUpRight className="size-4" />
                <span className="sr-only"> for {title} on GitHub</span>
              </Button>

              {live ? (
                <Button
                  as="a"
                  href={live}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                  size="md"
                >
                  Live Demo
                  <ArrowUpRight className="size-4" />
                  <span className="sr-only"> for {title}</span>
                </Button>
              ) : null}
            </div>
            {!live ? (
              <p className="text-[13px] text-muted/80">
                This project is published as source code only — no public deployment is linked.
              </p>
            ) : null}
          </Block>
        </div>
      </div>
    </Modal>
  )
}