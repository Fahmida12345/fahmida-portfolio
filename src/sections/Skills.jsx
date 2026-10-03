import { skillGroups } from '../data/skills'
import { SkillGroupCard } from '../components/SkillCard'
import { Reveal, Section, SectionHeading } from '../components/ui/Primitives'

export function Skills() {
  const supporting = skillGroups.filter((group) => !group.emphasis)
  const primary = skillGroups.find((group) => group.emphasis)

  return (
    <Section id="skills" labelledBy="skills-heading">
      <div className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills"
          titleId="skills-heading"
          description="Organised by how I actually use them — the MERN stack sits at the centre, with frontend, backend, database and tooling skills supporting it."
          className="max-w-2xl"
        />

        {primary ? <SkillGroupCard group={primary} /> : null}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {supporting.map((group, index) => (
            <SkillGroupCard key={group.id} group={group} index={index} />
          ))}
        </div>

        <Reveal>
          <p className="max-w-3xl text-[14px] leading-relaxed text-muted">
            Full-stack work is where these meet: React on the front, Express and Node.js behind it,
            MongoDB holding the data, and Git carrying every change. Java, C# and Arduino sit
            outside that core loop and are listed as additional technologies rather than primary
            ones.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}