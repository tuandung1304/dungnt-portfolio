export interface Skill {
  name: string
  level: string
  proficiency: number
}

export interface SkillCategory {
  name: string
  items: Skill[]
}

export const skills: SkillCategory[] = [
  {
    name: 'Frontend Development',
    items: [
      { name: 'React', level: 'Advanced', proficiency: 90 },
      { name: 'Next.js', level: 'Advanced', proficiency: 75 },
      { name: 'TypeScript', level: 'Intermediate', proficiency: 90 },
      { name: 'Tailwind CSS', level: 'Advanced', proficiency: 90 },
    ],
  },
  {
    name: 'Backend Development',
    items: [
      { name: 'Node.js', level: 'Advanced', proficiency: 90 },
      { name: 'Nestjs', level: 'Advanced', proficiency: 85 },
      { name: 'Firebase', level: 'Intermediate', proficiency: 80 },
      { name: 'PostgreSQL', level: 'Intermediate', proficiency: 70 },
    ],
  },
  {
    name: 'Other Skills',
    items: [
      { name: 'Git', level: 'Advanced', proficiency: 85 },
      { name: 'Docker', level: 'Intermediate', proficiency: 65 },
      { name: 'AWS', level: 'Intermediate', proficiency: 50 },
      { name: 'CI/CD', level: 'Intermediate', proficiency: 60 },
    ],
  },
]
