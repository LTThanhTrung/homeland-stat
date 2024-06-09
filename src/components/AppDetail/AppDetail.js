import { VStack } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Detail from './Detail/Detail'

export default function AppDetail() {
    let account = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))

    const renderAccount = () => {
        if (account != undefined) {
            return (
                <Detail account={account} />
            )
        }
    }

    return (
        <VStack w={'100%'} flexDirection={'column'} spacing={4}>
            <>{renderAccount()}</>
        </VStack>
    )
}