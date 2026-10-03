import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import { profile, socials } from '../data/profile'
import { ContactForm } from '../components/ContactForm'
import { SocialLinks } from '../components/SocialLinks'
import { cn } from '../lib/cn'
import { Reveal, Section, SectionHeading } from '../components/ui/Primitives'

const CHANNELS = [
  { id: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  ...socials.filter((social) => social.id !== 'email'),
]

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Contact"
            title="Let's Build Something Together"
            titleId="contact-heading"
            description="Have a project, idea, or opportunity? I'd love to hear about it."
            className="max-w-2xl"
          />

          <div className="flex flex-col gap-2 lg:pb-2">
            <p className="flex items-center gap-2 font-mono text-[12px] text-muted">
              <MapPin className="size-3.5 text-accent" aria-hidden="true" />
              {profile.location}
            </p>
            <p className="flex items-center gap-2 font-mono text-[12px] text-muted">
              <Clock3 className="size-3.5 text-accent" aria-hidden="true" />
              Replies within a few days
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <Reveal className="flex flex-col gap-4">
            <ul className="flex flex-col gap-3">
              {CHANNELS.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.id === 'email' ? undefined : '_blank'}
                    rel={channel.id === 'email' ? undefined : 'noreferrer noopener'}
                    aria-disabled={channel.href ? undefined : 'true'}
                    onClick={channel.href ? undefined : (event) => event.preventDefault()}
                    title={channel.href ? undefined : `Add the ${channel.label} URL in src/data/profile.js`}
                    className={cn(
                      'group flex items-center justify-between gap-4 rounded-card border px-5 py-4 shadow-card transition-all duration-300',
                      channel.href
                        ? 'border-line bg-surface hover:-translate-y-0.5 hover:border-accent/45'
                        : 'cursor-not-allowed border-dashed border-line-2 bg-surface-2 opacity-70',
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
                        {channel.label}
                      </span>
                      <span
                        className={cn(
                          'mt-1 block truncate text-[14.5px]',
                          channel.href
                            ? 'text-ink transition-colors duration-200 group-hover:text-accent'
                            : 'text-muted',
                        )}
                      >
                        {channel.value ?? channel.handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        'size-4 shrink-0 transition-all duration-200',
                        channel.href
                          ? 'text-muted group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent'
                          : 'text-muted/50',
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="rounded-card border border-line bg-surface-2 p-5">
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                Good fit for
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-[13.5px] text-muted">
                <li className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  Full-stack MERN roles & freelance projects
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  E-commerce and admin dashboard builds
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  React frontend work
                </li>
              </ul>
            </div>

            <SocialLinks size="sm" showPending />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-card border border-line bg-surface p-5 shadow-card sm:p-7">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}