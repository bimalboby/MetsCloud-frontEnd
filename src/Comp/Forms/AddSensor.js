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
const AddSensor = () => {
    const titleColor = "white";
    const textColor = "gray.400";
    const { userid, designation } = useContext(usercontext)
    const [response, setResponse] = useState({})
    const [devices, setDevices] = useState([])

    const [sensorinfo, setSensorinfo] = useState({
        type: "",
        deviceid: "",
        nickname: ""
    })

    useEffect(async () => {
        const res = await Axios.post(`/iiot-show-devices?userid=${userid}&designation=${designation}`)
        let arr = []
        for (let i = 0; i < res.data.deviceIds.length; i++) {
            arr.push({
                id: res.data.deviceIds[i],
                name: res.data.deviceNames[i]
            })
        }
        setDevices(arr)

        console.log(res);
    }, [])

    const sumbit = async () => {
        const res = await Axios.post(`/iiot-add-sensor?userid=${userid}&designation=${designation}`, sensorinfo)
        setResponse(res.data)
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
                        {
                            devices.length > 0 ?

                                (<Select
                                    color={titleColor}
                                    bg={{
                                        base: "rgb(19,21,54)",
                                    }}
                                    value={sensorinfo.deviceid}
                                    onChange={(e) => setSensorinfo(pre => ({
                                        ...pre,
                                        deviceid: e.target.value
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
                                </Select>)
                                :
                                (<Spinner />)
                        }

                    </GradientBorder>
                    <FormControl>
                        {/* <FormLabel
                            color={titleColor}
                            ms='4px'
                            fontSize='sm'
                            fontWeight='normal'>
                            Serial Number
                        </FormLabel>

                        <GradientBorder
                            mb='5px'
                            h='50px'
                            w={{ base: "100%", lg: "fit-content" }}
                            borderRadius='20px'>
                            <Input
                                color={titleColor}
                                bg={{
                                    base: "rgb(19,21,54)",
                                }}
                                value={sensorinfo.sno}
                                onChange={(e) => setSensorinfo(pre => ({
                                    ...pre,
                                    sno: e.target.value
                                }))}
                                border='transparent'
                                borderRadius='20px'
                                fontSize='sm'
                                size='lg'
                                w={{ base: "100%", md: "346px" }}
                                maxW='100%'
                                h='46px'
                                type='text'
                                placeholder='Your name'
                            />
                        </GradientBorder> */}
                        {/* {
                            (response.status == "success" || response.status == "error") && (
                                <Text
                                    fontSize='xs'
                                    mb={5}
                                    ms={4}
                                    color={response?.status == "success" ? "green" : "red"}
                                    fontWeight='italics'>
                                    {
                                        response.status == "success" ?
                                            "Success" :
                                            "Serial number wrong"
                                    }
                                </Text>
                            )
                        } */}
                        <FormLabel
                            color={titleColor}
                            ms='4px'
                            fontSize='sm'
                            fontWeight='normal'>
                            Nick Name
                        </FormLabel>
                        <GradientBorder
                            mb='24px'
                            h='50px'
                            w={{ base: "100%", lg: "fit-content" }}
                            borderRadius='20px'>
                            <Input
                                value={sensorinfo.nickname}
                                onChange={(e) => setSensorinfo(pre => ({
                                    ...pre,
                                    nickname: e.target.value
                                }))}
                                color={titleColor}
                                bg={{
                                    base: "rgb(19,21,54)",
                                }}
                                border='transparent'
                                borderRadius='20px'
                                fontSize='sm'
                                size='lg'
                                w={{ base: "100%", md: "346px" }}
                                maxW='100%'
                                h='46px'
                                type='email'
                                placeholder='sensor nick name'
                            />
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
                                value={sensorinfo.type}
                                onChange={(e) => setSensorinfo(pre => ({
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
                                <option value={"temperature"}>Temperature</option>
                                <option value={"pressure"}>Pressure</option>

                            </Select>
                        </GradientBorder>
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
                            Add Sensor
                        </Button>

                    </FormControl>
                </Flex>
            </GradientBorder>
            {/* </SimpleGrid> */}
        </Flex>
    )
}

export default AddSensor