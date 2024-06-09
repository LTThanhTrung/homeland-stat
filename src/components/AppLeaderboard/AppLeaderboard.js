import { VStack } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Leaderboard from './Leaderboard/Leaderboard'
import LbOverall from './LbOverall/LbOverall'

export default function AppLeaderboard() {
    let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))

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
            <LbOverall account={accounts[0]}/>
            <>{renderAccount()}</>
        </VStack>
    )
}