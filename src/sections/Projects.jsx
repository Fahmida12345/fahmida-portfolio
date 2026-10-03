import { useCallback, useState } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectModal } from '../components/ProjectModal'
import { Section, SectionHeading } from '../components/ui/Primitives'

export function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  const handleViewDetails = useCallback((project) => setActiveProject(project), [])
  const handleClose = useCallback(() => setActiveProject(null), [])

  return (
    <Section id="projects" labelledBy="projects-heading" className="border-y border-line bg-canvas-soft">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Projects"
            titleId="projects-heading"
            description="Meaningful projects only — a flagship full-stack MERN e-commerce platform first, then the React, e-commerce and JavaScript work that built up to it. Every card links to its source code."
            className="max-w-2xl"
          />

          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted lg:pb-2">
            {String(projects.length).padStart(2, '0')} projects · source code public
          </p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className={project.featured ? 'md:col-span-2' : undefined}
            >
              <ProjectCard
                project={project}
                index={index}
                featured={project.featured}
                onViewDetails={handleViewDetails}
              />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={activeProject} open={Boolean(activeProject)} onClose={handleClose} />
    </Section>
  )
}