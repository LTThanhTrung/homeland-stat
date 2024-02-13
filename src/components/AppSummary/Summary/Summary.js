import axios from "axios"
import { useEffect, useState } from "react"
import { Text, Flex, TableContainer, Table, Tr, Th, Image, HStack } from '@chakra-ui/react'
import WeeklyChart from "./Chart/WeeklyChart"
import { CopyIcon } from '@chakra-ui/icons'
import { PlotDetail, formatDate, GameConfig } from "@/utils/tools"

export default function Summary(props) {

    // const [plots, setPlots] = useState()
    const [amount, setAmount] = useState(0)
    const [weeklyAmount, setWeeklyAmount] = useState(0)
    const [total, setTotal] = useState(0)
    const [account, setAccount] = useState(props.account)
    const [landTypes, setLandTypes] = useState({ '0': 0, '1': 0, '2': 0, '3': 0, '4': 0 }) // Hashmap to count different land types
    const [chartData, setChartData] = useState([])
    const [claimable, setClaimable] = useState(0)
    const [balanceAXS, setBalanceAXS] = useState(0)
    const [pendingAXS, setPendingAXS] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            let total = 0
            let weeklyAmount = 0

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

                    setTotal(Math.round(total / 1000 * 1000) / 1000)
                    setClaimable(data.claimAbleAXS)
                    setBalanceAXS(data.balanceAXS)
                    setPendingAXS(data.pendingAXS)
                }
            })

            await axios.post('/api/getAccountWeekly', { account }).then(async (response) => {
                let data = response.data.data
                let today = formatDate(new Date())
                let todayAXS = data[today].dailyAXS + data[today].moonfallAXS
                let chartData = []
                setAmount(Math.round(todayAXS / 1000 / 1000 * 1000) / 1000)
                let keys = Object.keys(data)
                for (let i = 0; i < keys.length; i++) {
                    let item = {
                        'name': keys[i].slice(5),
                        'dailyAXS': data[keys[i]].dailyAXS,
                        'dailyAXSPercent': data[keys[i]].dailyAXS / total / 1000 * 100,
                        'moonfall': data[keys[i]].moonfallAXS,
                        'moonfallPercent': data[keys[i]].moonfallAXS / (GameConfig.moonfall_amount) / 1000 * 100
                    }
                    weeklyAmount = (weeklyAmount + data[keys[i]].dailyAXS + data[keys[i]].moonfallAXS)
                    chartData.push(item)
                }
                setChartData(chartData)
                setWeeklyAmount(weeklyAmount / 1000)
            })
        }

        if (account.display == undefined || account.display == true) {
            fetchData()
        }

    }, [account])

    const renderPlots = () => {
        let keys = Object.keys(landTypes)
        return (
            keys.map((item) => {
                {
                    if (landTypes[item] > 0) {
                        return (
                            <Flex direction={'row'} justify={'center'} align={'center'} mr={4}>
                                <Image src={`plot_${item}.png`} mr={2} w={10} />
                                <Text>{landTypes[item]}</Text>
                            </Flex>
                        )
                    }
                }
            })
        )
    }

    return (
        <>
            <Flex direction={'column'} background={'#13161b'} borderColor={'##282c34'} borderWidth={1} shadow={'lg'} borderRadius={10} p={5}>
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
                                <Text>{Math.round(claimable / (10 ** 18) * 100) / 100} AXS</Text>
                                <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                            </>}
                            {pendingAXS > 0 && <>
                                <Text fontWeight={'bold'}>Pending AXS</Text>
                                <Text>{Math.round(pendingAXS / (1000000) * 100) / 100} AXS</Text>
                                <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                            </>}
                            {balanceAXS > 0 && <>
                                <Text fontWeight={'bold'}>In-game AXS</Text>
                                <Text>{Math.round(balanceAXS / (1000000) * 100) / 100} AXS</Text>
                                <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                            </>}
                        </HStack>
                    </Flex>
                </Flex>

                <TableContainer w={'100%'}>
                    <Table variant='unstyled' color={'white'} w={'100%'} mt={3}>
                        <Tr>
                            <Th color={"white"} textAlign={'left'} >
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
                                <Text fontWeight={"extrabold"} color={'white'}>
                                    Today Earning
                                </Text>
                            </Th>
                            <Th>
                                <Flex direction={'row'} align={'center'}>
                                    <Text>{amount}</Text>
                                    <Text> / {total}</Text>
                                    <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                                </Flex>
                            </Th>
                        </Tr>
                        <Tr>
                            <Th textAlign={'left'}>
                                <Text fontWeight={"extrabold"}>
                                    Daily Percentage
                                </Text>
                            </Th>
                            <Flex direction={'row'}>
                                <Th >{Math.floor(amount * 100 * 100 / total) / 100} %</Th>
                            </Flex>
                        </Tr>
                        <Tr>
                            <Th textAlign={'left'}>
                                <Text fontWeight={"extrabold"}>
                                    Weekly Earning
                                </Text>
                            </Th>
                            <Flex direction={'row'}>
                                <Th>
                                    <Flex direction={'row'} align={'center'}>
                                        <Text>{Math.round(weeklyAmount / 1000 * 100) / 100}</Text>
                                        <Text> / {total * 7}</Text>
                                        <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                                    </Flex>
                                </Th>
                            </Flex>
                        </Tr>
                        <Tr>
                            <Th textAlign={'left'}>
                                <Text fontWeight={"extrabold"}>
                                    Weekly Percentage
                                </Text>
                            </Th>
                            <Flex direction={'row'}>
                                <Th>
                                    {Math.round(weeklyAmount / 1000 / (total * 7) * 100 * 100) / 100}%
                                </Th>
                            </Flex>
                        </Tr>
                        <Tr>
                            <Th textAlign={'left'} >
                                <Text fontWeight={"extrabold"}>
                                    Weekly Data
                                </Text>
                            </Th>
                            <Flex direction={'row'}>
                                <Th p={2}>
                                    <WeeklyChart data={chartData} />
                                </Th>
                            </Flex>
                        </Tr>

                    </Table>
                </TableContainer>
            </Flex >
        </>
    )
}