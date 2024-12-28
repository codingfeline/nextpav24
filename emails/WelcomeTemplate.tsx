import { Body, Html, Preview, Text } from '@react-email/components'
import { FaMap } from 'react-icons/fa'
import { GiPhone } from 'react-icons/gi'

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
        <br />
        <Text>Bangkok Pavilion</Text>
        <Text>
          <a href="tel:+441304 367 707" style={link}>
            <GiPhone size="25px" />
            &nbsp; 01304 367 707
          </a>
          <br />
          <a
            href="https://www.google.com/maps/dir//114+High+St,+Deal+CT14+6BB/@51.2259105,1.3203355,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47deaecf9d8d9bd3:0x293208f81cdee617!2m2!1d1.4027551!2d51.2259394?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
            style={link}
          >
            <FaMap size="25px" />
            &nbsp; 114 High Street, Deal, Kent CT14 6BB
          </a>
        </Text>
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
  fontSize: '13px',
  color: '#333',
  fontFamily: 'Verdana',
  paddingLeft: '10px',
  // border: '1px solid #999',
}
const link = {
  textDecoration: 'none',
}

export default WelcomeTemplate
