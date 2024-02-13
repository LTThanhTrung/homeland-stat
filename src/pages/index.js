import { Heading, Button, Flex, HStack, Tabs, Tab, TabPanels, TabPanel, TabList } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { StorageItem } from '@/utils/tools'

import AppSummary from '@/components/AppSummary/AppSummary'
import AppDetail from '@/components/AppDetail/AppDetail'

import axios from 'axios'
import Header from '@/components/Header'
import Account from '@/components/Account'

export default function Home() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState()
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    const getItemsFromStorage = async () => {
      let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
      let now = new Date().getTime()

      if (accounts == "" || accounts == null || accounts == undefined || accounts.length == 0) {
        router.push('/login')
        return
      }

      for (let i = 0; i < accounts.length; i++) {
        if (now > new Date(accounts[i].accessTokenExpiresAt).getTime()) {
          let tokenData = await refreshToken(accounts[i].refreshToken)
          accounts = upsert(accounts, tokenData)
          localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(accounts))
        }
      }

      setAccounts(accounts)
    }

    getItemsFromStorage()
  }, [])

  useEffect(() => { }, [accessToken])

  const refreshToken = async (refreshToken) => {
    let data = (await axios.post('/api/refresh', { refreshToken: refreshToken })).data
    if (data.success) {
      return data.data
    }
  }


  const upsert = (array, item) => {
    if (array == null) array = []
    const i = array.findIndex(_item => _item.userID == item.userID)
    if (i > -1) array[i] = item
    else array.push(item)
    return array
  }

  const renderAccount = () => {
    if (accounts.length > 0) {
      let renderItems = accounts.map((account, index) => {
        return (
          <>
            <Account account={account} key={index} />
          </>
        )
      })

      return renderItems
    }
  }

  return (
    <>
      <Header />
      <Flex height={'100%'} width={'100%'} align={'center'} direction={'column'} bg='gray.800' color={'white'}>
        <Flex direction={'row'} align={'center'} w={'100%'} justify={'space-between'} padding={8}>
          <Heading mr={4}>Homeland Stats 2.0.0  </Heading>
          <HStack alignSelf={'flex-end'} right={12} justify={'center'} align={'center'} spacing={4}>
            <Flex flexDirection={'row'} width={96} overflow={'auto'} whiteSpace={'nowrap'} pt={2}>
              <Flex marginLeft={'auto'}>
                {renderAccount()}
              </Flex>
            </Flex>
            <Button
              colorScheme={'blue'}
              onClick={() => {
                router.push('/login')
              }}>Login</Button>
            <Button onClick={() => {
              localStorage.clear()
              setAccounts([])
            }}>Log out</Button>
          </HStack>
        </Flex>

        <Tabs isLazy w={'1376px'}>
          <TabList borderColor={'whiteAlpha.300'}>
            <Flex flexDirection={'row'} align={'flex-end'} textAlign={'end'} mt={4} w={['100%', '100%', 'auto', 'auto']}>
              <Tab>Summary</Tab>
              <Tab>Details</Tab>
              <Tab>Stewards Performance</Tab>
            </Flex>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex direction={'column'} h={'100%'} w={['100%', '100%', 'auto', 'auto']} >
                {accounts.length > 0 ? <AppSummary /> : <></>}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={'column'} h={'100%'} w={['100%', '100%', 'auto', 'auto']} >
                {accounts.length > 0 ? <AppDetail /> : <></>}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={'column'} h={'100%'} w={['100%', '100%', 'auto', 'auto']} >
                Coming Soon&#8482; when Cream is less lazy
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  )
}