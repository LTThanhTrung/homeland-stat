import { Flex, Text, Image, VStack, Box, Table, TableContainer, Tbody, Tr, Th, HStack } from '@chakra-ui/react'
import { PlotDetail, formatDate } from '@/utils/tools'
import { useState } from 'react'
import axios from 'axios'
import { GameConfig } from '@/utils/tools'

export default function Plot(props) {
    const [item, setItem] = useState(props.item)
    console.log(item)
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
            let data = plotData.data.axsData

            if (obj.payout_ratio == 5000) {
                data = data.map((item) => { return { ...item, axs_amount: item.axs_amount * 2 } })
            }

            let filteredData = data.filter((e) => !((GameConfig.moonfall_action_id.includes(e.from_action) && e.created_at.startsWith(today))))
            setItem(prev => ({ ...prev, plotData: filteredData, plotDetail: plotData.data.landData[0], loaded: true }))
        }
        catch (ex) {
            console.log(ex)
            setItem(prev => ({ ...prev, loaded: true }))
        }
    }

    return (
        <Flex width={64} minH={64} direction={'column'} align={'center'} background={'#13161b'} shadow={'lg'} borderRadius={5} pos={"relative"} >
            <Image src='icon-flat-switch.png' w={8} pos={"absolute"} right={4} top={4} alt={"refresh plots"} onClick={resetPlotData} cursor={"pointer"} />
            <Flex height={24} w={64} justifyContent={'space-around'} alignItems={'center'} >
                <Flex w={16} h={16} borderRadius={100} bgGradient='linear(to-r, #3F7A73, #4CA69B, #3F7A73)' justifyContent={'center'} align={'center'}>
                    <Image src={`/plot_${item.land_type}.png`} width={12} h={12} alt="Plot" />
                </Flex>
                <Flex mb={2} flexDirection={'column'} mt={4}>
                    <Box w={32} >
                        {item.steward ?
                            <Text fontSize={12} noOfLines={1} color={now.getTime() / 1000 > item.steward.expiry_timestamp ? "red" : "#A28C76"}>{item.steward.assignee_name}</Text>
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
                        mt={1}
                        bg={PlotDetail[item.land_type].bg}  >
                        <Text color={"white"} fontWeight={'bold'}>{item.x};{item.y}</Text>
                    </Flex>
                </Flex>
            </Flex>

            {item.loaded ?
                <>
                    <Flex w={'100%'} direction={'row'} justify={'center'} align={'center'} mt={1}>
                        <Flex bg={"#282c34"} p={2} flexDirection={'row'} justify={'center'} align={'center'} borderRadius={10} mr={2}>
                            <Image src='icon-flat-pawnworker.png' w={4} h={4} mr={1} />
                            <Text
                                color={"white"}
                                fontWeight={'bold'}
                                fontSize={11}
                            >
                                {item.plotDetail.number_of_workers < item.plotDetail.number_of_working_workers ?
                                    0 : item.plotDetail.number_of_workers - item.plotDetail.number_of_working_workers}
                                /{item.plotDetail.number_of_workers}
                            </Text>
                        </Flex>
                        <Flex bg={"#282c34"} p={2} flexDirection={'row'} justify={'space-around'} align={'center'} borderRadius={10} mr={2}>
                            <Image src='icon-flat-npc.png' w={4} h={4} mr={1} />
                            <Text
                                color={"white"}
                                fontWeight={'bold'}
                                fontSize={11}
                            >
                                {item.plotDetail.number_of_idle_npcs}/{item.plotDetail.number_of_npcs}
                            </Text>
                        </Flex>
                        <Flex bg={"#282c34"} p={2} flexDirection={'row'} justify={'space-around'} align={'center'} borderRadius={10} mr={2}>
                            <Image src='icon-flat-contruct.png' w={4} h={4} mr={1} />
                            <Text
                                color={"white"}
                                fontWeight={'bold'}
                                fontSize={11}
                            >
                                Lv. {item.townhall_level}
                            </Text>
                        </Flex>
                        {item.land_property == 0 ?
                        <Image src='icon-flat-landproperties-normal.png' w={4} h={4} /> : item.land_property == 1 ?
                        <Image src='icon-flat-agriculture.png' w={4} h={4} /> :
                        <Image src='filter-building-crafting.png' w={4} h={4} />}
                    </Flex>

                    <TableContainer w={'100%'}>
                        <Table variant='unstyled' color={"#e2e4e9b3"} w={'100%'} mt={3}>
                            <Tbody>
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
                            </Tbody>
                        </Table>
                    </TableContainer></>
                : <Text color={"#A28C76"}>Loading</Text>}
        </Flex>
    )
}