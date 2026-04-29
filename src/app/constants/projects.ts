export interface Project {
  title: string
  description: string
  image: string
  production: string
  technologies: string[]
}

export const projects: Project[] = [
  {
    title: 'Chatty',
    description:
      'Support that grows with your business: Live chat, AI chatbot, Messenger chat, FAQs and help center.',
    image: '/images/chatty.webp',
    production: 'https://apps.shopify.com/chatty',
    technologies: [
      'TypeScript',
      'React',
      'Firestore',
      'Firebase Functions',
      'Redis',
      'Meilisearch',
      'Weaviate',
      'OpenAI',
      'S3',
      'CloudFront',
    ],
  },
  {
    title: 'Field Guide',
    description:
      'The Fieldguide AI Platform for Advisory & Audit Firms saves time, increases margins, and improves client satisfaction.',
    image: '/images/fieldguide.jpg',
    production: 'https://www.fieldguide.io',
    technologies: [
      'TypeScript',
      'Next.js',
      'Hasura',
      'GraphQL',
      'PostgreSQL',
      'Codegen',
      'Jest',
      'Storybook',
      'Docker',
    ],
  },
  {
    title: 'Luci',
    description: 'Smart City Management Website, Resident Management.',
    image: '/images/luci.webp',
    production: 'https://luci.vn',
    technologies: [
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Ant Design',
      'Redux Toolkit',
      'React Query',
    ],
  },
]
