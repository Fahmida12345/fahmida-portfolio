import { profile } from '../data/profile'
import { Portrait } from '../components/Portrait'
import { Reveal, Section, SectionHeading } from '../components/ui/Primitives'

const PROJECT_AREAS = [
  'React',
  'JavaScript',
  'MERN stack',
  'E-commerce systems',
  'Authentication',
  'REST APIs',
  'Admin dashboards',
  'Payment integration',
  'Database-driven applications',
]

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="flex flex-col gap-7">
          <SectionHeading
            eyebrow="About"
            title="About Me"
            titleId="about-heading"
            description="A developer from Bangladesh focused on full-stack web development with the MERN stack."
          />

          <div className="flex flex-col gap-5">
            {profile.about.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.08}>
                <p className="max-w-2xl text-[15px] leading-[1.75] text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                Areas I work in
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {PROJECT_AREAS.map((area) => (
                  <li
                    key={area}
                    className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[13px] text-muted transition-colors duration-200 hover:border-accent/40 hover:text-ink"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:sticky lg:top-28 lg:self-start">
          <Portrait />
        </Reveal>
      </div>
    </Section>
  )
}