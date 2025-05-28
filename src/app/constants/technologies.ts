import { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa6'
import { RiReactjsLine } from 'react-icons/ri'
import {
  SiApollographql,
  SiAuth0,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGraphql,
  SiHasura,
  SiJest,
  SiMui,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiShopify,
  SiStorybook,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'

type Technologies = {
  name: string
  color: string
  Icon: IconType
  url?: string
}

export const technologies: Technologies[] = [
  {
    name: 'Typescript',
    Icon: SiTypescript,
    color: '#3178C6',
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'React',
    Icon: RiReactjsLine,
    color: '#61dafb',
    url: 'https://react.dev',
  },
  {
    name: 'Nextjs',
    Icon: TbBrandNextjs,
    color: '#ffffff',
    url: 'https://nextjs.org',
  },
  {
    name: 'Material UI',
    Icon: SiMui,
    color: '#0073e6',
    url: 'https://mui.com',
  },
  {
    name: 'Tailwind',
    Icon: SiTailwindcss,
    color: '#38BDF8',
    url: 'https://tailwindcss.com',
  },
  {
    name: 'Storybook',
    Icon: SiStorybook,
    color: '#ff4785',
    url: 'https://storybook.js.org',
  },
  {
    name: 'Nestjs',
    Icon: SiNestjs,
    color: '#E0234E',
    url: 'https://nestjs.com',
  },
  {
    name: 'Express',
    Icon: SiExpress,
    color: '#ffffff',
    url: 'https://expressjs.com',
  },
  {
    name: 'Hasura',
    Icon: SiHasura,
    color: '#3970fd',
    url: 'https://hasura.io',
  },
  {
    name: 'Apollo',
    Icon: SiApollographql,
    color: '#311C87',
    url: 'https://www.apollographql.com',
  },
  {
    name: 'Graphql',
    Icon: SiGraphql,
    color: '#E10098',
    url: 'https://graphql.org',
  },
  {
    name: 'Shopify',
    Icon: SiShopify,
    color: '#95bf47',
    url: 'https://www.shopify.com',
  },
  {
    name: 'Firebase',
    Icon: SiFirebase,
    color: '#ff9100',
    url: 'https://firebase.google.com',
  },
  {
    name: 'Amazon Web Services',
    Icon: FaAws,
    color: '#4479A1',
    url: 'https://aws.amazon.com',
  },
  {
    name: 'PostgreSQL',
    Icon: SiPostgresql,
    color: '#336791',
    url: 'https://www.postgresql.org',
  },
  {
    name: 'Redis',
    Icon: SiRedis,
    color: '#ff4539',
    url: 'https://redis.io',
  },
  { name: 'Auth0', Icon: SiAuth0, color: '#EC592B', url: 'https://auth0.com' },
  {
    name: 'Prisma ORM',
    Icon: SiPrisma,
    color: '#143a51',
    url: 'https://www.prisma.io',
  },
  {
    name: 'Docker',
    Icon: SiDocker,
    color: '#2496ED',
    url: 'https://www.docker.com/',
  },
  { name: 'Jest', Icon: SiJest, color: '#C13B29', url: 'https://jestjs.io' },
]
