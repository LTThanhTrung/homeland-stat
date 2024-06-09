import { Flex, Text } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

export default function Footer() {
    return (
        <Flex w={'100%'} h={20} bg={'#0d0e12'} position={'absolute'} bottom={0} justify={'center'} align={'flex-end'} flexDirection={'column'} pr={20}>
            <Flex flexDirection={'column'}>
                <Text color={'white'} fontWeight={'bold'}>Want to show support? </Text>
                <Flex direction={'row'}>
                    <Text color={'white'} fontWeight={'semibold'} mr={1} size={8}>Use Lunacian code </Text>
                    <Flex direction={'row'} align={'center'}>
                        <Text color={'#b4bccb'}>
                            HELLSCREAM
                        </Text>
                        <CopyIcon color={'white'} cursor={'pointer'} ml={2} onClick={() => { navigator.clipboard.writeText("HELLSCREAM") }} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}