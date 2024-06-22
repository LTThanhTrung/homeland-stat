import axios from "axios"
import { useEffect, useState } from "react"
import { Flex, Grid } from '@chakra-ui/react'
import QuestItem from "./QuestItem"

export default function Quest(props) {

    const [quests, setQuests] = useState()
    const [account, setAccount] = useState(props.account)
    const [tags, setTags] = useState([])

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
                    <Flex w={'100%'} key={index}>
                        <QuestItem item={item} account={account} tags={tags} setTags={setTags} />
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
        // TODO: Make a better loading ^_^
        <>
            <Flex mt={4} w={'100%'}>
                <Grid w={'100%'} templateColumns='repeat(auto-fill,minmax(400px,1fr))' gap={'16px'}>
                    <>{renderQuest()}</>
                </Grid>
            </Flex>
        </>
    )
}