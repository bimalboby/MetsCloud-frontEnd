/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormLabel,
  Select,
} from '@chakra-ui/react'
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Icon,
  Text,
  Th,
  Thead,
  Tr,
  Grid,
  Box,
} from "@chakra-ui/react";

// Custom components

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";

// Data
import { tablesProjectData, tablesTableData } from "variables/general";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";
import Axios from "Config/Axios/Axios";
import LineChart from "components/Charts/LineChart";
import { lineChartDataDashboard } from "variables/charts";
import { lineChartOptionsDashboard } from "variables/charts";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import SvCharts from "components/PmTables/SvCharts";
import { usercontext } from "Hooks/Authcontext/Authcontext";
import SensorTableRow from "./SensorTableRow";
import GradientBorder from "components/GradientBorder/GradientBorder";

function SensorTable() {
  const titleColor = "white";
  const {userid,designation} = useContext(usercontext)
  const [isdevice, setIsdevice] = useState(false)
  const [sensors, setSensors] = useState([]) 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedSensor, setSelectedSensor] = useState("")
  const [selectedDevice, setSelectedDevice] = useState("")
  const [devices, setDevices] = useState([])

  const userdesignnation = {
    bo:"businessOwner",
    pm:"projectManager",
    sv:"supervisor"
}

useEffect(async() => {
  const res = await Axios.post(`/get-devices?userid=${userid}&designation=${designation}`);
  console.log(res);
  let arr = []
      for (let i = 0; i < res.data.ids.length; i++) {
          arr.push({
              id: res.data.ids[i],
              name: res.data.name[i]
          })
      }
  setDevices(arr);
}, []);

  useEffect(async() => {
    if(selectedDevice){
      const res = await Axios.post(`/get-sensors?userid=${userid}&designation=${designation}&deviceid=${selectedDevice}`);
    console.log(res);
    let arr = []
        for (let i = 0; i < res.data.ids.length; i++) {
            arr.push({
                id: res.data.ids[i],
                name: res.data.name[i]
            })
        }
    setSensors(arr);
    }
  }, [selectedDevice]);

  const deleteSensor = async() => {
    const res = await Axios.post(`/delete-sensor?userid=${userid}&designation=${designation}&deviceid=${selectedDevice}&sensorid=${selectedSensor}`);
    onClose()
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Authors Table */}
      {
        isdevice?(
          <SvCharts id={cusv} designation='supervisor' />
        ):(
          <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" >
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Sensor
          </Text>
          <Flex flexDirection='column' pt={{ base: "12px", md: "75px" }}>
          <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'>
                        Device
                    </FormLabel>
                    <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: "100%", lg: "fit-content" }}
                        borderRadius='20px'>
                            <Select
                                    color={titleColor}
                                    bg={{
                                        base: "rgb(19,21,54)",
                                    }}
                                    value={selectedDevice}
                                    onChange={(e) => setSelectedDevice( e.target.value)}
                                    placeholder='Select option'
                                    border='transparent'
                                    borderRadius='20px'
                                    fontSize='sm'
                                    size='lg'
                                    w={{ base: "100%", md: "346px" }}
                                    maxW='100%'
                                    h='46px'>
                                    {
                                        devices?.map((device) => (
                                            <option value={device.id}>{device.name}</option>
                                        ))
                                    }
                                </Select>

                    </GradientBorder>
          </Flex>
          
        </CardHeader>
        <CardBody>
          <Table variant="simple" color="#fff">
            <Thead>
              <Tr my=".8rem" ps="0px" color="gray.400">
                <Th
                  ps="0px"
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                 Name
                </Th>


                <Th borderBottomColor="#56577A"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
              sensors.map((sensor, index, arr) =>(
                <SensorTableRow
                sensor={sensor}
                  onOpen={onOpen}
                  setSelectedSensor={setSelectedSensor}
                  lastItem={index === arr.length - 1 ? true : false}
                />
              ))
}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
        )
      }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Do you want to delete sensor?

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button onClick={()=>deleteSensor()} variant='ghost'>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default SensorTable;
