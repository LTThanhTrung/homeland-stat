import { VStack } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Leaderboard from './Leaderboard/Leaderboard'
import LbOverall from './LbOverall/LbOverall'

export default function AppLeaderboard() {
    let account = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))

    const renderAccount = () => {
        if (account != undefined ) {
            return (
                <Leaderboard  account={account} />
            )
        }
    }

    return (
        <VStack w={'100%'} flexDirection={'column'} spacing={4}>
            <LbOverall account={account}/>
            <>{renderAccount()}</>
        </VStack>
    )
}