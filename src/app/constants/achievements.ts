export interface Achievement {
  title: string
  issuer: string
  description: string
  date: string
  link: string
  image: string
}

export const achievements: Achievement[] = [
  {
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    description:
      'Demonstrated proficiency in building cloud-native applications using AWS service APIs, CLI, and SDKs. Experienced in containerization and deploying through CI/CD pipelines. Capable of developing, deploying, and debugging applications aligned with AWS best practices.',
    date: 'August 2025',
    link: 'https://www.credly.com/badges/7c557d54-9212-4c5f-adb3-200dfb35096a/',
    image: '/images/dva-c02-badge.png',
  },
  {
    title: 'Graph Developer - Associate',
    issuer: 'Apollo GraphQL',
    description:
      'Possessed a solid foundational knowledge of GraphQL to design schema, run Apollo Server, and perform queries with Apollo Client.',
    date: 'May 2025',
    link: 'https://www.apollographql.com/tutorials/certifications/138640fb-c59d-46fc-bc22-e31b284358ee/',
    image: '/images/apollo-badge.svg',
  },
]
