import { Body, Html, Preview, Text } from '@react-email/components'

interface Prop {
  message: string
}

const WelcomeTemplate = ({ message }: Prop) => {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Body>
        {/* <Container> */}
        <Text>{message}</Text>
        <p>
          --------------------------------------------
          <br />
          <em>enquiry from bangkokpavilion.co.uk</em>
          <br />
          --------------------------------------------
        </p>
        {/* </Container> */}
      </Body>
    </Html>
  )
}

// const styles = {

// }

export default WelcomeTemplate
