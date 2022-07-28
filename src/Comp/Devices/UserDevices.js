import { Flex } from '@chakra-ui/react'
import SvCharts from 'components/PmTables/SvCharts'
import React from 'react'

const UserDevices = () => {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
    <SvCharts />

    </Flex>
  )
}

export default UserDevices