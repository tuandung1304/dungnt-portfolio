export interface Skill {
  name: string
  proficiency: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90
}

export interface SkillCategory {
  name: string
  items: Skill[]
}

export const getLevel = (proficiency: Skill['proficiency']) => {
  if (proficiency >= 80) return 'Advanced'
  if (proficiency >= 50) return 'Intermediate'
  return 'Beginner'
}

export const skills: SkillCategory[] = [
  {
    name: 'Frontend',
    items: [
      {
        name: 'React (hooks, context, memoization, code splitting, i18n)',
        proficiency: 90,
      },
      { name: 'Next.js (SSR, SSG, ISR, App Router)', proficiency: 80 },
      {
        name: 'UI Libraries (Material UI, Shadcn, Ant Design)',
        proficiency: 90,
      },
      { name: 'Tailwind CSS, Framer Motion', proficiency: 90 },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'REST & GraphQL (NestJS, Express, Hasura)', proficiency: 80 },
      {
        name: 'Auth & Security (JWT, OAuth2, OIDC, RBAC, Rate limiting)',
        proficiency: 80,
      },
      {
        name: 'Event-driven (Redis, SQS, SNS, Pub/Sub, Cloud Tasks)',
        proficiency: 80,
      },
      {
        name: 'Chatbot & Agent (RAG, pgVector, Weaviate, LangChain, LangGraph, Bedrock)',
        proficiency: 80,
      },
    ],
  },
  {
    name: 'Databases & Search',
    items: [
      { name: 'PostgreSQL', proficiency: 80 },
      { name: 'Firestore, BigQuery', proficiency: 80 },
      { name: 'Redis, Meilisearch', proficiency: 80 },
      { name: 'Prisma, TypeORM', proficiency: 80 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    items: [
      {
        name: 'AWS (EC2, ECS, S3, CloudFront, Lambda, Bedrock)',
        proficiency: 80,
      },
      { name: 'GCP (Functions, Cloud Run, Cloud Tasks)', proficiency: 80 },
      { name: 'Auto Scaling & Load Balancer', proficiency: 70 },
      { name: 'CI/CD (GitHub Actions, GitLab CI)', proficiency: 80 },
    ],
  },
]
