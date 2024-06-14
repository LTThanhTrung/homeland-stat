import { Flex, Text, Progress } from '@chakra-ui/react'
import { useState } from 'react'
import { StarIcon } from '@chakra-ui/icons'

export default function QuestDetail({ item, questDetail }) {

    const [flag, setFlag] = useState(false)

    return (
        <Flex
            w={'100%'}
            pos={'relative'}
            display={item.status == "Claimed" ? "none" : 'unset'}
            opacity={flag ? "0.1" : "unset"}
            justify={'center'}
            align={'center'}
            mb={2}
            onClick={() => { setFlag(!flag) }}
            cursor={'pointer'}
        >
            <Flex direction={'row'} align={'center'}>
                <StarIcon w={4} mr={2} color={'orange'}/>
                <Text fontSize={14} color={'white'} fontWeight={'bold'}>{questDetail._note.replace('{X}', questDetail.required_value)} ({item.progress}/{questDetail.required_value})</Text>
            </Flex>
            <Progress h={2} hasStripe value={item.progress / questDetail.required_value * 100} w={'100%'} colorScheme={item.status == "Claimable" ? "green" : "yellow"} background={'gray.500'} />
            <Text fontWeight={'bold'} fontSize={12} position={'absolute'} right={0} bottom={0}></Text>
        </Flex>)
}