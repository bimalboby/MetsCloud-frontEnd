import { Box, Flex,Text,Switch, Spacer, Icon, FormControl, FormLabel, Input, Stack, ButtonGroup, Button, Popover, PopoverTrigger, PopoverArrow, PopoverCloseButton, useDisclosure, IconButton, PopoverContent } from '@chakra-ui/react'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import LineChart from 'components/Charts/LineChart'
import Axios from 'Config/Axios/Axios'
import React, { useEffect, useState } from 'react'
import { FaBell, FaFileExcel, FaFilePdf, FaRegBell } from 'react-icons/fa'



const LineChartCard = ({lineChartDataDashboard,userid,designation}) => {
  const [chartdata, setChartdata] = useState(lineChartDataDashboard)
  const [addtohome, setaddtohome] = useState(false)
  const [ltimer, setlTimer] = useState(0)
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)
  const [highval, setHighval] = useState("")
  const [lowval, setLowval] = useState("")

  useEffect(() => {
    console.log("dsgdgdfgdfg");
    const aaaa = setInterval(async()=>{
        const res = await Axios.post(`/iiot-chart-data?id=${lineChartDataDashboard}&userid=${userid}&designation=${designation}`)
        console.log(res.data);
        setChartdata(res.data)
        setlTimer(20000)
    },20000)
    return ()=>{
      clearInterval(aaaa)
    }
  }, [])

  useEffect(async() => {
    if(addtohome){
      const res = await Axios.post(`/iiot-dashboard-graphs?id=${lineChartDataDashboard}&status=on&userid=${userid}&designation=${designation}`)
    }else{
      const res = await Axios.post(`/iiot-dashboard-graphs?id=${lineChartDataDashboard}&status=off&userid=${userid}&designation=${designation}`)
    }
  }, [addtohome])
  
  const setgraph = async() => {
    const res = await Axios.post(`/iiot-chart-alert-submit?id=${lineChartDataDashboard}&userid=${userid}&designation=${designation}`,{
      high:highval,
      low:lowval
    })
  }

  const getxls = async() => {
    const res = await Axios.post(`/iiot-report-xls?chartId=${lineChartDataDashboard}&userid=${userid}&designation=${designation}`)
    const blob = await res.blob();
    download(blob, `${lineChartDataDashboard}-${Date.now().toString()}.xls`);
  }

  const getpdf = async() => {
    const res = await Axios.post(`/iiot-report-pdf?chartId=${lineChartDataDashboard}&userid=${userid}&designation=${designation}`)
  }

  const TextInput = React.forwardRef((props, ref,value,onChange) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} value={value} onChange={(e)=>onChange(e.target.value)} id={props.id} {...props} />
      </FormControl>
    )
  })
  
  // 2. Create the form
  const Form = ({ firstFieldRef, onCancel ,highval,sethighval,lowval,setlowval}) => {
    return (
      <Stack spacing={4}>
        <TextInput
        value={highval}
        onChange={sethighval}
          label='Highest Value'
          id='high'
          ref={firstFieldRef}
          defaultValue=''
        />
        <TextInput 
        value={lowval}
        onChange={setlowval}
        label='Lowest Value'
        id='low'
        defaultValue='' />
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme='teal' onClick={setgraph}>
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    )
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

          <Flex height={"fit-content"} highval={highval} sethighval={setHighval} lowval={lowval} setlowval={setLowval}>
          <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
        <Icon onClick={()=>getxls()} as={FaBell} w='16px' h='16px' h='auto' me='15px' color='yellow' />
        </PopoverTrigger>
        <PopoverContent p={5}>
          {/* <FocusLock returnFocus persistentFocus={false}> */}
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
          {/* </FocusLock> */}
        </PopoverContent>
      </Popover>
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