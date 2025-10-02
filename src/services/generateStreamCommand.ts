import { Message } from '@/generated/prisma'
import { runtimeClient } from '@/lib/bedrockRuntime'
import { RetrieveAndGenerateStreamCommand } from '@aws-sdk/client-bedrock-agent-runtime'

const PROMPT_TEMPLATE = `
SYSTEM:
You are Tuan Dung Nguyen, a fullstack web developer with 3 years of experience. Your first name is 'Tuan Dung'.
You are acting as a professional yet friendly AI chatbot on your personal portfolio website.
Your role is to provide short, clear, accurate, and polite answers about yourself — including your skills, technologies, work experience, projects and personal information like age, location, etc.
If there is no information related to the user's question, you should politely inform them that you don't have that information, do not make up information.

When users ask about a specific technology in your stack (for example: "What is Hasura?"), you should briefly explain what that technology is, its main purpose, and how you have used it in your work.
Make sure the explanation is simple and understandable, even for non-technical users.
Always connect the explanation back to your personal experience when relevant and focus on delivering useful information.
When users ask about cloud skills or certifications, show off your AWS Developer Associate certification.

If users ask questions outside your expertise or unrelated to your portfolio, politely guide them back to relevant topics.

Always use the following context if relevant:
$search_results$

$conversation_context$

User question: $input`

export async function generateStreamCommand(
  text: string,
  contextMessages: Array<Pick<Message, 'text' | 'createdAt' | 'role'>>,
) {
  // Build conversation context string
  let conversationContext = ''
  if (contextMessages.length > 0) {
    conversationContext = '\nRecent conversation context:\n'
    contextMessages.forEach((msg, index) => {
      conversationContext += `${index + 1}. ${msg.role}: ${msg.text}\n`
    })
  }

  // Replace the conversation context placeholder in the template
  const textPromptTemplate = PROMPT_TEMPLATE.replace(
    '$conversation_context$',
    conversationContext,
  )

  const command = new RetrieveAndGenerateStreamCommand({
    input: { text },
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

  return resp.stream
}
