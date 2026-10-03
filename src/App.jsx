import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Github } from './sections/Github'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { MernStack } from './sections/MernStack'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { WhatIBuild } from './sections/WhatIBuild'
import { RootLayout } from './layouts/RootLayout'

export default function App() {
  return (
    <RootLayout>
      <Hero />
      <MernStack />
      <About />
      <Projects />
      <Skills />
      <WhatIBuild />
      <Journey />
      <Github />
      <Contact />
    </RootLayout>
  )
}