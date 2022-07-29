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
import medusa from "assets/img/cardimgfree.png";

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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spacer,
  Button,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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
import SvCharts from "./SvCharts";
import { usercontext } from "Hooks/Authcontext/Authcontext";
import { GlobeIcon } from "components/Icons/Icons";
import IconBox from "components/Icons/IconBox";
import { BsArrowRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";

function PmTables() {
  let loc = useHistory()
  const [pms, setPms] = useState([]);
  const {userid,userdetails} = useContext(usercontext)
  const [svs, setSvs] = useState([]);
  const [cudesign, setCudesign] = useState("pm");
  const [cupm, setCupm] = useState("")
  const [cusv, setCusv] = useState("")
  const [isdevice, setIsdevice] = useState(false)

  useEffect(() => {
    console.log(cudesign);
    
    const getsvs = async () => {
      console.log(cupm);
      const res = await Axios.post(`/iiot-view-superVisor?userid=${cupm}&designation=projectManager`);
      setSvs(res.data);

    };
    const getpms = async () => {
      const res = await Axios.post(`/iiot-view-projectManagers?userid=${userid}`);
      setPms(res.data);
    };
    if(cudesign=="pm"){
      getpms();
    }else{
      getsvs();
    }
  }, [cudesign]);

console.log(cupm);
 console.log(svs,pms);
  const userdesignnation = {
    bo:"Business Owner",
    pm:"Project Manager",
    sv:"Supervisor"
}

const userdesignnation2 = {
  bo:"businessOwner",
  pm:"projectManager",
  sv:"supervisor"
}

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Authors Table */}
      {
        isdevice?(
          <SvCharts id={cusv} designation={'supervisor'} />
        ):(
          <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            {userdesignnation[cudesign]}
          </Text>
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
                  Author
                </Th>
                {/* <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Function
                </Th> */}
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Status
                </Th>
                {/* <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Employed
                </Th> */}
                <Th borderBottomColor="#56577A"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {cudesign=='sv'?(
                svs.map((row, index, arr) =>(
                    <TablesTableRow
                      name={row.name}
                      logo={row.img}
                      email={row.email}
                      status={row.status}
                      svid={row.id}
                      lastItem={index === arr.length - 1 ? true : false}
                      setCupm={setCupm}
                      cudesign={cudesign}
                      setCusv={setCusv}
                      setCudesign={setCudesign}
                      setIsdevice={setIsdevice}
                    />
                  ))
              ):(
                pms.map((row, index, arr) => (
                    <TablesTableRow
                      name={row.name}
                      logo={row.img}
                      email={row.email}
                      status={row.status}
                      pmid={row.id}
                      lastItem={index === arr.length - 1 ? true : false}
                      setCusv={setCusv}
                      setCupm={setCupm}
                      cudesign={cudesign}
                      setCudesign={setCudesign}
                    />
                  ))
              )
              }
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      
        )
      }
{/* <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", "2xl": "2fr 1.2fr 1.5fr" }}
        my='26px'
        gap='18px'>
        {/* Welcome Card 
        <Card
          p='0px'
          gridArea={{ md: "1 / 1 / 2 / 3", "2xl": "auto" }}
          bgImage={medusa}
          bgSize='cover'
          bgPosition='50%'>
          <CardBody w='100%' h='100%'>
            <Flex flexDirection={{ sm: "column", lg: "row" }} w='100%' h='100%'>
              <Flex
                flexDirection='column'
                h='100%'
                p='22px'
                minW='60%'
                lineHeight='1.6'>
                <Text fontSize='sm' color='gray.400' fontWeight='bold'>
                  Project Manager's Devices
                </Text>
                <Text fontSize='28px' color='#fff' fontWeight='bold' mb='18px'>
                </Text>
                <Text
                  fontSize='md'
                  color='gray.400'
                  fontWeight='normal'
                  mb='auto'>
                   <br />
                </Text>
                <Spacer />
                <Flex align='center'>
                  <Button
                    p='0px'
                    variant='no-hover'
                    bg='transparent'
                    onClick={()=>loc.push("admin/devices")}
                    my={{ sm: "1.5rem", lg: "0px" }}>
                    <Text
                      fontSize='sm'
                      color='#fff'
                      fontWeight='bold'
                      cursor='pointer'
                      transition='all .3s ease'
                      my={{ sm: "1.5rem", lg: "0px" }}
                      _hover={{ me: "4px" }}>
                      Tab to see
                    </Text>
                    <Icon
                      as={BsArrowRight}
                      w='20px'
                      h='20px'
                      color='#fff'
                      fontSize='2xl'
                      transition='all .3s ease'
                      mx='.3rem'
                      cursor='pointer'
                      pt='4px'
                      _hover={{ transform: "translateX(20%)" }}
                    />
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
       
      </Grid> */}
    </Flex>
    
  );
}

export default PmTables;
