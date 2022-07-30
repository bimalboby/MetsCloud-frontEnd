import React, { useContext, useState } from 'react'
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

const GetToken = () => {
    const titleColor = "white";
    const textColor = "gray.400";
    const { userid, designation } = useContext(usercontext)

    const [tokeninfo, setTokeninfo] = useState({
        email: "",
        designation: ""
    })
    const sumbit = async () => {
        const res = await Axios.post(`/create-token?userid=${userid}&designation=${designation}`, tokeninfo)
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

                    <FormControl>
                        <FormLabel
                            color={titleColor}
                            ms='4px'
                            fontSize='sm'
                            fontWeight='normal'>
                            Email
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
                                value={tokeninfo.email}
                                onChange={(e) => setTokeninfo(pre => ({
                                    ...pre,
                                    email: e.target.value
                                }))}
                                border='transparent'
                                borderRadius='20px'
                                fontSize='sm'
                                size='lg'
                                w={{ base: "100%", md: "346px" }}
                                maxW='100%'
                                h='46px'
                                type='text'
                                placeholder='Email'
                            />
                        </GradientBorder>
                        <FormLabel
                            color={titleColor}
                            ms='4px'
                            fontSize='sm'
                            fontWeight='normal'>
                            Designation
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
                                value={tokeninfo.designation}
                                onChange={(e) => setTokeninfo(pre => ({
                                    ...pre,
                                    designation: e.target.value
                                }))}
                                placeholder='Select option'
                                border='transparent'
                                borderRadius='20px'
                                fontSize='sm'
                                size='lg'
                                w={{ base: "100%", md: "346px" }}
                                maxW='100%'
                                h='46px'>
                                {designation=="businessOwner" && (<option value='projectManager'>Project manager</option>)}
                                <option value='supervisor'>Supervisor</option>
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
                            Generate Token
                        </Button>
                    </FormControl>
                </Flex>
            </GradientBorder>
            {/* </SimpleGrid> */}
        </Flex>
    )
}

export default GetToken