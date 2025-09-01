export interface Project {
  title: string
  description: string
  image: string
  production: string
}

export const projects: Project[] = [
  {
    title: 'Chatty',
    description:
      'Support that grows with your business: Live chat, AI chatbot, Messenger chat, FAQs and help center.',
    image: '/images/chatty.webp',
    production: 'https://apps.shopify.com/chatty',
  },
  {
    title: 'Field Guide',
    description:
      'The Fieldguide AI Platform for Advisory & Audit Firms saves time, increases margins, and improves client satisfaction.',
    image: '/images/fieldguide.jpg',
    production: 'https://www.fieldguide.io',
  },
  {
    title: 'Luci',
    description: 'Smart City Management Website, Resident Management.',
    image: '/images/luci.webp',
    production: 'https://luci.vn',
  },
]
