import axios from "axios"
import { useEffect, useState } from "react"
import { Text, Flex, Grid, Box } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import PlotData from "./PlotData"
import { StorageItem } from "@/utils/tools"

export default function AccountData(props) {

    const [plots, setPlots] = useState()
    const [amount, setAmount] = useState(0)
    const [total, setTotal] = useState(0)
    const [account, setAccount] = useState(props.account)

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
                        setPlots(plots)
                    }
                    // setPlots(plots)
                    setAmount(amount / 1000)
                    setTotal(total)
                }
            })
        }
        
        if(account.display == undefined || account.display == true){
            console.log(account.display)
            fetchData()
        }

    }, [account])

    const renderPlot = () => {
        if (plots != undefined && (account.display == true || account.display == undefined)) {
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

    const handleViewClick = async () => {
        let temp = (account.display == undefined || account.display == true)

        setAccount(prevState => ({
            ...prevState,
            display: !temp
        }))

        let accounts = JSON.parse(await localStorage.getItem(StorageItem.ACCOUNTS_DATA))
        let index = accounts.findIndex(obj => obj.userID == account.userID)
        if(index != -1){
            accounts[index].display = !temp
        }
        
        await localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(accounts))
        console.log(accounts)
    }

    return (
        <>
            <Flex flexDirection={'row'} align={'flex-end'} textAlign={'end'} mt={4} w={['100%', '100%', 'auto', 'auto']}>
                <Flex w={8} h={8} justify={'center'} align={'center'} borderWidth={1} borderRadius={100} mr={4} cursor={'pointer'} onClick={handleViewClick}>
                    {(account.display == undefined || account.display == true) ? <ViewIcon alignSelf={'center'} /> :<ViewOffIcon alignSelf={'center'} />}
                </Flex>
                <Text fontSize={24} fontWeight={'extrabold'} mr={4}>{account.name}</Text>
                <Text fontWeight={'bold'} mr={4}>{amount} / {total}</Text>
                <Text>{Math.floor(amount * 100 * 100 / total) / 100}%</Text>
            </Flex>

            <Flex mt={4}>
                <Grid w={'100%'} templateColumns='repeat(5, 1fr)' gap={6}>
                    <>{renderPlot()}</>
                </Grid>
            </Flex>
        </>
    )
}