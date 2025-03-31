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
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    description:
      'Demonstrated expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
    date: 'December 2022',
    link: 'https://aws.amazon.com/certification/',
    icon: '🏆',
  },
  {
    title: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    description:
      'Proven ability to build, test, and deploy applications, integrate Google Cloud services, and manage application environments.',
    date: 'October 2022',
    link: 'https://cloud.google.com/certification/',
    icon: '☁️',
  },
  {
    title: 'Best Project Award',
    issuer: 'Tech Conference 2022',
    description:
      'Awarded for developing an innovative solution that addresses real-world problems using cutting-edge technologies.',
    date: 'September 2022',
    icon: '🎯',
  },
  {
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB',
    description:
      'Validated expertise in building and maintaining applications using MongoDB.',
    date: 'August 2022',
    link: 'https://www.mongodb.com/certification',
    icon: '📊',
  },
]
