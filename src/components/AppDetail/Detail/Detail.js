import axios from "axios"
import { useEffect, useState } from "react"
import { Flex, Grid } from '@chakra-ui/react'
import Plot from "../Plot/Plot"

export default function Detail(props) {

    const [loading, setLoading] = useState(true)
    const [plots, setPlots] = useState()
    const [account, setAccount] = useState(props.account)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios.post('/api/getPlots', { account }).then(async (response) => {
                let data = response.data
                if (data.success) {
                    /* Get plots by accounts, then render plotData */
                    let plots = data.plots

                    await plots.sort(function (a, b) { return parseInt(b.land_type) - parseInt(a.land_type) })

                    // Sort if plot is played by steward or by self
                    await plots.sort(function (a, b) {  
                        if(a.steward == undefined && b.steward == undefined){
                            return parseInt(b.land_type) - parseInt(a.land_type)
                        }
                        
                        if(a.steward == undefined){
                            return -1
                        }

                        if(b.steward == undefined){
                            return 1
                        }

                        return parseInt(b.land_type) - parseInt(a.land_type)

                        // return parseInt(b.steward.assignee_id) - parseInt(a.steward.assignee_id) 
                    })

                    for (let i = 0; i < plots.length; i++) {
                        let obj = plots[i]
                        let plotData = (await axios.post('/api/getPlotDetail', { account, plotData: obj })).data
                        if (plotData.success) {
                            plots[i].plotData = plotData.data
                        }
                    }
                    setPlots(plots)
                    setLoading(false)
                }
            })
        }

        if (account.display == undefined || account.display == true) {
            fetchData()
        }

    }, [account])

    const renderPlot = () => {
        if (plots != undefined && (account.display == true || account.display == undefined)) {
            let renderItem = plots.map((item, index) => {
                return (
                    <Plot key={index} item={item} />
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
                {loading ?
                    <>Loading data</> :
                    <Grid w={'100%'} templateColumns='repeat(5, 1fr)' gap={6}>
                        <>{renderPlot()}</>
                    </Grid>
                }
            </Flex>
        </>
    )
}