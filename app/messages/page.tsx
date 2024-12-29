import prisma from '@/prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import ReactMarkDown from 'react-markdown'

const Message = async () => {
  const messages = await prisma.contact.findMany()

  return (
    <>
      <div>Message</div>
      {messages.map(m => {
        return (
          <div key={m.id}>
            <Card className="prose messages mb-2">
              <Flex
                justify="between"
                className="font-mono border border-b-2 border-gray-400 border-t-0 border-x-0"
              >
                <Text>
                  From {m.name} [{m.email}]
                </Text>
                <Text>{m.createdAt.toLocaleString()}</Text>
              </Flex>
              <ReactMarkDown className="font-['Verdana']">{m.message}</ReactMarkDown>
            </Card>
          </div>
        )
      })}
    </>
  )
}

export default Message
