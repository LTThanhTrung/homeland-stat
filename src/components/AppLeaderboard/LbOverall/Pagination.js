import axios from "axios"
import { useEffect, useState } from "react"
import { Flex, Button, Text } from '@chakra-ui/react'

export default function Pagination(props) {
    const handleOnclick = (num) => {
        let result = props.page + num
        if(result < 0 || result >= props.total){
            return
        }
        props.setPage(result)
        props.fetchData(result)
    }

    return (
        <Flex direction={'row'} w={400} justify={'space-around'} align={'center'} mt={10}>
            <Button onClick={()=>{handleOnclick(-1)}}>Prev</Button>
            <Text>Page {props.page + 1} of {props.total}</Text>
            <Button onClick={()=>{handleOnclick(1)}}>Next</Button>
        </Flex>
    )
}