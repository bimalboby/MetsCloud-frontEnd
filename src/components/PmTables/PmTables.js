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

import React, { useEffect, useState } from "react";

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

function PmTables() {
  const [pms, setPms] = useState([]);
  const [svs, setSvs] = useState([]);
  const [cudesign, setCudesign] = useState("pm");
  const [cupm, setCupm] = useState("")
  const [cusv, setCusv] = useState("")
  const [isdevice, setIsdevice] = useState(false)

  useEffect(() => {
    console.log(cudesign);
    const getsvs = async () => {
      const res = await Axios.post(`/iiot-view-superVisor`);
      setSvs(res.data);
    };
    const getpms = async () => {
      const res = await Axios.post("/iiot-view-projectManagers");
      setPms(res.data);
    };
    if(cudesign=="pm"){
      getpms();
    }else{
      getsvs();
    }
  }, [cudesign]);

 console.log(svs,pms);
  const userdesignnation = {
    bo:"Business Owner",
    pm:"Project Manager",
    sv:"Supervisor"
}

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Authors Table */}
      {
        isdevice?(
          <SvCharts />
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
                      pmid={row.id}
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
                      svid={row.id}
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
      
    </Flex>
  );
}

export default PmTables;
