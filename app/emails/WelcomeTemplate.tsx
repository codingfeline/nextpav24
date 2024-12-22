import { Body, Container, Html, Preview, Text } from '@react-email/components'

interface Prop {
  message: string
}

const WelcomeTemplate = ({ message }: Prop) => {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Body>
        <Container>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeTemplate
