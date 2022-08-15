import React, { useContext, useEffect, useState } from 'react'
import {
    Flex,
    Table,
    Tbody,
    Icon,
    Text,
    Th,
    SimpleGrid,
    Tr,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
} from "@chakra-ui/react";
import GradientBorder from 'components/GradientBorder/GradientBorder';
import { Link } from 'react-router-dom';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { usercontext } from 'Hooks/Authcontext/Authcontext';
import Axios from 'Config/Axios/Axios';
import { Spinner } from '@chakra-ui/react'
import download from 'js-file-download';

const ReportForm = () => {
    const titleColor = "white";
    const textColor = "gray.400";
    const { userid, designation } = useContext(usercontext)
    const [response, setResponse] = useState({})
    const [devices, setDevices] = useState([])
    const [sensors, setSensors] = useState([])
    const [details, setDetails] = useState({
        device:"",
        sensor:"",
        type:""
    })

    useEffect(async () => {
        const res = await Axios.post(`/get-devices?userid=${userid}&designation=${designation}`)
        let arr = []
        for (let i = 0; i < res.data.ids.length; i++) {
            arr.push({
                id: res.data.ids[i],
                name: res.data.name[i]
            })
        }
        setDevices(arr)

        console.log(res);
    }, [])

    useEffect(async() => {
      if(devices){
        const res = await Axios.post(`/get-sensors?userid=${userid}&designation=${designation}`,{
            device : details.device
        })
        let arr = []
        for (let i = 0; i < res.data.ids.length; i++) {
            arr.push({
                id: res.data.ids[i],
                name: res.data.name[i]
            })
        }
        setSensors(arr)
      }
    }, [devices])
    

    const sumbit = () => {
        console.log("here");
        if(details.type=="pdf"){
            Axios.get(`/submit-report?userid=${userid}&designation=${designation}&device=${details.device}&sensor=${details.sensor}&type=${details.type}`,{responseType:"blob"}).then(resp => {
                download(resp.data,`${details.sensor}-${Date.now().toString()}.pdf`);
         });
        }else{
            Axios.get(`/submit-report?userid=${userid}&designation=${designation}&device=${details.device}&sensor=${details.sensor}&type=${details.type}`,{responseType:"blob"}).then(resp => {
                download(resp.data,`${details.sensor}-${Date.now().toString()}.xls`);
            });
        }
        
        // setResponse(res.data)
    }

    return (
        <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
            {/* <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'> */}
            <GradientBorder p='2px' me={{ base: "none", lg: "30px", xl: "none" }}>
                <Flex
                    background='transparent'
                    borderRadius='30px'
                    direction='column'
                    p='40px'
                    minW={{ base: "unset", md: "430px", xl: "450px" }}
                    w='100%'
                    mx={{ base: "0px" }}
                    bg={{
                        base: "rgb(19,21,56)",
                    }}>

                    <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'>
                        Device name
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
                                    value={details.device}
                                    onChange={(e) => setDetails(pre => ({
                                        ...pre,
                                        device: e.target.value
                                    }))}
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
                    <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'>
                        Sensor name
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
                                    value={details.sensor}
                                    onChange={(e) => setDetails(pre => ({
                                        ...pre,
                                        sensor: e.target.value
                                    }))}
                                    placeholder='Select option'
                                    border='transparent'
                                    borderRadius='20px'
                                    fontSize='sm'
                                    size='lg'
                                    w={{ base: "100%", md: "346px" }}
                                    maxW='100%'
                                    h='46px'>
                                    {
                                        sensors?.map((sensor) => (
                                            <option value={sensor.id}>{sensor.name}</option>
                                        ))
                                    }
                                </Select>

                    </GradientBorder>
                    <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'>
                        Type
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
                                    value={details.type}
                                    onChange={(e) => setDetails(pre => ({
                                        ...pre,
                                        type: e.target.value
                                    }))}
                                    placeholder='Select option'
                                    border='transparent'
                                    borderRadius='20px'
                                    fontSize='sm'
                                    size='lg'
                                    w={{ base: "100%", md: "346px" }}
                                    maxW='100%'
                                    h='46px'>
                                    <option value={'pdf'}>PDF</option>
                                    <option value={'xls'}>XLS</option>
                                </Select>

                    </GradientBorder>
                    <FormControl>
                        <Button
                            onClick={() => sumbit()}
                            variant='brand'
                            fontSize='10px'
                            type='submit'
                            w='100%'
                            maxW='350px'
                            h='45'
                            mb='20px'
                            mt='20px'>
                            Download
                        </Button>

                    </FormControl>
                </Flex>
            </GradientBorder>
            {/* </SimpleGrid> */}
        </Flex>
    )
}

export default ReportForm