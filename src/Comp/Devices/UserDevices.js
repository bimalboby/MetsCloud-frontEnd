import { Flex } from '@chakra-ui/react'
import SvCharts from 'components/PmTables/SvCharts'
import { usercontext } from 'Hooks/Authcontext/Authcontext'
import React, { useContext } from 'react'

const UserDevices = () => {
  const {userid,designation} = useContext(usercontext)
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <SvCharts id={userid} designation={designation} />
    </Flex>
  )
}

export default UserDevices