import { Box, Flex,Text,Switch, Spacer, Icon } from '@chakra-ui/react'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import LineChart from 'components/Charts/LineChart'
import Axios from 'Config/Axios/Axios'
import React, { useEffect, useState } from 'react'
import { FaFileExcel, FaFilePdf } from 'react-icons/fa'

const LineChartCard = ({lineChartDataDashboard,userid,designation}) => {
  const [chartdata, setChartdata] = useState(lineChartDataDashboard)
  const [addtohome, setaddtohome] = useState(false)
  const [ltimer, setlTimer] = useState(0)

  useEffect(() => {
    console.log("dsgdgdfgdfg");
    const aaaa = setInterval(async()=>{
        const res = await Axios.post(`/iiot-chart-data?id=${lineChartDataDashboard}&userid=${userid}&designation=${designation}`)
        console.log(res.data);
        setChartdata(res.data)
        setlTimer(2000)
    },2000)
    return ()=>{
      clearInterval(aaaa)
    }
  }, [])

  useEffect(async() => {
    const res = await Axios.post(`/iiot-dashboard-graphs?id=${lineChartDataDashboard}&userid=${userid}&designation=${designation}`)
  }, [addtohome])
  

  const getxls = async() => {
    const res = await Axios.post(`/iiot-report-xls?chartId=${lineChartDataDashboard}&userid=${userid}&designation=${designation}`)
    const blob = await res.blob();
    download(blob, `${lineChartDataDashboard}-${Date.now().toString()}.xls`);
  }

  const getpdf = async() => {
    const res = await Axios.post(`/iiot-report-pdf?chartId=${lineChartDataDashboard}&userid=${userid}&designation=${designation}`)
  }
  
  return (
    <Card p="28px 0px 0px 0px">
        <CardHeader mb="20px" ps="22px"  >
          <Flex direction="column" alignSelf="flex-start">
            <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
              {chartdata.name}
            </Text>
            <Text fontSize="md" fontWeight="medium" color="gray.400">
              <Text as="span" color="green.400" fontWeight="bold">
                (+5%) more
              </Text>{" "}
              in 2021
            </Text>
          </Flex>
          <Spacer />

          <Flex height={"fit-content"}>
          <Icon onClick={()=>getxls()} as={FaFileExcel} w='16px' h='16px' h='auto' me='15px' color='green' />
          <Icon onClick={()=>getpdf()} as={FaFilePdf} w='16px' h='16px' h='auto' me='15px' color='#ff6464' />
          <Switch
                  mr={10}
                    colorScheme='brand'
                    isChecked={addtohome}
                    onChange={(event) => {
                      if (addtohome === true) {
                        setaddtohome(false);
                      } else {
                        setaddtohome(true);
                      }
                    }}
                  />
          </Flex>
                  
        </CardHeader>
        <Box w="100%" minH={{ sm: "300px" }}>
          {
            chartdata && (
              <LineChart
            lineChartData={chartdata?.chartdata?.dataArray}
            lineChartOptions={chartdata.chartoption}
          />
            )
          }
          
        </Box>
      </Card>
  )
}

export default LineChartCard