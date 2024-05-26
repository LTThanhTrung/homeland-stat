import { Flex, Text, Image, VStack, Box, Table, TableContainer, Tr, Th, HStack } from '@chakra-ui/react'
import { PlotDetail, formatDate } from '@/utils/tools'
import { useState } from 'react'
import axios from 'axios'
import { GameConfig } from '@/utils/tools'

export default function Plot(props) {
    const [item, setItem] = useState(props.item)
    const now = new Date()
    const today = formatDate(now)
    const amount = item.plotData ? item.plotData.filter(obj => obj.created_at.startsWith(today)).reduce(function (sum, item) {
        return sum + item.axs_amount
    }, 0) / 1000 : 0
    const total = PlotDetail[item.land_type].dailyAXS

    const resetPlotData = async () => {
        try {
            setItem(prev => ({ ...prev, loaded: false }))
            let obj = item
            let plotData = (await axios.post('/api/getPlotDetail', { account: props.account, plotData: obj })).data
            let data = plotData.data
            let filteredData = data.filter((e) => !(GameConfig.moonfall_action_id.includes(e.from_action)))
            setItem(prev => ({ ...prev, plotData: filteredData, loaded: true }))
        }
        catch (ex) {
            console.log(ex)
            setItem(prev => ({ ...prev, loaded: true }))
        }
    }

    return (
        <Flex width={64} minH={64} direction={'column'} align={'center'} background={'#13161b'} shadow={'lg'} borderRadius={5} key={props.key} pos={"relative"} >
            <Image src='icon-flat-switch.png' w={8} pos={"absolute"} right={4} top={4} alt={"refresh plots"} onClick={resetPlotData} cursor={"pointer"} />
            <Flex height={20} w={64} justifyContent={'space-around'} mt={4} alignItems={'center'} >
                <Flex w={16} h={16} borderRadius={100} bgGradient='linear(to-r, #3F7A73, #4CA69B, #3F7A73)' justifyContent={'center'} align={'center'}>
                    <Image src={`/plot_${item.land_type}.png`} width={12} h={12} alt="Plot" />
                </Flex>
                <VStack>
                    <Box w={32} >
                        {props.item.steward ?
                            <HStack spacing={2}>
                                <Text fontSize={12} noOfLines={1} color={now.getTime() / 1000 > props.item.steward.expiry_timestamp ? "red" : "#A28C76"}>{props.item.steward.assignee_name}</Text>
                            </HStack>
                            : <></>}
                        <Text noOfLines={2} color={"#e2e4e9b3"} fontWeight={'bold'}>
                            {item.name.length > 0 ? item.name : "No Name"}
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

            {item.loaded ?
                <>
                    <TableContainer w={'100%'}>
                        <Table variant='unstyled' color={"#e2e4e9b3"} w={'100%'} mt={3}>
                            <Tr>
                                <Th color={"#e2e4e9b3"} textAlign={'left'} p={2} >
                                    <Text fontWeight={"extrabold"} ml={4}>
                                        Townhall Level
                                    </Text>
                                </Th>
                                <Th p={2}>{item.townhall_level}</Th>
                            </Tr>
                            <Tr>
                                <Th color={"#e2e4e9b3"} textAlign={'left'} p={2} >
                                    <Text fontWeight={"extrabold"} ml={4}>
                                        Current mAXS
                                    </Text>
                                </Th>
                                <Th p={2}>{amount}</Th>
                                {item.moonfall > 0 ? <Image w={8} src="/icon-jackpot.png" /> : <></>}
                            </Tr>
                            <Tr>
                                <Th color={"#e2e4e9b3"} textAlign={'left'} p={2} >
                                    <Text fontWeight={"extrabold"} ml={4}>
                                        Total mAXS
                                    </Text>
                                </Th>
                                <Th p={2}>{total}</Th>
                            </Tr>
                            <Tr>
                                <Th color={"#e2e4e9b3"} textAlign={'left'} p={2} >
                                    <Text fontWeight={"extrabold"} ml={4}>
                                        Percentage
                                    </Text>
                                </Th>
                                <Th p={2}>{Math.floor(amount * 100 * 100 / total) / 100} %</Th>
                            </Tr>

                            {props.item.steward ?
                                <Tr>
                                    <Th color={"#e2e4e9b3"} textAlign={'left'} p={2} >
                                        <Text fontWeight={"extrabold"} ml={4}>
                                            Payout Ratio
                                        </Text>
                                    </Th>
                                    <Th p={2}>{props.item.payout_ratio / 100} %</Th>
                                </Tr> :
                                <></>}
                        </Table>
                    </TableContainer></>
                : <Text color={"#A28C76"}>Loading</Text>}
        </Flex>
    )
}