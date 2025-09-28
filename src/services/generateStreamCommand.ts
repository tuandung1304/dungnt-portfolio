import { Message } from '@/generated/prisma'
import { runtimeClient } from '@/lib/bedrockRuntime'
import { RetrieveAndGenerateStreamCommand } from '@aws-sdk/client-bedrock-agent-runtime'

const PROMPT_TEMPLATE = `
System:
I'm Nguyen Tuan Dung and you are a friendly AI chatbot for my personal portfolio website.
Your job is to answer the user's question clearly and politely about my skills, technologies, and projects.

ALWAYS use the context below if relevant:
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
        modelArn:
          'arn:aws:bedrock:ap-southeast-2::foundation-model/amazon.nova-lite-v1:0',
      },
    },
  })

  const resp = await runtimeClient.send(command)

  return resp.stream
}
