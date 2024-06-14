import axios from "axios"
import { useEffect, useState } from "react"
import { Flex, Grid } from '@chakra-ui/react'
import Plot from "../Plot/Plot"
import { GameConfig, formatDate } from "@/utils/tools"
import QuestItem from "./QuestItem"

export default function Quest(props) {

    const [quests, setQuests] = useState()
    const [account, setAccount] = useState(props.account)
    const today = formatDate(new Date())

    useEffect(() => {
        const fetchData = async () => {
            await axios.post('/api/getPlots', { account }).then(async (response) => {
                let data = response.data
                if (data.success) {
                    /* Get plots by accounts, then render plotData */
                    let plotsItem = data.plots
                    plotsItem.map((item) => item.loaded = false)
                    let filteredArray = plotsItem.filter(e => e.steward == undefined);
                    plotsItem = filteredArray

                    for (let i = 0; i < plotsItem.length; i++) {
                        let obj = plotsItem[i]
                        let questData = (await axios.post('/api/getQuest', { account, plotData: obj })).data
                        if (questData.success) {
                            plotsItem[i].quests = questData
                        }
                    }

                    setQuests(plotsItem)
                }
            })
        }

        if (account.display == undefined || account.display == true) {
            fetchData()
        }

    }, [account])

    useEffect(() => { }, [quests])

    const renderQuest = () => {
        if (quests != undefined && (account.display == true || account.display == undefined)) {
            let renderItem = quests.map((item, index) => {
                return (
                    <QuestItem item={item} account={account} key={index} />
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
                <Grid w={'100%'} templateColumns='repeat(4, 1fr)' gap={6}>
                    <>{renderQuest()}</>
                </Grid>
            </Flex>
        </>
    )
}