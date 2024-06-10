import axios from "axios"
import { useEffect, useState } from "react"
import { Flex, Grid } from '@chakra-ui/react'
import Item from "./Item"

export default function Leaderboard(props) {

    const [account, setAccount] = useState(props.account)
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.post('/api/getPlots', { account }).then(async (response) => {
                let data = response.data
                if (data.success) {
                    try {
                        await axios.post('/api/leaderboard/me', { account, plots: data.plots }).then(async (response) => {
                            let leaderboardData = response.data
                            if (leaderboardData.success) {
                                for (let i = 0; i < leaderboardData.data.length; i++) {
                                    for (let j = 0; j < data.plots.length; j++) {
                                        if (data.plots[j].id == leaderboardData.data[i].plot_id) {
                                            data.plots[j].point = leaderboardData.data[i].point
                                            data.plots[j].rank = leaderboardData.data[i].rank

                                        }
                                    }
                                }
                                setItems(data.plots)
                            }
                        })
                    }
                    catch {

                    }
                }
            })
        }

        if (account.display == undefined || account.display == true) {
            fetchData()
        }

    }, [account])


    const renderLB = () => {
        let renderItem = items.map((item, index) => {
            console.log(item)
            if (item.point) {
                return (
                    <Flex key={index}>
                        <Item item={item} />
                    </Flex>
                )
            }
        })
        return renderItem
    }

    return (

        // TODO: Make a better loading ^_^
        <>
            <Flex mt={4} direction={'column'}>
                <>{renderLB()}</>
            </Flex>
        </>
    )
}