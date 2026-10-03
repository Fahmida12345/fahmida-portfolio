export const mernStack = [
  {
    id: 'mongodb',
    name: 'MongoDB',
    role: 'Database',
    description:
      'Document data modelling for products, users and orders — collections, references and queries.',
    icon: 'database',
  },
  {
    id: 'express',
    name: 'Express.js',
    role: 'Server framework',
    description:
      'REST API routing, middleware, JWT verification and request handling for the backend.',
    icon: 'server',
  },
  {
    id: 'react',
    name: 'React',
    role: 'Frontend library',
    description:
      'Component-driven, responsive interfaces with state, reusable UI and data fetching.',
    icon: 'react',
  },
  {
    id: 'node',
    name: 'Node.js',
    role: 'Runtime',
    description:
      'Server-side JavaScript powering the API, authentication flow and business logic.',
    icon: 'terminal',
  },
]

export const skillGroups = [
  {
    id: 'primary',
    label: 'Primary Stack',
    emphasis: true,
    note: 'My main stack — used together across full-stack projects.',
    skills: [
      { name: 'MongoDB', icon: 'database' },
      { name: 'Express.js', icon: 'server' },
      { name: 'React', icon: 'react' },
      { name: 'Node.js', icon: 'terminal' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'JavaScript', icon: 'braces' },
      { name: 'React', icon: 'react' },
      { name: 'HTML5', icon: 'code' },
      { name: 'CSS3', icon: 'palette' },
      { name: 'Responsive Design', icon: 'layout' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'terminal' },
      { name: 'Express.js', icon: 'server' },
      { name: 'REST APIs', icon: 'network' },
      { name: 'JWT Authentication', icon: 'lock' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    skills: [
      { name: 'MongoDB', icon: 'database' },
      { name: 'MySQL', icon: 'database' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
    ],
  },
  {
    id: 'other',
    label: 'Other Technologies',
    skills: [
      { name: 'Java', icon: 'coffee' },
      { name: 'C#', icon: 'hash' },
      { name: 'Arduino', icon: 'cpu' },
    ],
  },
]

export const capabilities = [
  {
    id: 'fullstack',
    icon: 'layers',
    title: 'Full-Stack Applications',
    text: 'End-to-end web applications using the MERN stack — interface, API, authentication and database.',
  },
  {
    id: 'ecommerce',
    icon: 'shopping-cart',
    title: 'E-Commerce Systems',
    text: 'Product catalogs, authentication, carts, orders, admin management and payment workflows.',
  },
  {
    id: 'frontend',
    icon: 'layout',
    title: 'Modern Frontends',
    text: 'Responsive React interfaces focused on usability, component structure and clean design.',
  },
  {
    id: 'backend',
    icon: 'server',
    title: 'Backend APIs',
    text: 'REST APIs, authentication, database integration and the application logic behind them.',
  },
]