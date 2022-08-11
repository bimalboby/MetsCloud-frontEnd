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
import React, { useContext, useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Progress,
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// Styles for the circular progressbar
import "react-circular-progressbar/dist/styles.css";
import medusa from "assets/img/cardimgfree.png";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
import DashboardTableRow from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import * as GradientProgress from "@delowar/react-circle-progressbar";

// Icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import { BsArrowRight } from "react-icons/bs";
import {
  IoCheckmarkDoneCircleSharp,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { BiHappy } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";

// Data
import {
  barChartDataDashboard,
  barChartOptionsDashboard,
  lineChartDataDashboard,
  lineChartOptionsDashboard,
} from "variables/charts";
import { dashboardTableData, timelineData } from "variables/general";
import { usercontext } from "Hooks/Authcontext/Authcontext";
import InvoicesRow from "components/Tables/InvoicesRow";
import { invoicesData } from "variables/general";
import LineChartCard from "Comp/Charts/LineChartCard/LineChartCard";

export default function Dashboard() {
  const { userdetails ,inhomeGraphs,userid,designation} = useContext(usercontext)


  useEffect(() => {
    
  }, [])
  
  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        {/* MiniStatistics Card */}
        {
          userdetails.designation == "Business Owner" && (
            <Card>
              <CardBody>
                <Flex flexDirection='row' align='center' justify='center' w='100%'>
                  <Stat me='auto'>
                    <StatLabel
                      fontSize='sm'
                      color='gray.400'
                      fontWeight='bold'
                      pb='2px'>
                      Project Manager
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize='lg' color='#fff'>
                        {userdetails.noOfPm}
                      </StatNumber>
                      <StatHelpText
                        alignSelf='flex-end'
                        justifySelf='flex-end'
                        m='0px'
                        color={userdetails.pmImprovement < 0 ? 'red.500' : 'green.400'}
                        fontWeight='bold'
                        ps='3px'
                        fontSize='md'>
                        {(userdetails.pmImprovement) < 0 ? `${userdetails.pmImprovement}` : `+${userdetails.pmImprovement}`}%
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <IconBox as='box' h={"45px"} w={"45px"} bg='brand.200'>
                    <WalletIcon h={"24px"} w={"24px"} color='#fff' />
                  </IconBox>
                </Flex>
              </CardBody>
            </Card>
          )
        }

        {/* MiniStatistics Card */}
        {
          (userdetails.designation == "Business Owner" || userdetails.designation == "Project Manager") && (
            <Card minH='83px'>
              <CardBody>
                <Flex flexDirection='row' align='center' justify='center' w='100%'>
                  <Stat me='auto'>
                    <StatLabel
                      fontSize='sm'
                      color='gray.400'
                      fontWeight='bold'
                      pb='2px'>
                      Supervisors
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize='lg' color='#fff'>
                        {userdetails.noOfSv}
                      </StatNumber>
                      <StatHelpText
                        alignSelf='flex-end'
                        justifySelf='flex-end'
                        m='0px'
                        color={userdetails.svImprovement < 0 ? 'red.500' : 'green.400'}
                        fontWeight='bold'
                        ps='3px'
                        fontSize='md'>
                        {(userdetails.svImprovement) < 0 ? `${userdetails.svImprovement}` : `+${userdetails.svImprovement}`}%
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <IconBox as='box' h={"45px"} w={"45px"} bg='brand.200'>
                    <GlobeIcon h={"24px"} w={"24px"} color='#fff' />
                  </IconBox>
                </Flex>
              </CardBody>
            </Card>
          )}
        {/* MiniStatistics Card */}
        <Card>
          <CardBody>
            <Flex flexDirection='row' align='center' justify='center' w='100%'>
              <Stat>
                <StatLabel
                  fontSize='sm'
                  color='gray.400'
                  fontWeight='bold'
                  pb='2px'>
                  Devices
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color='#fff'>
                    {userdetails.devices}
                  </StatNumber>
                  <StatHelpText
                    alignSelf='flex-end'
                    justifySelf='flex-end'
                    m='0px'
                    color={userdetails.deviceImprovement < 0 ? 'red.500' : 'green.400'}
                    fontWeight='bold'
                    ps='3px'
                    fontSize='md'>
                    {(userdetails.deviceImprovement) < 0 ? `${userdetails.deviceImprovement}` : `+${userdetails.deviceImprovement}`}%
                  </StatHelpText>
                </Flex>
              </Stat>
              <Spacer />
              <IconBox as='box' h={"45px"} w={"45px"} bg='brand.200'>
                <DocumentIcon h={"24px"} w={"24px"} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", "2xl": "2fr 1.2fr 1.5fr" }}
        my='26px'
        gap='18px'>
        {/* Welcome Card */}
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
                  Welcome back,
                </Text>
                <Text fontSize='28px' color='#fff' fontWeight='bold' mb='18px'>
                  {userdetails.userName}
                </Text>
                <Text
                  fontSize='md'
                  color='gray.400'
                  fontWeight='normal'
                  mb='auto'>
                  {userdetails.designation}
                   <br />
                  {userdetails.organization}
                </Text>

              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      {/* <Grid
        templateColumns={{ sm: "1fr", lg: "1.7fr 1.3fr" }}
        maxW={{ sm: "100%", md: "100%" }}
        gap='24px'
        mb='24px'>
      </Grid> */}
      <Grid
      templateColumns={{ sm: "1fr", md: "1fr 1fr", "2xl": "2fr 1.2fr 1.5fr" }}
      my="26px"
      gap="18px"
    >
      {
        inhomeGraphs.map((chart)=>(
            <LineChartCard lineChartDataDashboard={chart} userid={userid} designation={designation}/>
        ))
      }
    </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        gap='24px'>
        <Card
          p='22px'
          // my={{ sm: "24px", lg: "0px" }}
          // ms={{ sm: "0px", lg: "24px" }}
          >
          <CardHeader>
            <Flex
              justify='space-between'
              align='center'
              mb='1rem'
              w='100%'
              mb='28px'>
              <Text fontSize='lg' color='#fff' fontWeight='bold'>
                Reports
              </Text>
              <Button
                variant='brand'
                fontSize='10px'
                fontWeight='bold'
                p='6px 32px'>
                VIEW ALL
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%'>
              {invoicesData.map((row) => {
                return (
                  <InvoicesRow
                    date={row.date}
                    code={row.code}
                    // price={row.price}
                    logo={row.logo}
                    format={row.format}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}
