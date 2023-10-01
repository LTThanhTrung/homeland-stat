import { Heading, Button, Flex, useColorMode, Input, VStack } from '@chakra-ui/react'
import { uuid } from 'uuidv4'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef, } from 'react'
import { StorageItem } from '@/utils/tools'
import { SunIcon } from '@chakra-ui/icons'
import HomelandData from '@/components/HomelandData'
import crypto from 'crypto'
import axios from 'axios'
import Header from '@/components/Header'

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const login = async () => {
        let data = (await axios.post('/api/login', { email: email, password: password })).data
        if (data.success) {
            let storageItem = await JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
            storageItem = upsert(storageItem, data.data)
            await localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(storageItem))
            router.push('/')
        }
        else {
            alert(data.error)
        }
    }

    const upsert = (array, item) => {
        if (array == null) array = []
        const i = array.findIndex(_item => _item.userID == item.userID)
        if (i > -1) array[i] = item
        else array.push(item)
        return array
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
            <Header />
            <Flex height={'100%'} width={'100%'} align={'center'} direction={'column'}>
                <Flex direction={'row'} align={'center'} mt={12}>
                    <Heading mr={4}>Login</Heading>
                </Flex>
                <Flex direction={'column'} height={'100%'} mt={16} >
                    <VStack spacing={4}>
                        <Input width={300} placeholder='MavisHub Email' onChange={handleEmail} />
                        <Input width={300} placeholder='Password' type='password' onChange={handlePassword} />
                        <Button colorScheme={'teal'} onClick={login} width={300}>Login</Button>
                    </VStack>
                </Flex>
            </Flex>
        </>
    )
}