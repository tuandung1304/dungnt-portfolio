import { Message } from '@/generated/prisma'
import { runtimeClient } from '@/lib/bedrockRuntime'
import { RetrieveAndGenerateCommand } from '@aws-sdk/client-bedrock-agent-runtime'

const PROMPT_TEMPLATE = `
SYSTEM:
Suggest exactly 2 short follow-up questions a visitor is likely to ask next about Tuan Dung Nguyen's portfolio, given the conversation below. Topics must stay on: skills, projects, work experience, education, certifications, technologies, or contact.

Rules:
- Respond with valid JSON only, no prose: {"questions": ["...", "..."]}.
- Reply in the SAME language as the user's last question (Vietnamese stays Vietnamese, English stays English).
- Each question must be under 12 words and end with "?".
- Do not repeat what the assistant just answered.
- Do not invent topics that are not in the retrieved context.
- If the user said goodbye / thanks / wants to end the conversation, return {"questions": []}.

User's last question: "$question"
Assistant's answer: "$answer"

Use the following context if relevant:
$search_results$`

export async function generateFollowUps({
  question,
  answer,
}: {
  question: Message
  answer: Message
}): Promise<{ questions: string[] }> {
  const textPromptTemplate = PROMPT_TEMPLATE.replace(
    '$question',
    question.text,
  ).replace('$answer', answer.text)

  const command = new RetrieveAndGenerateCommand({
    input: {
      text: 'Help me generate follow-ups for these question and answer.',
    },
    retrieveAndGenerateConfiguration: {
      type: 'KNOWLEDGE_BASE',
      knowledgeBaseConfiguration: {
        generationConfiguration: {
          promptTemplate: {
            textPromptTemplate,
          },
        },
        knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID!,
        modelArn: process.env.MODEL_ARN!,
      },
    },
  })

  try {
    const resp = await runtimeClient.send(command)
    const parsed = JSON.parse(resp.output?.text ?? '{"questions": []}')
    if (!Array.isArray(parsed.questions)) return { questions: [] }
    return {
      questions: parsed.questions
        .filter((q: unknown): q is string => typeof q === 'string')
        .slice(0, 2),
    }
  } catch (error) {
    console.error('Error parsing follow-ups:', error)
    return { questions: [] }
  }
}
