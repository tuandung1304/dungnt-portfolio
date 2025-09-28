import { BedrockAgentRuntimeClient } from '@aws-sdk/client-bedrock-agent-runtime'

export const runtimeClient = new BedrockAgentRuntimeClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})
