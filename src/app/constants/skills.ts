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
    name: 'Frontend Development',
    items: [
      { name: 'React', proficiency: 90 },
      { name: 'Next.js', proficiency: 70 },
      { name: 'TypeScript', proficiency: 90 },
      { name: 'Tailwind CSS', proficiency: 90 },
    ],
  },
  {
    name: 'Backend Development',
    items: [
      { name: 'Express', proficiency: 90 },
      { name: 'Nestjs', proficiency: 70 },
      { name: 'GraphQL', proficiency: 80 },
      { name: 'ORM', proficiency: 80 },
    ],
  },
  {
    name: 'Other Skills',
    items: [
      { name: 'Git', proficiency: 80 },
      { name: 'Docker', proficiency: 70 },
      { name: 'AWS', proficiency: 60 },
      { name: 'CI/CD', proficiency: 60 },
    ],
  },
]
