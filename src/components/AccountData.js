import axios from "axios"
import { useEffect, useState } from "react"
import { Text, Flex, Grid } from '@chakra-ui/react'
import PlotData from "./PlotData"

export default function AccountData(props) {

    const [plots, setPlots] = useState()
    const [amount, setAmount] = useState(0)
    const [total, setTotal] = useState(0)

    const account = props.account
    console.log(account)
    let accessToken = account.accessToken


    useEffect(() => {
        const fetchData = async () => {
            let amount = 0
            let total = 0
            let today = new Date()
            let toDate = today.getFullYear() + '-' + (today.getUTCMonth() + 1 < 10 ? "0" + (today.getUTCMonth() + 1) : today.getUTCMonth() + 1) + '-' + (today.getUTCDate() < 10 ? "0" + today.getUTCDate() : today.getUTCDate())

            await axios.post('/api/getPlots', { accessToken }).then(async (response) => {
                let data = response.data
                if (data.success) {
                    /* Get plots by accounts, then render plotData */
                    let plots = data.plots
                    plots.sort(function (a, b) { return parseInt(b.land_type) - parseInt(a.land_type) })

                    for (let i = 0; i < plots.length; i++) {
                        let obj = plots[i]
                        let plotData = (await axios.post('/api/getPlotDetail', { accessToken, plotData: obj })).data
                        if (plotData.success) {
                            plots[i].plotData = plotData.data

                            amount += plotData.data.filter(obj => obj.created_at.startsWith(toDate)).reduce(function (sum, item) {
                                return sum + item.amount
                            }, 0)
                            total += plots[i].land_type == 0 ? 16 : plots[i].land_type == 1 ? 52 : plots[i].land_type == 2 ? 148 : plots[i].land_type == 3 ? 328 : 6540
                        }
                    }
                    console.log(plots)
                    setPlots(plots)
                    setAmount(amount / 1000)
                    setTotal(total)
                }
            })
        }
        fetchData()
    }, [])

    const renderPlot = () => {
        if (plots != undefined) {
            let renderItem = plots.map((item, index) => {
                return (
                    <PlotData key={index} item={item} />
                )
            })
            return renderItem
        }
        else {
            return
        }
    }

    return (
        <>
            <Flex flexDirection={'row'} align={'center'} mt={4}>
                <Text fontSize={24} fontWeight={'extrabold'} mr={4}>{account.name}</Text>
                <Text>{Math.floor(amount * 100 * 100 / total) / 100 }%</Text> 
            </Flex>

            <Flex mt={4}>
                <Grid w={'100%'} templateColumns='repeat(5, 1fr)' gap={6}>
                    <>{renderPlot()}</>
                </Grid>
            </Flex>
        </>
    )
}