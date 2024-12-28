import { Body, Html, Preview, Text } from '@react-email/components'

interface Prop {
  message: string
  name: string
}

const WelcomeTemplate = ({ message, name }: Prop) => {
  return (
    <Html>
      <Preview>Enquiry from bangkokpavilion.co.uk</Preview>
      <Body style={style}>
        {/* <Container> */}
        <Text>Dear {name},</Text>
        <Text>We have received your enquiry.</Text>
        <Text>Thank you.</Text>
        <hr />
        <p></p>
        <Text>{message}</Text>
        <hr />
        {/* </Container> */}
      </Body>
    </Html>
  )
}

const style = {
  color: '#333',
  fontFamily: 'Verdana',
  paddingLeft: '10px',
  // border: '1px solid #999',
}

export default WelcomeTemplate
