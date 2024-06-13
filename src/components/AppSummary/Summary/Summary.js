import axios from "axios"
import { useEffect, useState } from "react"
import { Text, Flex, TableContainer, Table, Tr, Th, Image, HStack, Tbody, Tooltip } from '@chakra-ui/react'
import WeeklyChart from "./Chart/WeeklyChart"
import { CopyIcon } from '@chakra-ui/icons'
import { PlotDetail, formatDate, GameConfig, MoonfallConfig } from "@/utils/tools"

export default function Summary(props) {

    const [loading, setLoading] = useState(true)
    const [dailyAmount, setDailyAmount] = useState({ axs: 0, moonfall: {"41" : 0, "42" : 0, "43": 0} })
    const [weeklyAmount, setWeeklyAmount] = useState({ axs: 0, moonfall: {"41" : 0, "42" : 0, "43": 0} })
    const [total, setTotal] = useState(0)
    const [account, setAccount] = useState(props.account)
    const [landTypes, setLandTypes] = useState({ '0': 0, '1': 0, '2': 0, '3': 0, '4': 0 }) // Hashmap to count different land types
    const [chartData, setChartData] = useState()
    const [claimable, setClaimable] = useState(0)
    const [balanceAXS, setBalanceAXS] = useState(0)
    const [pendingAXS, setPendingAXS] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let total = 0

            await axios.post('/api/getPlots', { account }).then(async (response) => {
                let data = response.data
                if (data.success) {
                    /* Get plots by accounts, then render plotData */
                    let plots = data.plots

                    plots.map((x) => {
                        landTypes[x.land_type] = landTypes[x.land_type] + 1
                        total = total + PlotDetail[x.land_type].dailyAXS
                    })

                    setLandTypes(landTypes)

                    plots.sort(function (a, b) { return parseInt(b.land_type) - parseInt(a.land_type) })

                    setTotal(Math.floor(total / 1000 * 1000) / 1000)
                    setClaimable(data.claimAbleAXS)
                    setBalanceAXS(data.balanceAXS)
                    setPendingAXS(data.pendingAXS)
                }
            })

            await axios.post('/api/getAccountWeekly', { account }).then(async (response) => {
                let data = response.data.data
                let today = formatDate(new Date())

                setDailyAmount({
                    axs: Math.floor(data[today].dailyAXS / 1000 / 1000 * 1000) / 1000,
                    moonfall: data[today].moonfall
                })
                let keys = Object.keys(data)
                for (let i = 0; i < keys.length; i++) {
                    weeklyAmount.axs = (weeklyAmount.axs + data[keys[i]].dailyAXS)
                    weeklyAmount.moonfall['41'] = weeklyAmount.moonfall['41'] + data[keys[i]].moonfall['41']
                    weeklyAmount.moonfall['42'] = weeklyAmount.moonfall['42'] + data[keys[i]].moonfall['42']
                    weeklyAmount.moonfall['43'] = weeklyAmount.moonfall['43'] + data[keys[i]].moonfall['43']
                }
                weeklyAmount.axs = weeklyAmount.axs / 1000
                setChartData(data)
                setWeeklyAmount(weeklyAmount)
            })
            setLoading(false)
        }

        if (account.display == undefined || account.display == true) {
            fetchData()
        }
    }, [account])

    const renderPlots = () => {
        let keys = Object.keys(landTypes)
        return (
            keys.map((item, index) => {
                {
                    if (landTypes[item] > 0) {
                        return (
                            <Flex key={index} direction={'row'} justify={'center'} align={'center'} mr={4}>
                                <Image src={`plot_${item}.png`} mr={2} w={10} />
                                <Text>{landTypes[item]}</Text>
                            </Flex>
                        )
                    }
                }
            })
        )
    }

    const renderMoonfall = (obj) => {
        let keys = Object.keys(obj.moonfall)
        const renderItems = keys.map((item, index) => {
            return (
                <>
                    {obj.moonfall[item] > 0 ? <>
                        <Text>+{obj.moonfall[item]}</Text>
                        <Tooltip label={MoonfallConfig[item].label} cursor={'pointer'}>
                            <Image w={6} src={MoonfallConfig[item].icon} />
                        </Tooltip>
                    </> : <></>}
                </>
            )
        })
        return renderItems
    }

    const renderBody = () => {
        return <>
            <Flex p={4} flexDirection={"row"} alignItems={'center'} >
                <Image src="avatar.png" borderRadius={50} w={24} />
                <Flex direction={'column'} p={4}>
                    <Text fontWeight={'bold'} fontSize={20}>
                        {account.name}
                    </Text>
                    <Flex direction={'row'} align={'center'}>
                        <Text color={'#b4bccb'}>
                            {account.userID}
                        </Text>
                        <CopyIcon cursor={'pointer'} ml={2} onClick={() => { navigator.clipboard.writeText(account.userID) }} />
                    </Flex>
                    <HStack direction={'row'} spacing={4}>
                        {claimable > 0 && <>
                            <Text fontWeight={'bold'}>Claimable</Text>
                            <Text>{Math.floor(claimable / (10 ** 18) * 1000) / 1000} AXS</Text>
                        </>}
                        {pendingAXS > 0 && <>
                            <Text fontWeight={'bold'}>Pending AXS</Text>
                            <Text>{Math.floor(pendingAXS / (1000000) * 1000) / 1000} AXS</Text>
                        </>}
                        {balanceAXS > 0 && <>
                            <Text fontWeight={'bold'}>In-game AXS</Text>
                            <Text>{Math.floor(balanceAXS / (1000000) * 1000) / 1000} AXS</Text>
                        </>}
                    </HStack>
                </Flex>
            </Flex>

            <TableContainer w={'100%'}>
                <Table variant='unstyled' color={'#e2e4e9b3'} w={'100%'} mt={3}>
                    <Tbody>
                        <Tr>
                            <Th color={"#e2e4e9b3"} textAlign={'left'} >
                                <Text fontWeight={"extrabold"}>
                                    Plots
                                </Text>
                            </Th>
                            <Th >
                                <Flex flexDirection={'row'}>
                                    {renderPlots()}
                                </Flex>
                            </Th>
                        </Tr>
                        <Tr>
                            <Th textAlign={'left'} >
                                <Text fontWeight={"extrabold"} color={'#e2e4e9b3'}>
                                    Today Earning
                                </Text>
                            </Th>
                            <Th>
                                <Flex direction={'row'} align={'center'}>
                                    <Text>{dailyAmount.axs}</Text>
                                    <Text> / {total}</Text>
                                    <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                                    {renderMoonfall(dailyAmount)}
                                </Flex>
                            </Th>
                        </Tr>
                        <Tr>
                            <Th textAlign={'left'}>
                                <Text fontWeight={"extrabold"}>
                                    Daily Percentage
                                </Text>
                            </Th>
                            <Th >{Math.floor(dailyAmount.axs * 100 * 100 / total) / 100} %</Th>

                        </Tr>
                        <Tr>
                            <Th textAlign={'left'}>
                                <Text fontWeight={"extrabold"}>
                                    Weekly Earning
                                </Text>
                            </Th>
                            <Th>
                                <Flex direction={'row'} align={'center'}>
                                    <Text>{Math.floor(weeklyAmount.axs / 1000 * 100) / 100}</Text>
                                    <Text> / {Math.round(total * 7 * 1000) / 1000}</Text>
                                    <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                                    {renderMoonfall(weeklyAmount)}
                                </Flex>
                            </Th>


                        </Tr>
                        <Tr>
                            <Th textAlign={'left'}>
                                <Text fontWeight={"extrabold"}>
                                    Weekly Percentage
                                </Text>
                            </Th>
                            <Th>
                                {Math.floor(weeklyAmount.axs / 1000 / (total * 7) * 100 * 100) / 100}%
                            </Th>


                        </Tr>
                        <Tr>
                            <Th textAlign={'left'} >
                                <Text fontWeight={"extrabold"}>
                                    Weekly Data
                                </Text>
                            </Th>
                            <Th p={2}>
                                <WeeklyChart data={chartData} dailyCap={total} />
                            </Th>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    }

    return (
        <>
            <Flex direction={'column'} minW={850} minH={900} bg={"#13161b"} borderColor={'#282c34'} borderWidth={2} shadow={'lg'} borderRadius={10} p={5}>
                {loading ?
                    <Flex display={'flex'} minW={"100%"} height={"100%"} justify={'center'} align={'center'}>
                        <Text fontWeight={'bold'}>Loading</Text>
                    </Flex>
                    : renderBody()}
            </Flex >
        </>
    )
}