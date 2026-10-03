export const projects = [
  {
    id: 'mern-ecommerce',
    number: '01',
    title: 'MERN E-Commerce Platform',
    kicker: 'Flagship full-stack project',
    summary:
      'A full-stack e-commerce application built with the MERN stack, featuring a customer-facing storefront, admin dashboard, authentication, product management, order management and online payment integration.',
    description:
      'The complete MERN stack in one application. A React storefront handles browsing and checkout, an Express and Node.js API exposes the business logic, and MongoDB stores products, users and orders. JWT-based authentication secures both the customer area and the admin panel, and SSLCommerz handles online payments.',
    purpose:
      'To build a production-shaped e-commerce system where the frontend, REST API, authentication layer, database and payment workflow all work together end to end.',
    role: 'Full-Stack Development',
    featured: true,
    visual: 'storefront',
    hue: 'emerald',
    technologies: [
      'MongoDB',
      'Express.js',
      'React',
      'Node.js',
      'JWT Authentication',
      'Admin Dashboard',
      'SSLCommerz',
      'Order Management',
    ],
    github: 'https://github.com/Fahmida12345/FAHMIDA-MERN-2308-FINAL',
    live: null,
    features: [
      'JWT-based authentication with protected private routes',
      'Customer-facing storefront with product browsing',
      'Admin panel with role-aware access',
      'Product management for catalogue items',
      'User management for registered accounts',
      'Order management covering the full order lifecycle',
      'SSLCommerz online payment integration',
      'Backend and frontend integrated through a REST API',
    ],
    highlights: [
      {
        title: 'Authentication layer',
        text: 'JWT tokens issued on login and verified by middleware on private and admin endpoints, so unauthorised requests never reach the handlers.',
      },
      {
        title: 'Admin vs customer separation',
        text: 'Role-aware routes keep catalogue, user and order management inside the admin dashboard while shoppers stay in the storefront.',
      },
      {
        title: 'Payments that close the loop',
        text: 'SSLCommerz integrates the checkout flow so an order created in the database is tied to a real online payment transaction.',
      },
      {
        title: 'One data model end to end',
        text: 'MongoDB schemas for products, users and orders drive both the REST API responses and the React views that render them.',
      },
    ],
  },
  {
    id: 'br-fashion',
    number: '02',
    title: 'BR Fashion',
    kicker: 'React storefront',
    summary:
      'A React-based e-commerce interface focused on presenting products through a modern frontend experience.',
    description:
      'A React storefront that treats product presentation as the main problem — layout, imagery and navigation are organised into reusable components so catalogue sections stay consistent across pages and screen sizes.',
    purpose:
      'To build a clean, reusable React storefront focused on how products are presented to the user.',
    role: 'Frontend Development',
    visual: 'catalog',
    hue: 'sky',
    technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/Fahmida12345/BRFashionReact',
    live: 'https://br-fashion-mart.netlify.app/',
    features: [
      'Component-based React interface',
      'Product presentation focused layout',
      'Responsive styling with CSS',
      'Deployed live on Netlify',
    ],
    highlights: [
      {
        title: 'Reusable components',
        text: 'Product cards, section headers and navigation are built as components rather than repeated markup.',
      },
      {
        title: 'Presentation first',
        text: 'Layout, spacing and imagery are tuned so the catalogue stays readable on desktop and mobile.',
      },
    ],
  },
  {
    id: 'ecommerce-website',
    number: '03',
    title: 'E-Commerce Website',
    kicker: 'Responsive web design',
    summary:
      'An e-commerce project demonstrating frontend development, product presentation and responsive web design.',
    description:
      'An e-commerce frontend exercise covering the core building blocks of a shop interface: a product catalogue, clear visual hierarchy and layouts that hold together from small phones up to wide desktops.',
    purpose:
      'To strengthen frontend fundamentals — structure, product presentation and responsive behaviour.',
    role: 'Frontend Development',
    visual: 'grid',
    hue: 'amber',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Fahmida12345/E-Commerce29-10-23',
    live: 'https://br-fashion-mart.netlify.app/',
    features: [
      'Product catalogue presentation',
      'Responsive web design',
      'JavaScript-driven interface behaviour',
      'Published online',
    ],
    highlights: [
      {
        title: 'Responsive by construction',
        text: 'Fluid grids and flexible media keep the catalogue usable from narrow mobile viewports upward.',
      },
      {
        title: 'Visual hierarchy',
        text: 'Type scale, spacing and contrast are used to guide the eye from product grid to call to action.',
      },
    ],
  },
  {
    id: 'blog-application',
    number: '04',
    title: 'Blog Application',
    kicker: 'Content application',
    summary:
      'A web application project demonstrating application structure and content-oriented functionality.',
    description:
      'A content-focused web application where the interesting work is structural — organising an interface around long-form content and keeping the components and data flow predictable as pages grow.',
    purpose:
      'To practise structuring a web application around content and keeping components cleanly separated.',
    role: 'Web Application Development',
    visual: 'article',
    hue: 'violet',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Fahmida12345/Blog-Application',
    live: null,
    features: [
      'Content-oriented application structure',
      'Reusable layout components',
      'Readable typography for long-form content',
    ],
    highlights: [
      {
        title: 'Structure over complexity',
        text: 'Components are split by responsibility so the layout, content and data layers stay easy to follow.',
      },
      {
        title: 'Content readability',
        text: 'Line length, spacing and type scale are set up for reading rather than for decoration.',
      },
    ],
  },
  {
    id: 'university-search',
    number: '05',
    title: 'University Search',
    kicker: 'JavaScript utility',
    summary:
      'A JavaScript-based project focused on searching and presenting university information.',
    description:
      'A focused JavaScript project that takes a list of university records and turns it into a usable search experience — matching a query, filtering results and presenting what is left clearly.',
    purpose:
      'To work through search and filtering logic in JavaScript and present structured data clearly.',
    role: 'JavaScript Development',
    visual: 'search',
    hue: 'cyan',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Fahmida12345/universityNameSerch',
    live: null,
    features: [
      'University information search',
      'Search result filtering',
      'Structured result presentation',
    ],
    highlights: [
      {
        title: 'Search logic',
        text: 'Query matching and filtering turn a raw dataset into a short, relevant result list.',
      },
      {
        title: 'Clear results',
        text: 'Each result is presented consistently so universities can be compared at a glance.',
      },
    ],
  },
]

export const flagshipProjectId = 'mern-ecommerce'

export const getProjectById = (id) => projects.find((project) => project.id === id)