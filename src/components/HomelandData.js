import { useEffect, useState } from "react"
import axios from 'axios';
import { Image, Text, Flex } from '@chakra-ui/react'

export default function HomelandData(props) {
    const [plots, setPlots] = useState()
    const [total, setTotal] = useState(0)
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            let accessToken = props.accessToken
            await axios.post('/api/getPlots', { accessToken }).then(async (response) => {
                let data = response.data
                if (data.success) {
                    let today = new Date()
                    let toDate = today.getFullYear() + '-' + (today.getUTCMonth() + 1 < 10 ? "0" + (today.getUTCMonth() + 1) : today.getUTCMonth) + '-' + (today.getUTCDate() < 10 ? "0" + today.getUTCDate() : today.getUTCDate())
                    let total = 0
                    let amount = 0
                    let plots = data.plots
                    plots.sort(function (a, b) { return parseInt(b.land_type) - parseInt(a.land_type) })
                    for (let i = 0; i < plots.length; i++) {
                        let obj = plots[i]
                        let plotData = (await axios.post('/api/getPlotDetail', { accessToken, plotData: obj })).data
                        console.log(plotData)
                        if (plotData.success) {
                            plots[i].plotData = plotData.data
                            amount+= plotData.data.filter(obj => obj.created_at.startsWith(toDate)).reduce(function (sum, item) {
                                return sum + item.amount
                            }, 0)
                            total+= plots[i].land_type == 0 ? 16 : plots[i].land_type == 1 ? 52 : plots[i].land_type == 2 ? 148 : plots[i].land_type == 3 ? 328 : 6540
                        }
                        setPlots(plots)
                    }
                    setAmount(amount / 1000)
                    setTotal(total)
                }
            })
        }
        fetchData()
    }, [])

    useEffect(() => {

    }, [plots])

    const renderPlot = () => {
        if (plots != undefined) {
            let renderItem = plots.map((item, index) => {
                let today = new Date()
                let toDate = today.getFullYear() + '-' + (today.getUTCMonth() + 1 < 10 ? "0" + (today.getUTCMonth() + 1) : today.getUTCMonth) + '-' + (today.getUTCDate() < 10 ? "0" + today.getUTCDate() : today.getUTCDate())
                return (
                    <Flex key={index} direction={'row'} justify={'space-between'} align={'center'}>
                        <Image src={`/plot_${item.land_type}.webp`} width={16} alt="Plot" />
                        <Text ml={4}>{item.name}:</Text>
                        <Text ml={6}>{item.plotData != undefined ? item.plotData.filter(obj => obj.created_at.startsWith(toDate)).reduce(function (sum, item) {
                            return sum + item.amount
                        }, 0) / 1000 : "Getting Data"}</Text>
                        <Text> / {item.land_type == 0 ? 16 : item.land_type == 1 ? 52 : item.land_type == 2 ? 148 : item.land_type == 3 ? 328 : 6540}</Text>
                    </Flex>
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
            <>{amount} / {total} ({Math.round( amount / total * 10000 ) / 100 }%)</>
            <>{renderPlot()}</>
        </>
    )
}