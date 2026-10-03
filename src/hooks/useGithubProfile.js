import { useEffect, useState } from 'react'
import { projects as fallbackProjects } from '../data/projects'

const USERNAME = 'Fahmida12345'
const API_ROOT = 'https://api.github.com'

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C#': '#178600',
  Python: '#3572A5',
  PHP: '#4F5D95',
  SCSS: '#c6538c',
}

async function getJson(url, signal) {
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!response.ok) throw new Error(`GitHub responded with ${response.status}`)
  return response.json()
}

function summariseLanguages(repos) {
  const counts = repos.reduce((accumulator, repo) => {
    if (!repo?.language || repo.fork) return accumulator
    accumulator[repo.language] = (accumulator[repo.language] || 0) + 1
    return accumulator
  }, {})

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0)

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
      color: LANGUAGE_COLORS[name] ?? 'var(--c-accent)',
    }))
    .sort((a, b) => b.count - a.count)
}

export function useGithubProfile() {
  const [state, setState] = useState({
    status: 'loading',
    profile: null,
    repos: [],
    languages: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      try {
        const [profile, repos] = await Promise.all([
          getJson(`${API_ROOT}/users/${USERNAME}`, controller.signal),
          getJson(`${API_ROOT}/users/${USERNAME}/repos?sort=updated&per_page=100`, controller.signal),
        ]).catch((error) => {
          if (error.name === 'AbortError') throw error
          // One request failed (often rate limiting) — keep whatever resolved.
          return [null, []]
        })

        if (!active || controller.signal.aborted) return

        const usableRepos = Array.isArray(repos)
          ? repos.filter((repo) => !repo.fork).sort((a, b) => b.stargazers_count - a.stargazers_count)
          : []

        if (!profile) {
          setState({
            status: 'error',
            profile: null,
            repos: usableRepos,
            languages: summariseLanguages(usableRepos),
            error: 'Live GitHub data is unavailable right now.',
          })
          return
        }

        setState({
          status: 'ready',
          profile: {
            login: profile.login,
            name: profile.name,
            bio: profile.bio,
            avatarUrl: profile.avatar_url,
            htmlUrl: profile.html_url,
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            createdAt: profile.created_at,
          },
          repos: usableRepos,
          languages: summariseLanguages(usableRepos),
          error: null,
        })
      } catch {
        if (!active || controller.signal.aborted) return
        setState({
          status: 'error',
          profile: null,
          repos: [],
          languages: [],
          error: 'Live GitHub data could not be loaded.',
        })
      }
    }

    load()

    return () => {
      active = false
      controller.abort()
    }
  }, [])

  return {
    ...state,
    username: USERNAME,
    profileUrl: `https://github.com/${USERNAME}`,
    /** Shown when the API is rate-limited or offline — sourced from project data, not invented. */
    fallbackRepos: fallbackProjects.map((project) => ({
      id: project.id,
      name: project.title,
      description: project.summary,
      html_url: project.github,
      language: project.technologies[0],
      stargazers_count: null,
    })),
  }
}