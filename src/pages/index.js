import { Heading, Button, Flex, HStack, Tabs, Tab, TabPanels, TabPanel, TabList, Text, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { StorageItem } from '@/utils/tools'
import packageInfo from '../../package.json';

import AppSummary from '@/components/AppSummary/AppSummary'
import AppDetail from '@/components/AppDetail/AppDetail'
import AppLeaderboard from '@/components/AppLeaderboard/AppLeaderboard'

import axios from 'axios'
import Header from '@/components/Header'
import Account from '@/components/Account'
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter()
  const [account, setAccount] = useState([])
  const [price, setPrice] = useState()

  useEffect(() => {
    const getItemsFromStorage = async () => {
      let account = await JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))

      // To clear previous accounts
      // Remove in a few patches
      if (Array.isArray(account)) {
        localStorage.clear()
        router.push("/login")
      }

      let now = new Date().getTime()

      if (account == "" || account == null || account == undefined) {
        router.push('/login')
        return
      }

      if (now > new Date(account.accessTokenExpiresAt).getTime()) {
        let tokenData = await refreshToken(account.refreshToken)
        if (tokenData) {
          account = upsert(account, tokenData)
          localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(account))
        }
      }

      let x = await axios.get('/api/getAXSPrice')
      setPrice(x.data.data.usd)
      setAccount(account)
    }

    getItemsFromStorage()
  }, [])

  const refreshToken = async (refreshToken) => {
    let data = (await axios.post('/api/refresh', { refreshToken: refreshToken })).data
    if (data.success) {
      return data.data
    }
  }

  const upsert = (array, item) => {
    if (array == null) array = []
    let i = array.findIndex(_item => _item.userID == item.userID)
    if (i > -1) array[i] = item
    else array.push(item)
    return array
  }



  return (
    <Flex w={'100%'} h={'100%'} direction={'column'} pb={20}>
      <Header />
      <Flex height={'100%'} width={'100%'} align={'center'} direction={'column'} bg='gray.800' color={'white'} pb={20} marginBottom={20}>
        <Flex direction={'row'} align={'center'} w={'100%'} justify={'space-between'} padding={8}>
          <Heading mr={4}>Homeland Stats {packageInfo.version}  </Heading>
          
          <HStack alignSelf={'flex-end'} right={12} justify={'center'} align={'center'} spacing={4}>
            <Image src="axs-logo-small.png" w={12} />
            <Text fontWeight={'bold'}> {price} USD</Text>
            <Button
              colorScheme={'blue'}
              onClick={() => {
                localStorage.clear()
                router.push('/login')
              }}>Log out</Button>
          </HStack>
        </Flex>

        <Tabs isLazy w={'1376px'}>
          <TabList borderColor={'whiteAlpha.300'}>
            <Flex flexDirection={'row'} align={'flex-end'} textAlign={'end'} mt={4} w={['100%', '100%', 'auto', 'auto']}>
              <Tab>Summary</Tab>
              <Tab>Details</Tab>
              <Tab>Leaderboard</Tab>
              <Tab>Stewards Performance</Tab>
            </Flex>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex direction={'column'} h={'100%'} w={['100%', '100%', 'auto', 'auto']} >
                <AppSummary />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={'column'} h={'100%'} w={['100%', '100%', 'auto', 'auto']} pb={20}>
                <AppDetail />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={'column'} h={'100%'} w={['100%', '100%', 'auto', 'auto']} position={'relative'} pb={20}>
                <AppLeaderboard />
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
      <Footer />
    </Flex>
  )
}