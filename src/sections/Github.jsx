import { ArrowUpRight, FolderGit2, RefreshCw, Star, Users } from 'lucide-react'
import { GithubIcon } from '../components/icons/BrandIcons'
import { useGithubProfile } from '../hooks/useGithubProfile'
import { Button } from '../components/ui/Button'
import { Reveal, Section, SectionHeading } from '../components/ui/Primitives'

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2 px-4 py-3">
      <p className="font-display text-xl font-semibold text-ink">{value}</p>
      <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{label}</p>
    </div>
  )
}

export function Github() {
  const { status, profile, repos, languages, error, profileUrl, fallbackRepos } = useGithubProfile()

  const visibleRepos = status === 'ready' ? repos.slice(0, 6) : fallbackRepos.slice(0, 5)

  return (
    <Section labelledBy="github-heading" className="border-y border-line bg-canvas-soft">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Code"
            title="Open Source & GitHub"
            titleId="github-heading"
            description="My public work lives on GitHub. The figures below are pulled live from the GitHub API — if the request fails, the section falls back to my curated project links instead of showing made-up numbers."
            className="max-w-2xl"
          />

          <Button as="a" href={profileUrl} target="_blank" rel="noreferrer noopener" variant="secondary">
            <GithubIcon className="size-4" />
            github.com/Fahmida12345
            <ArrowUpRight className="size-4" />
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="flex flex-col gap-4">
            <div className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
              <div className="flex items-start gap-4">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.name || profile.login} GitHub avatar`}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="size-14 shrink-0 rounded-xl border border-line object-cover"
                  />
                ) : (
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-muted">
                    <GithubIcon className="size-6" />
                  </span>
                )}

                <div className="min-w-0">
                  <p className="font-display text-[17px] font-semibold text-ink">
                    {profile?.name || 'Fahmida Yeasmin'}
                  </p>
                  <p className="font-mono text-[12px] text-accent">@{profile?.login || 'Fahmida12345'}</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                    {profile?.bio || 'MERN Stack Developer building full-stack web applications.'}
                  </p>
                </div>
              </div>

              {status === 'loading' ? (
                <p className="mt-5 flex items-center gap-2 font-mono text-[12px] text-muted">
                  <RefreshCw className="size-3.5 animate-spin" aria-hidden="true" />
                  Fetching live GitHub data…
                </p>
              ) : null}

              {status === 'ready' && profile ? (
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <Stat value={profile.publicRepos} label="Public repos" />
                  <Stat value={profile.followers} label="Followers" />
                  <Stat value={profile.following} label="Following" />
                </div>
              ) : null}

              {status === 'error' ? (
                <p className="mt-5 rounded-xl border border-line bg-surface-2 px-4 py-3 text-[13px] leading-relaxed text-muted">
                  {error} Numbers are hidden rather than estimated — the repository list below is
                  taken from my project data.
                </p>
              ) : null}
            </div>

            {languages.length > 0 ? (
              <div className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  Language breakdown
                </h3>
                <p className="mt-1.5 text-[12.5px] text-muted/80">
                  Share of public repositories by primary language.
                </p>

                <ul className="mt-5 flex flex-col gap-3.5">
                  {languages.slice(0, 6).map((language) => (
                    <li key={language.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-3 text-[13px]">
                        <span className="text-ink">{language.name}</span>
                        <span className="font-mono text-[11.5px] text-muted">
                          {language.count} repos · {language.percent}%
                        </span>
                      </div>
                      <span
                        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
                        aria-hidden="true"
                      >
                        <span
                          className="block h-full rounded-full transition-[width] duration-700"
                          style={{ width: `${language.percent}%`, backgroundColor: language.color }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  <FolderGit2 className="size-3.5" aria-hidden="true" />
                  Selected repositories
                </h3>
                <span className="font-mono text-[11px] text-muted/70">
                  {status === 'ready' ? 'most starred' : 'from project data'}
                </span>
              </div>

              <ul className="flex flex-col divide-y divide-line">
                {visibleRepos.map((repo) => (
                  <li key={repo.id ?? repo.name}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-start justify-between gap-4 py-3.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <GithubIcon className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
                          <span className="truncate font-mono text-[13.5px] text-ink transition-colors duration-200 group-hover:text-accent">
                            {repo.name}
                          </span>
                          {repo.language ? (
                            <span className="hidden shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[10.5px] text-muted sm:inline">
                              {repo.language}
                            </span>
                          ) : null}
                        </span>
                        {repo.description ? (
                          <span className="mt-1.5 line-clamp-2 block text-[13px] leading-relaxed text-muted">
                            {repo.description}
                          </span>
                        ) : null}
                      </span>

                      <span className="flex shrink-0 items-center gap-3 pt-0.5">
                        {typeof repo.stargazers_count === 'number' ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[12px] text-muted">
                            <Star className="size-3.5" aria-hidden="true" />
                            {repo.stargazers_count}
                          </span>
                        ) : null}
                        <ArrowUpRight className="size-4 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 rounded-card border border-line bg-surface px-5 py-4">
              <Users className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-[13.5px] leading-relaxed text-muted">
                Contribution history is viewable on my GitHub profile — the public activity graph is not
                duplicated here because it cannot be fetched without authentication.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}