import { useState, useEffect } from 'react'
import { Flex, VStack, Switch, FormLabel } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Detail from '@/components/Detail/Detail/Detail'
import Quest from '@/components/Detail/Quest/Quest'

export default function AppDetail() {
    const [flag, setFlag] = useState(false)
    const [accounts, setAccounts] = useState()

    useEffect(()=>{
        let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
        setAccounts(accounts)
    },[])

    const renderAccount = () => {
        if (accounts != undefined && accounts.length > 0) {
            let renderItems = accounts.map((account, index) => {
                return (
                    <Flex key={index} direction={'column'} justify={'center'} align={'center'}>
                        <Flex direction={'row'} justify={'center'}>
                            <FormLabel color={'white'} mr={2}>Detail</FormLabel>
                            <Switch onChange={() => {
                                setFlag(!flag)
                            }} />
                            <FormLabel ml={2} color={'white'}>Quest</FormLabel>
                        </Flex>

                        <Flex display={flag ? "none" : "unset"}>
                            <Detail key={index} account={account} />
                        </Flex>

                        <Flex display={!flag ? "none" : "unset"}>
                            <Quest key={index} account={account} />
                        </Flex>
                    </Flex>
                )
            })
            return renderItems
        }
    }

    return (
        <VStack w={'100%'} flexDirection={'column'} spacing={4}>
            <>{renderAccount()}</>
            123
        </VStack>
    )
}