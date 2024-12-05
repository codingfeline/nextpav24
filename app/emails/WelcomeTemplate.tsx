import { Body, Container, Html, Preview, Text } from '@react-email/components'

interface Prop {
  name: string
  message: string
}

const WelcomeTemplate = ({ name, message }: Prop) => {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Body>
        <Container>
          <Text>Hello {name}</Text>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeTemplate
