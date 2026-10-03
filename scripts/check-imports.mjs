import fs from 'node:fs'
import path from 'node:path'

const LUCIDE_DTS = fs.readFileSync('./node_modules/lucide-react/dist/lucide-react.d.ts', 'utf8')
const lucideNames = new Set([
  ...[...LUCIDE_DTS.matchAll(/declare const ([A-Za-z0-9_]+):/g)].map((m) => m[1]),
  // Deprecated aliases are re-exported as `Original as Alias` rather than declared.
  ...[...LUCIDE_DTS.matchAll(/\b[A-Za-z0-9_]+ as ([A-Za-z0-9_]+)\b/g)].map((m) => m[1]),
])

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
  )
}

const problems = []

for (const file of walk('./src').filter((f) => /\.(jsx|js)$/.test(f))) {
  const source = fs.readFileSync(file, 'utf8')

  // Collect all identifiers bound by any import statement (local or package).
  const bound = new Set()
  for (const match of source.matchAll(/import\s+([^;]+?)\s+from\s+['"][^'"]+['"]/gs)) {
    const clause = match[1]
    for (const named of clause.matchAll(/\{([^}]*)\}/g)) {
      for (const part of named[1].split(',')) {
        const alias = part.split(/\s+as\s+/).pop().trim()
        if (alias) bound.add(alias)
      }
    }
    const def = clause.replace(/\{[^}]*\}/g, '').replace(/,/g, ' ').trim()
    if (def && !def.startsWith('*')) bound.add(def.split(/\s+/)[0])
  }

  // Identifiers used as JSX component tags.
  const used = new Set()
  for (const match of source.matchAll(/<([A-Z][A-Za-z0-9_]*)[\s/>]/g)) used.add(match[1])

  const locallyDefined = new Set([
    ...[...source.matchAll(/(?:function|const|class)\s+([A-Z][A-Za-z0-9_]*)/g)].map((m) => m[1]),
    // Destructured props such as ({ icon: Icon, title }) and defaults ({ as: Component = 'button' })
    ...[...source.matchAll(/([A-Z][A-Za-z0-9_]*)\s*[,}:=]/g)].map((m) => m[1]),
  ])

  for (const name of used) {
    if (bound.has(name) || locallyDefined.has(name)) continue
    problems.push(`${file}: <${name}> used but never imported`)
  }

  // Named lucide imports must exist in the installed lucide version.
  for (const match of source.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/gs)) {
    for (const part of match[1].split(',')) {
      const name = part.split(/\s+as\s+/)[0].trim()
      if (name && !lucideNames.has(name)) {
        problems.push(`${file}: "${name}" is not exported by lucide-react`)
      }
    }
  }
}

if (problems.length) {
  console.log(problems.join('\n'))
  process.exit(1)
}
console.log('icon + jsx import graph OK')