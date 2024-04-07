import axios from "axios"
import { useEffect, useState } from "react"
import { Flex, Grid } from '@chakra-ui/react'
import Plot from "../Plot/Plot"
import { GameConfig } from "@/utils/tools"

export default function Detail(props) {

    const [plots, setPlots] = useState()
    const [account, setAccount] = useState(props.account)

    useEffect(() => {
        const fetchData = async () => {
            await axios.post('/api/getPlots', { account }).then(async (response) => {
                let data = response.data
                if (data.success) {
                    /* Get plots by accounts, then render plotData */
                    let plotsItem = data.plots
                    plotsItem.map((item) => item.loaded = false)

                    // Sort if plot is played by steward or by self
                    await plotsItem.sort(function (a, b) {
                        if (a.steward == undefined && b.steward == undefined) {
                            return parseInt(b.land_type) - parseInt(a.land_type)
                        }

                        if (a.steward == undefined) return -1
                        if (b.steward == undefined) return 1
                        return parseInt(b.land_type) - parseInt(a.land_type)
                    })

                    setPlots(plotsItem)


                    for (let i = 0; i < plotsItem.length; i++) {
                        let obj = plotsItem[i]
                        let plotData = (await axios.post('/api/getPlotDetail', { account, plotData: obj })).data
                        if (plotData.success) {
                            plotsItem[i].moonfall = 0
                            let data = plotData.data
                            let filteredData = data.filter((e) => !(GameConfig.moonfall_action_id.includes(e.from_action)))
                            if(filteredData.length != data.length) plotsItem[i].moonfall = 1
                            plotsItem[i].plotData = filteredData
                            plotsItem[i].loaded = true
                            let x = [...plotsItem]
                            setPlots(x)
                        }
                    }
                }
            })
        }

        if (account.display == undefined || account.display == true) {
            fetchData()
        }

    }, [account])

    useEffect(() => { }, [plots])

    const renderPlot = () => {
        if (plots != undefined && (account.display == true || account.display == undefined)) {
            let renderItem = plots.map((item, index) => {
                return (
                    <Plot key={index} item={item} account={account} />
                )
            })
            return renderItem
        }
        else {
            return
        }
    }

    return (
        // TODO: Make a better loading ^_^
        <>
            <Flex mt={4}>
                <Grid w={'100%'} templateColumns='repeat(5, 1fr)' gap={6}>
                    <>{renderPlot()}</>
                </Grid>
            </Flex>
        </>
    )
}