import axios from "axios"
import { useEffect, useState } from "react"
import { Text, Flex, TableContainer, Table, Tr, Th, Image, HStack } from '@chakra-ui/react'
import WeeklyChart from "./Chart/WeeklyChart"
import { CopyIcon } from '@chakra-ui/icons'
import { PlotDetail, formatDate, GameConfig } from "@/utils/tools"

export default function Summary(props) {

    // const [plots, setPlots] = useState()
    const [dailyAmount, setDailyAmount] = useState({ axs: 0, moonfall: 0 })
    const [weeklyAmount, setWeeklyAmount] = useState({ axs: 0, moonfall: 0 })
    const [total, setTotal] = useState(0)
    const [account, setAccount] = useState(props.account)
    const [landTypes, setLandTypes] = useState({ '0': 0, '1': 0, '2': 0, '3': 0, '4': 0 }) // Hashmap to count different land types
    const [chartData, setChartData] = useState()
    const [claimable, setClaimable] = useState(0)
    const [balanceAXS, setBalanceAXS] = useState(0)
    const [pendingAXS, setPendingAXS] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
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
                    moonfall: Math.floor(data[today].moonfallAXS / (GameConfig.moonfall_amount * 1000))
                })
                let keys = Object.keys(data)
                for (let i = 0; i < keys.length; i++) {
                    weeklyAmount.axs = (weeklyAmount.axs + data[keys[i]].dailyAXS)
                    weeklyAmount.moonfall = (weeklyAmount.moonfall + data[keys[i]].moonfallAXS)
                }

                weeklyAmount.axs = weeklyAmount.axs / 1000
                weeklyAmount.moonfall = weeklyAmount.moonfall / (GameConfig.moonfall_amount * 1000)
                setChartData(data)
                setWeeklyAmount(weeklyAmount)
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
                                <Text>{Math.floor(claimable / (10 ** 18) * 100) / 100} AXS</Text>
                                <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                            </>}
                            {pendingAXS > 0 && <>
                                <Text fontWeight={'bold'}>Pending AXS</Text>
                                <Text>{Math.floor(pendingAXS / (1000000) * 100) / 100} AXS</Text>
                                <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                            </>}
                            {balanceAXS > 0 && <>
                                <Text fontWeight={'bold'}>In-game AXS</Text>
                                <Text>{Math.floor(balanceAXS / (1000000) * 100) / 100} AXS</Text>
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
                                    <Text>{dailyAmount.axs}</Text>
                                    <Text> / {total}</Text>
                                    <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                                    {dailyAmount.moonfall > 0 ?
                                        <>
                                            <Text>+{Math.floor(dailyAmount.moonfall)} Moonfall</Text>
                                        </>
                                        : <></>}
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
                                <Th >{Math.floor(dailyAmount.axs * 100 * 100 / total) / 100} %</Th>
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
                                        <Text>{Math.floor(weeklyAmount.axs / 1000 * 100) / 100}</Text>
                                        <Text> / {total * 7}</Text>
                                        <Image src="https://storage.googleapis.com/sm-prod-ecosystem-portal/prod/1699601003-blob" w={8} />
                                        {weeklyAmount.moonfall > 0 ?
                                            <>
                                                <Text>+{Math.floor(weeklyAmount.moonfall)} Moonfall</Text>
                                            </>
                                            : <></>}
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
                                    {Math.floor(weeklyAmount.axs / 1000 / (total * 7) * 100 * 100) / 100}%
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