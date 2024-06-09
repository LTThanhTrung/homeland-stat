import { VStack } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Summary from './Summary/Summary';
import { useEffect, useState } from 'react'

export default function AppSummary() {
    const [account, setAccount] = useState()

    useEffect(() => {
        let account = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
        setAccount(account)
    }, [])

    const renderAccount = () => {
        if (account != undefined) {
            return (
                <Summary account={account} />
            )
        }
    }

    return (
        <VStack w={'100%'} flexDirection={'column'} spacing={4}>
            <>{renderAccount()}</>
        </VStack>
    )
}