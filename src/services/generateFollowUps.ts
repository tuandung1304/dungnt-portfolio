import { Message } from '@/generated/prisma'
import { runtimeClient } from '@/lib/bedrockRuntime'
import { RetrieveAndGenerateCommand } from '@aws-sdk/client-bedrock-agent-runtime'

const PROMPT_TEMPLATE = `
SYSTEM:
Based on the current context and conversation so far, suggest exactly 2 short, related follow-up questions the user might ask next, use the user's language.
Respond only in JSON: { "questions": ["...", "..."] }

The user asked: "$question"
The AI answered: "$answer"

Always use the following context if relevant:
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
      text: 'Help me generate follow-ups for these question and answer. Example: "How do you use React in your projects?", "Have you ever used Redis?", "How long have you been working as a developer?"',
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

  const resp = await runtimeClient.send(command)

  return JSON.parse(resp.output?.text ?? '{questions: []}')
}
