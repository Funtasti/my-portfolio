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
    excerpt: 'Example example example example example example example example',
    description:
      'Example example example example example example example example example. Example example example',
    cover: track,
    demoUrl: '#',
    repoUrl: '#',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    stats: [
      { label: 'Total Technology', value: '9' },
      { label: 'Star', value: '12' },
    ],
    features: [
      'Example',
      'Example',
      'Example',
    ],
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    excerpt:
      'Example example example example example example example example example.',
    description:
      'Example example example example example example example example example example example. Example example example example example, example, example example example example. Example example example example example example example.',
    cover: portfolio,
    demoUrl: '#',
    repoUrl: '#',
    tech: ['React', 'Framer Motion', 'Vite'],
    stats: [
      { label: 'Total Technology', value: '9' },
      { label: 'Star', value: '17' },
    ],
    features: [
      'Example',
      'Example',
      'Example',
      'Example',
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
    demoUrl: '#',
    repoUrl: '#',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    stats: [
      { label: 'Total Technology', value: '7' },
      { label: 'Star', value: '9' },
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
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
  { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
]