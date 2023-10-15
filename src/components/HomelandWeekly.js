import {  Flex } from '@chakra-ui/react'
import AccountWeekly from './AccountWeekly'
import { StorageItem } from '@/utils/tools'

export default function HomelandWeekly(props) {
    let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))

    const renderAccount = () => {
        if(accounts != undefined && accounts.length > 0){
            let renderItems = accounts.map((account, index) =>{
                return(
                    <AccountWeekly key={index} account={account}/>
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