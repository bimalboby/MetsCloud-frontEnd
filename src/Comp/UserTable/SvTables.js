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

function SvTables() {
  const [cudesign, setCudesign] = useState("sv");
  const {userid,designation} = useContext(usercontext)
  const [cusv, setCusv] = useState("")
  const [isdevice, setIsdevice] = useState(false)
  const [svs, setSvs] = useState([])

  const userdesignnation = {
    bo:"businessOwner",
    pm:"projectManager",
    sv:"supervisor"
}

  useEffect(async() => {
    const res = await Axios.post(`/iiot-view-superVisor?userid=${userid}&designation=${designation}`);
      setSvs(res.data);
  }, []);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Authors Table */}
      {
        isdevice?(
          <SvCharts id={cusv} designation='supervisor' />
        ):(
          <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Supervisor
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
              {
              svs.map((row, index, arr) =>(
                <TablesTableRow
                  name={row.name}
                  logo={row.img}
                  email={row.email}
                  status={row.status}
                  pmid={row.id}
                  lastItem={index === arr.length - 1 ? true : false}
                  cudesign={cudesign}
                  setCusv={setCusv}
                  setIsdevice={setIsdevice}
                />
              ))
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

export default SvTables;
