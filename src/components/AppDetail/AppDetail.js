import { Flex, VStack, Switch, FormLabel, HStack } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Detail from './Detail/Detail'
import { useState } from 'react'

export default function AppDetail() {
    let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
    const [flag, setFlag] = useState(false)

    const renderAccount = () => {
        if (accounts != undefined && accounts.length > 0) {
            let renderItems = accounts.map((account, index) => {
                return (
                    <Flex key={index} direction={'column'} justify={'center'} align={'center'}>
                        <Flex direction={'row'} justify={'center'}>
                            <FormLabel color={'white'} mr={2}>Detail</FormLabel>
                            <Switch onChange={() => {
                                setFlag(!flag)
                            }}/>
                            <FormLabel ml={2} color={'white'}>Quest</FormLabel>
                        </Flex>

                        <Flex display={flag ? "none" : "unset"}>
                            <Detail key={index} account={account} />
                        </Flex>
                        <Flex display={!flag ? "none" : "unset"}>123</Flex>

                    </Flex>
                )
            })
            return renderItems
        }
    }

    return (
        <VStack w={'100%'} flexDirection={'column'} spacing={4}>
            <>{renderAccount()}</>
        </VStack>
    )
}