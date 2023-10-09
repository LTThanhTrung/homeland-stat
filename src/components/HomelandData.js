import {  Flex, } from '@chakra-ui/react'
import AccountData from "./AccountData";

export default function HomelandData(props) {
    const accounts = props.accounts

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