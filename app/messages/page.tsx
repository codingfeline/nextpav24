import prisma from '@/prisma/client'
import { Card } from '@radix-ui/themes'
import ReactMarkDown from 'react-markdown'

const Message = async () => {
  const messages = await prisma.contact.findMany()

  return (
    <>
      <div>Message</div>
      {messages.map(m => {
        return (
          <div key={m.id}>
            <Card className="prose messages">
              <ReactMarkDown>{m.message}</ReactMarkDown>
            </Card>
          </div>
        )
      })}
    </>
  )
}

export default Message
