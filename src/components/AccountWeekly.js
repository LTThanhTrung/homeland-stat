import axios from "axios"
import { useEffect, useState } from "react"
import { Text, Flex } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { StorageItem, PlotDetail } from "@/utils/tools"
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

export default function AccountWeekly(props) {

    const [amount, setAmount] = useState(0)
    const [total, setTotal] = useState(0)
    const [account, setAccount] = useState(props.account)
    const [data, setData] = useState([])

    let accessToken = account.accessToken
    let userID = account.userID

    useEffect(() => {
        const fetchData = async () => {
            let amount = 0
            let moonfall = 0
            let total = 0

            await axios.post('/api/getPlots', { account }).then(async (response) => {
                let data = response.data
                let rewardsData = []
                if (data.success) {
                    /* Get plots by accounts, then render plotData */
                    let plots = data.plots
                    plots.sort(function (a, b) { return parseInt(b.land_type) - parseInt(a.land_type) })

                    for (let i = 0; i < plots.length; i++) {
                        let obj = plots[i]
                        let plotData = (await axios.post('/api/getPlotWeekly', { account, plotData: obj })).data

                        if (plotData.success) {
                            plots[i].plotData = plotData.data
                            plotData.data.sort(function(a, b) {
                                return new Date(a.created_at) - new Date(b.created_at);
                            });

                            for(let j = 0 ; j < plotData.data.length ; j++){
                                let year = new Date().getFullYear()
                                let key = plotData.data[j].created_at.replace('T00:00:00', '').replace(year + "-", "")
                                if(rewardsData[key] == undefined){
                                    rewardsData[key] = {
                                        dailyAXS : 0,
                                        moonfall : 0
                                    }
                                }
                                rewardsData[key].dailyAXS += plotData.data[j].from_action == 94 ? 0 : plotData.data[j].amount
                                rewardsData[key].moonfall += plotData.data[j].from_action == 94 ? plotData.data[j].amount : 0
                            }
                            
                            amount += plotData.data.filter(item => item.from_action != 94).reduce(function (sum, item) {
                                return sum + item.amount
                            }, 0)

                            moonfall +=  plotData.data.filter(item => item.from_action == 94).reduce(function (sum, item) {
                                return sum + item.amount
                            }, 0)

                            total += PlotDetail[plots[i].land_type].dailyAXS * 7
                        }
                    }

                    let keys = Object.keys(rewardsData)
                    let weeklyData = []

                    for(let i = 0; i < keys.length ; i++){
                        let obj = {
                            name : keys[i],
                            dailyAXS : rewardsData[keys[i]].dailyAXS,
                            dailyAXSPercent: rewardsData[keys[i]].dailyAXS / (total / 7) / 1000 * 100,
                            moonfall : rewardsData[keys[i]].moonfall,
                            moonfallPercent: rewardsData[keys[i]].moonfall / (5330) / 1000 * 100
                        }
                        weeklyData.push(obj)
                    }
                 
                    setData(weeklyData)
                    setAmount(amount / 1000)
                    setTotal(total)
                }
            })
        }

        if (account.display == undefined || account.display == true) {
            fetchData()
        }
    }, [account])

    const renderChart = () => {
        if ((account.display == true || account.display == undefined)) {
            return (
                <Flex mt={4}>
                    <LineChart width={730} height={250} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type='linear' dataKey="dailyAXSPercent" stroke="#8884d8" name="daily mAXS" />
                        <Line type="linear" dataKey="moonfallPercent" stroke="#82ca9d" name="moonfall" />
                    </LineChart>
                </Flex>
            )
        }
        else {
            return
        }
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`mAXS: ${payload[0].payload.dailyAXS / 1000}`}</p>
              <p className="label">{`moonfall: ${payload[0].payload.moonfall / 1000}`}</p>
            </div>
          );
        }
        return null;
      };

    const handleViewClick = async () => {
        let temp = (account.display == undefined || account.display == true)

        setAccount(prevState => ({
            ...prevState,
            display: !temp
        }))

        let accounts = JSON.parse(await localStorage.getItem(StorageItem.ACCOUNTS_DATA))
        let index = accounts.findIndex(obj => obj.userID == account.userID)
        if (index != -1) {
            accounts[index].display = !temp
        }
        await localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(accounts))
    }

    return (
        <>
            <Flex flexDirection={'row'} align={'flex-end'} textAlign={'end'} mt={4} w={['100%', '100%', 'auto', 'auto']}>
                <Flex w={8} h={8} justify={'center'} align={'center'} borderWidth={1} borderRadius={100} mr={4} cursor={'pointer'} onClick={handleViewClick}>
                    {(account.display == undefined || account.display == true) ? <ViewIcon alignSelf={'center'} /> : <ViewOffIcon alignSelf={'center'} />}
                </Flex>
                <Text fontSize={24} fontWeight={'extrabold'} mr={4}>{account.name}</Text>
                <Text fontWeight={'bold'} mr={4}>{amount} / {total}</Text>
                <Text>{Math.floor(amount * 100 * 100 / total) / 100}%</Text>
            </Flex>
            {renderChart()}
        </>
    )
}