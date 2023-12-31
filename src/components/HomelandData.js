import {  Flex, } from '@chakra-ui/react'
import AccountData from "./AccountData";
import { StorageItem } from '@/utils/tools'

export default function HomelandData(props) {
    let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))

    const renderAccount = () => {
        if(accounts != undefined && accounts.length > 0){
            let renderItems = accounts.map((account, index) =>{
                return(
                    <AccountData key={index} account={account}/>
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