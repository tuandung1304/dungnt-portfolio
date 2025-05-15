export interface Achievement {
  title: string
  issuer: string
  description: string
  date?: string
  link?: string
  icon?: string
}

export const achievements: Achievement[] = [
  {
    title: 'Graph Developer - Associate',
    issuer: 'Apollo GraphQL',
    description:
      'Possessed a solid foundational knowledge of GraphQL to design schema, run Apollo Server, and perform queries with Apollo Client.',
    date: 'Issued on May 2025',
    link: 'https://www.apollographql.com/tutorials/certifications/138640fb-c59d-46fc-bc22-e31b284358ee/',
    icon: '🏆',
  },
  // Coming soon ☁️☁️☁️
  // {
  //   title: 'AWS Certified Developer',
  //   issuer: 'Amazon Web Services',
  //   description:
  //     'Demonstrated expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
  //   date: 'August 2025',
  //   link: 'https://aws.amazon.com/certification/',
  //   icon: '☁️',
  // },
]
