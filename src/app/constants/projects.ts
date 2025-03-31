export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
}

export const projects: Project[] = [
  {
    title: 'Chatty',
    description:
      'Support that grows with your business: Live chat, AI chatbot, Messenger chat, FAQs and help center.',
    image: '/images/chatty.webp',
    technologies: [
      'React',
      'Node.js',
      'Firebase',
      'AI assistant',
      'Google cloud',
    ],
  },
  {
    title: 'Field Guide',
    description:
      'The Fieldguide AI Platform for Advisory & Audit Firms saves time, increases margins, and improves client satisfaction.',
    image: '/images/fieldguide.jpg',
    technologies: [
      'Next.js',
      'Hasura',
      'Material-UI',
      'Docker',
      'Typescript',
      'Jest',
      'Storybook',
    ],
  },
  {
    title: 'Luci',
    description: 'Smart City Management Website, Resident Management.',
    image: '/images/luci.webp',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'zustand',
      'react-query',
    ],
  },
]
