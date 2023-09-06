import Head from 'next/head'
import { Heading, Button, Flex, useColorMode, Input, VStack } from '@chakra-ui/react'
import { uuid } from 'uuidv4'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef, } from 'react'
import { StorageItem } from '@/utils/tools'
import { SunIcon } from '@chakra-ui/icons'
import HomelandData from '@/components/HomelandData'
import crypto from 'crypto'
import axios from 'axios'

export default function Home() {
  const router = useRouter()
  const { toggleColorMode } = useColorMode()
  const [accessToken, setAccessToken] = useState()
  const [userData, setUserData] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    const getItemsFromStorage = async () => {
      let accessToken = await JSON.parse(localStorage.getItem(StorageItem.ACCESS_TOKEN))
      setAccessToken(accessToken)
    }

    getItemsFromStorage()
  }, [])

  useEffect(() => { }, [accessToken])

  const login = async () => {
    let data = (await axios.post('/api/login', { email: email, password: password })).data
    if (data.success) {
      let accessToken = data.accessToken
      setAccessToken(accessToken)
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    let value = e.target.value
    let hash = crypto.createHash('sha256')
    let originalValue = hash.update(value, 'utf-8')
    let hashValue = originalValue.digest('hex')
    setPassword(hashValue)
  }

  return (
    <>
      <Head>
        <title>Homeland Stats</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex height={'100%'} width={'100%'} align={'center'} direction={'column'}>
        <Flex direction={'row'} align={'center'} mt={12}>
          <Heading mr={4}>Homeland Stats</Heading>
          <SunIcon onClick={toggleColorMode} cursor={'pointer'} />
        </Flex>
        <Flex direction={'column'} height={'100%'} mt={16} >
          {(accessToken) ?
            <HomelandData accessToken={accessToken} />
            :
            <VStack spacing={4}>
              <Input width={300} placeholder='email' onChange={handleEmail} />
              <Input width={300} placeholder='password' type='password' onChange={handlePassword} />
              <Button colorScheme={'teal'} onClick={login} width={300}>Login</Button>
            </VStack>
          }
        </Flex>
      </Flex>
    </>
  )
}