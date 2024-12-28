import { Body, Container, Html, Preview, Text } from '@react-email/components'

interface Prop {
  message: string
  name: string
}

const WelcomeTemplate = ({ message, name }: Prop) => {
  return (
    <Html>
      <Preview>Enquiry from bangkokpavilion.co.uk</Preview>
      <Body style={style}>
        <Container>
          <Text>Dear {name},</Text>
          <Text>We have received your enquiry.</Text>
          <hr />
          <Text>{message}</Text>
          {/* <hr />
          <p>
            <em>enquiry from bangkokpavilion.co.uk</em> */}
          {/* </p> */}
          <hr />
        </Container>
      </Body>
    </Html>
  )
}

const style = {
  color: '#333',
  fontFamily: 'Verdana',
}

export default WelcomeTemplate
