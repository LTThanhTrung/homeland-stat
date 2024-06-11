import { Flex, Text, Image, Tooltip, Box, Table, TableContainer, Tbody, Tr, Th, Td, HStack } from '@chakra-ui/react'
import { PlotDetail, formatDate } from '@/utils/tools'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { GameConfig } from '@/utils/tools'
import { InfoIcon } from '@chakra-ui/icons'

export default function Plot(props) {
    const [item, setItem] = useState(props.item)
    const now = new Date()
    const today = formatDate(now)
    const amount = item.plotData ? item.plotData.filter(obj => obj.created_at.startsWith(today)).reduce(function (sum, item) {
        return sum + item.axs_amount
    }, 0) / 1000 : 0
    const total = PlotDetail[item.land_type].dailyAXS
    const [isFull, setIsFull] = useState(false)

    useEffect(()=>{
        let isFull = Math.floor(amount * 100 * 100 / total) / 100 == 100
        setIsFull(isFull)
    })

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
            setIsFull(Math.floor(amount * 100 * 100 / total) / 100 == 100)
        }
        catch (ex) {
            console.log(ex)
            setItem(prev => ({ ...prev, loaded: true }))
        }
    }

    const TooltipItem = () => {
        return (
            <Flex direction={'column'}>
                <Text>current mAXS: {amount}</Text>
                <Text>total mAXS: {total}</Text>
            </Flex>)
    }

    return (
        <Flex width={64} minH={60} direction={'column'} align={'center'} shadow={'lg'} borderRadius={10} bg={isFull? 'seagreen':'#13161b'} color={isFull? "white" : "#e2e4e9b3"}>
            <Flex height={24} w={64} p={4} justifyContent={'space-around'} alignItems={'center'} >
                <Flex w={"60px"} h={"60px"} borderRadius={100} bg={'lightblue'} justifyContent={'center'} align={'center'} pos={'relative'}>
                    <Image src={`/plot_${item.land_type}.png`} width={12} h={12} alt="Plot" />
                    <Box pos={'absolute'} bottom={0} right={0}>

                    </Box>
                </Flex>
                <Flex w={24} h={'100%'} flexDirection={'column'} >
                    <Box w={40} >
                        {item.steward ?
                            <Text fontSize={12} noOfLines={1} color={now.getTime() / 1000 > item.steward.expiry_timestamp ? "red" : "#A28C76"}>{item.steward.assignee_name}</Text>
                            : <></>}
                        <Flex direction={'row'} align={'center'} textAlign={'left'} >
                            {item.land_property == 0 ?
                                <Image src='icon-flat-landproperties-normal.png' w={4} h={4} /> : item.land_property == 1 ?
                                    <Image src='icon-flat-agriculture.png' w={4} h={4} /> :
                                    <Image src='filter-building-crafting.png' w={4} h={4} />}
                            <Text ml={1} noOfLines={2} fontSize={16} fontWeight={'bold'}>
                                {item.name.length > 0 ? item.name : "No Name"}
                            </Text>
                        </Flex>
                    </Box>

                    <Flex
                        height={8}
                        justify={'center'}
                        align={'center'}
                        borderRadius={10}
                        mt={1}
                        bg={PlotDetail[item.land_type].bg}  >
                        <Text color={"white"} fontWeight={'bold'}>{item.x};{item.y}</Text>
                    </Flex>
                </Flex>
                <Flex direction={'column'} h={'100%'} justify={'space-between'} align={'center'}>
                    <Image src='icon-flat-switch.png' w={7} right={4} top={4} alt={"refresh plots"} onClick={resetPlotData} cursor={"pointer"} />
                    <Text fontSize={14} fontWeight={'extrabold'}> LV. {item.townhall_level} </Text>
                </Flex>
            </Flex>

            {item.loaded ?
                <>
                    <TableContainer w={'100%'}>
                        <Table variant='unstyled' size={'sm'}  w={'100%'} >
                            <Tbody>
                                <Tr>
                                    <Td textAlign={'left'} >
                                        <Text fontWeight={'medium'} fontSize={16}>
                                            Percentage
                                        </Text>
                                    </Td>
                                    <Td >
                                        <Flex direction={'row'} align={'center'} h={6} alignSelf={'flex-end'} justifyContent={'flex-end'} >
                                            <Text
                                                mr={2}
                                                fontSize={16}
                                                fontWeight={Math.floor(amount * 100 * 100 / total) / 100 == 100 ? 'bold' : 'medium'}
                                                
                                            >{Math.floor(amount * 100 * 100 / total) / 100} %</Text>
                                            {item.moonfall > 0 ? <Image w={6} src="/icon-jackpot.png" /> : <></>}
                                        </Flex>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td textAlign={'left'}  >
                                        <Text fontWeight={'medium'} fontSize={16}>
                                            mAXS
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Flex direction={'row'} align={'center'} h={6} alignSelf={'flex-end'} justifyContent={'flex-end'} >
                                            <Text mr={2} fontWeight={'medium'} fontSize={16}>
                                                {amount}
                                            </Text>
                                            <Tooltip label={TooltipItem()} cursor={'pointer'}>
                                                <InfoIcon color={'white'} mr={2} />
                                            </Tooltip>
                                        </Flex>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Flex w={'100%'} direction={'row'} justify={'space-between'} align={'center'} p={4} >
                        <Flex bg={"#282c34"} p={3} flexDirection={'row'} justify={'center'} align={'center'} borderRadius={10} mr={2}>
                            <Image src='icon-flat-pawnworker.png' w={4} h={4} mr={1} />
                            <Text
                                color={"white"}
                                fontWeight={'extrabold'}
                                fontSize={11}
                            >
                                {item.plotDetail.number_of_workers < item.plotDetail.number_of_working_workers ?
                                    0 : item.plotDetail.number_of_workers - item.plotDetail.number_of_working_workers}
                                /{item.plotDetail.number_of_workers}
                            </Text>
                        </Flex>
                        <Flex bg={"#282c34"} p={3} flexDirection={'row'} justify={'space-around'} align={'center'} borderRadius={10} mr={2}>
                            <Image src='icon-flat-npc.png' w={4} h={4} mr={1} />
                            <Text
                                color={"white"}
                                fontWeight={'extrabold'}
                                fontSize={11}
                            >
                                {item.plotDetail.number_of_idle_npcs}/{item.plotDetail.number_of_npcs}
                            </Text>
                        </Flex>
                        <Flex bg={"#282c34"} p={3} flexDirection={'row'} justify={'space-around'} align={'center'} borderRadius={10} mr={2}>
                            <Image src='icon-flat-contruct.png' w={4} h={4} mr={1} />
                            <Text
                                color={"white"}
                                fontWeight={'extrabold'}
                                fontSize={11}
                            >
                                {item.plotDetail.number_of_buildings}
                            </Text>
                        </Flex>

                    </Flex>
                </>
                : <Text color={"#A28C76"}>Loading</Text>}
        </Flex>
    )
}