import { Flex, Text, Link } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

export default function Footer() {
    return (
        <Flex w={'100%'} minH={20} bg={'#0d0e12'} bottom={0} justify={'center'} align={'flex-end'} flexDirection={'row'} pr={20}>
            <Flex  flex={1} h={'100%'} justify={'center'} align={'center'}>
                <Link href={"https://axiehomeland.wiki/"}>
                <Text color={'white'} fontSize={20} as={'u'} >Axie Homeland Wiki</Text>
                </Link>
            </Flex>
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
                <Text color={'grey'} fontSize={12}>Or send RON / AXS to hellscream.ron</Text>
            </Flex>
        </Flex>
    )
}