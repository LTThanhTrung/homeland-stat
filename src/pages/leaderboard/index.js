import { useState, useEffect } from 'react'
import { VStack } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Leaderboard from '@/components/Leaderboard/Leaderboard/Leaderboard'
import LbOverall from '@/components/Leaderboard/LbOverall/LbOverall'

export default function AppLeaderboard() {
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
        setAccounts(accounts)
    }, [])

    const renderAccount = () => {
        if (accounts != undefined && accounts.length > 0) {
            let renderItems = accounts.map((account, index) => {
                return (
                    <Leaderboard key={index} account={account} />
                )
            })
            return renderItems
        }
    }

    return (
        <VStack w={'100%'} flexDirection={'column'} spacing={4}>
            {accounts != null  && accounts.length > 0 ? <>
                <LbOverall account={accounts[0]} />
            </> : <></>}
            <>{renderAccount()}</>
        </VStack>
    )
}