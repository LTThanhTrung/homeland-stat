import { Flex } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Detail from './Detail/Detail'

export default function AppDetail() {
    let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))

    const renderAccount = () => {
        if (accounts != undefined && accounts.length > 0) {
            let renderItems = accounts.map((account, index) => {
                return (
                    <Detail key={index} account={account} />
                )
            })
            return renderItems
        }
    }

    return (
        <Flex w={'100%'} flexDirection={'column'}>
            <>{renderAccount()}</>
        </Flex>
    )
}