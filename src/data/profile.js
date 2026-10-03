export const profile = {
  name: 'Fahmida Yeasmin',
  role: 'MERN Stack Developer',
  headline: 'Building modern, scalable and user-focused web applications with the MERN stack.',
  location: 'Bangladesh',
  email: 'fahmidayeasmin.me@gmail.com',
  intro:
    "I'm Fahmida Yeasmin, a MERN Stack Developer passionate about building modern web applications, interactive user interfaces, and full-stack solutions. I enjoy turning ideas into functional, responsive and reliable digital experiences.",
  about: [
    'I am a developer from Bangladesh focused on full-stack web development with the MERN stack. My work spans React interfaces, Express and Node.js services, MongoDB data modelling, authentication and database-driven applications.',
    'My projects cover e-commerce systems, REST APIs, JWT authentication, admin dashboards, payment integration and responsive frontend work. I care about clean structure, understandable code and interfaces that stay usable on every screen size.',
    'My public GitHub history shows a clear progression — starting with HTML and CSS foundations, moving through JavaScript, then React and e-commerce interfaces, and finally into full-stack MERN development with backend APIs, authentication and payment workflows.',
  ],
  primaryStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  // Drop the photo at public/fahmida.jpg (or change the path) and it appears here.
  portrait: {
    src: '/fahmida.jpg',
    alt: 'Fahmida Yeasmin, MERN Stack Developer from Bangladesh',
  },
  resume: {
    file: '/fahmida-yeasmin-resume.pdf',
    label: 'Download Resume',
    available: false,
  },
  // Set this to a form endpoint (Formspree, Web3Forms, your own API, ...) to
  // enable real submissions. While null, the form composes a mailto: message.
  contactEndpoint: null,
}

export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@Fahmida12345',
    href: 'https://github.com/Fahmida12345',
    icon: 'github',
  },
  {
    // TODO: replace with the real profile URL. Left null rather than guessed —
    // a dead LinkedIn link is worse than a clearly pending one.
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Profile link pending',
    href: null,
    icon: 'linkedin',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'fahmidayeasmin.me@gmail.com',
    href: 'mailto:fahmidayeasmin.me@gmail.com',
    icon: 'mail',
  },
]

export const navigation = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]