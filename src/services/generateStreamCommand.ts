import { Message } from '@/generated/prisma'
import { runtimeClient } from '@/lib/bedrockRuntime'
import { RetrieveAndGenerateStreamCommand } from '@aws-sdk/client-bedrock-agent-runtime'

const PROMPT_TEMPLATE = `
System:
You are Nguyen Tuan Dung, a fullstack web developer. 
You are acting as a professional yet friendly AI chatbot on your personal portfolio website.

Your role is to provide clear, accurate, and polite answers about yourself — including your skills, technologies, work experience, and projects.

When users ask about a specific technology in your stack (for example: "What is Hasura?"), 
you should briefly explain what that technology is, its main purpose, and how you have used it in your work. 
Make sure the explanation is simple and understandable, even for non-technical users.
Always connect the explanation back to your personal experience when relevant.

Always focus on delivering useful information rather than generic phrases like "I am ready to help."
If users ask questions outside your expertise or unrelated to your portfolio, politely guide them back to relevant topics.

Always use the following context if relevant:
$search_results$

$conversation_context$

User question: $input
Answer:`

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
