import { Flex, Text, Image, VStack, Box, Table, TableContainer, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot } from '@chakra-ui/react'
import { useEffect } from 'react'
import { PlotDetail } from '@/utils/tools'

export default function PlotData(props) {

    const item = props.item
    const today = new Date()
    const toDate = today.getFullYear() + '-' + (today.getUTCMonth() + 1 < 10 ? "0" + (today.getUTCMonth() + 1) : today.getUTCMonth() + 1) + '-' + (today.getUTCDate() < 10 ? "0" + today.getUTCDate() : today.getUTCDate())

    const amount = item.plotData ? item.plotData.filter(obj => obj.created_at.startsWith(toDate)).reduce(function (sum, item) {
        return sum + item.axs_amount
    }, 0) / 1000 : 0
    const total = PlotDetail[item.land_type].dailyAXS 
    
    return (
        <Flex width={64} height={64} direction={'column'} align={'center'} background={'#F6E2C1'} shadow={'lg'} borderRadius={5}>
            <Flex height={20} w={64} justifyContent={'space-around'} mt={4} alignItems={'center'} >
                <Flex w={16} h={16} borderRadius={100} bgGradient='linear(to-r, #3F7A73, #4CA69B, #3F7A73)' justifyContent={'center'} align={'center'}>
                    <Image src={`/plot_${item.land_type}.webp`} width={12} h={12} alt="Plot" />
                </Flex>
                <VStack>
                    <Box w={32} >
                        <Text noOfLines={2} color={"#A28C76"} fontWeight={'bold'}>
                            {item.name}
                        </Text>
                    </Box>

                    <Flex
                        width={"100%"}
                        height={8}
                        justify={'center'}
                        align={'center'}
                        borderRadius={10}
                        bg={PlotDetail[item.land_type].bg}  >
                        <Text color={"white"} fontWeight={'bold'}>{item.x};{item.y}</Text>
                    </Flex>
                </VStack>
            </Flex>
            <TableContainer w={'100%'}>
                <Table variant='unstyled' color={"#72573A"} w={'100%'} mt={3}>
                    <Tr>
                        <Th color={"#72573A"} textAlign={'left'} p={2} >
                            <Text fontWeight={"extrabold"} ml={4}>
                                Townhall Level
                            </Text>
                        </Th>
                        <Th p={2}>{item.townhall_level}</Th>
                    </Tr>
                    <Tr>
                        <Th color={"#72573A"} textAlign={'left'} p={2} >
                            <Text fontWeight={"extrabold"} ml={4}>
                                Current mAXS
                            </Text>
                        </Th>
                        <Th p={2}>{amount}</Th>
                    </Tr>
                    <Tr>
                        <Th color={"#72573A"} textAlign={'left'} p={2} >
                            <Text fontWeight={"extrabold"} ml={4}>
                                Total mAXS
                            </Text>
                        </Th>
                        <Th p={2}>{total}</Th>
                    </Tr>
                    <Tr>
                        <Th color={"#72573A"} textAlign={'left'} p={2} >
                            <Text fontWeight={"extrabold"} ml={4}>
                                Percentage
                            </Text>
                        </Th>
                        <Th p={2}>{Math.floor(amount * 100 * 100 / total) / 100} %</Th>
                    </Tr>
                </Table>
            </TableContainer>
        </Flex>
    )
}