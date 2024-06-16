import { useEffect, useState } from "react"
import { Flex, Grid } from '@chakra-ui/react'
import axios from "axios"
import Pagination from "./Pagination"
import Item from "../Leaderboard/Item"

export default function LbOverall(props) {
    const [account, setAccount] = useState(props.account)
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        if (account.display == undefined || account.display == true) {
            fetchData(page)
        }

    }, [account])

    const fetchData = async (offset) => {
        await axios.post('/api/leaderboard/overall', { account, offset: offset * 100 }).then(async (response) => {
            let data = response.data
            if (data.success) {
                setTotal(Math.ceil(data.data.total / 100))
                setItems(data.data.data)
            }
        })
    }

    const renderLB = () => {
        let renderItem = items.map((item, index) => {
            return (
                <Flex key={index}>
                    <Item item={item} />
                </Flex>
            )
        })
        return renderItem
    }

    return (
        <>
            <Flex mt={4} flexDirection={'column'} align={'center'} color={'white'}>
                <>{renderLB()}</>
                <Pagination page={page} total={total} setPage={setPage} fetchData={fetchData} />
            </Flex>
        </>
    )
}