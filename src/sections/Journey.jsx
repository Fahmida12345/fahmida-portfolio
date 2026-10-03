import { journey, journeySummary } from '../data/journey'
import { TimelineItem } from '../components/TimelineItem'
import { Section, SectionHeading } from '../components/ui/Primitives'

export function Journey() {
  return (
    <Section id="journey" labelledBy="journey-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Progression"
            title={journeySummary.title}
            titleId="journey-heading"
            description={journeySummary.text}
          />

          <div className="mt-8 rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Reading this timeline
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              It describes technical progression across public repositories — the order in which
              capabilities were added. It is not an employment history.
            </p>
          </div>
        </div>

        <ol className="flex flex-col">
          {journey.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === journey.length - 1}
            />
          ))}
        </ol>
      </div>
    </Section>
  )
}