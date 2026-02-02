import portfolio from '../assets/portfolio.png';
import track from '../assets/track.png';

export type Project = {
  id: string
  title: string
  excerpt: string
  description: string
  cover: string
  demoUrl?: string
  repoUrl?: string
  tech: string[]
  stats?: { label: string; value: string }[]
  features?: string[]
}

export const projects: Project[] = [
  {
    id: 'track-your-health',
    title: 'Track Your Health',
    excerpt: 'Full-stack exercise-logging app with role-based auth for trainers and trainees.',
    description:
      'Built a full-stack exercise-logging application with a Spring Boot backend and a React front end. Implements role-based authentication (trainers & trainees), secure session management, PostgreSQL relational modeling, RESTful CRUD endpoints, and a dynamic dashboard with charts and tables to visualize exercise progress.',
    cover: track,
    demoUrl: 'https://track-your-health-react.vercel.app',
    repoUrl: 'https://github.com/Funtasti',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Spring Boot', 'Java', 'PostgreSQL', 'JWT'],
    stats: [
      { label: 'Total Technology', value: '7' },
      { label: 'Features', value: '6' },
    ],
    features: [
      'Full-stack exercise logging (React + Spring Boot)',
      'Role-based authentication: Trainer & Trainee',
      'Secure login and session management (JWT)',
      'PostgreSQL relational data modeling',
      'RESTful CRUD endpoints for tasks and users',
      'Dynamic dashboard with charts and tables for progress visualization'
    ],
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    excerpt:
      'Modern responsive portfolio built with React, TypeScript, Vite, and Tailwind — polished with Framer Motion.',
    description:
      'Personal portfolio for Sumit Kumar Naik showcasing projects, certifications, and technical skills. Built with React + TypeScript on Vite, styled with Tailwind CSS, and animated using Framer Motion. Includes a responsive layout, dark theme, smooth section navigation, an accessible contact form, custom hooks for scroll-based interactions, and a tech-stack gallery for quick skill visibility.',
    cover: portfolio,
    demoUrl: '#',
    repoUrl: 'https://github.com/Funtasti/my-portfolio',
    tech: ['React','TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    stats: [
      { label: 'Total Technology', value: '6' },
      { label: 'Features', value: '8' },
    ],
    features: [
      'Responsive design that looks great on all devices',
      'Animated UI with Framer Motion (includes custom hooks for scroll-based behavior)',
      'Projects, certificates & tech-stack showcase',
      'Accessible, animated contact form',
      'Smooth section navigation with active highlighting',
      'Dark theme with clean, modern aesthetic'
    ],
  },
  {
    id: 'Example',
    title: 'Example',
    excerpt:
      'Example example example, example, example example example.',
    description:
      'Example example example example example, example, example example example example. Example example example example.',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
    demoUrl: 'https://github.com/Funtasti',
    repoUrl: 'https://github.com/Funtasti',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    stats: [
      { label: 'Total Technology', value: '3' },
      { label: 'Features', value: '3' },
    ],
    features: ['Example', 'Example', 'Example'],
  },
]

export const certificates: { title: string; image: string }[] = [
  { title: 'Front-End (Sample)', image: '' },
  { title: 'React (Sample)', image: '' },
  { title: 'Web (Sample)', image: '' },
  { title: 'UI (Sample)', image: '' },
]

export const techStack: { name: string; icon: string }[] = [
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
]