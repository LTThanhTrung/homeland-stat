import { useState, useEffect } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import { StorageItem } from '@/utils/tools'
import Summary from '@/components/Summary/Summary';

export default function AppSummary() {
  const [accounts, setAccounts] = useState()

  useEffect(() => {
    let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
    setAccounts(accounts)
  }, [])

  const renderAccount = () => {
    if (accounts != undefined && accounts.length > 0) {
      let renderItems = accounts.map((account, index) => {
        return (
          <Summary key={index} account={account} />
        )
      })
      return renderItems
    }
    return (<Text color={'white'}>Please login</Text>)

  }

  return (
    <VStack w={'100%'} flexDirection={'column'} spacing={4}>
      <>{renderAccount()}</>
    </VStack>
  )
}