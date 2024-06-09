import { Heading, Button, Flex, useColorMode, Input, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState, } from 'react'
import { StorageItem } from '@/utils/tools'
import crypto from 'crypto'
import axios from 'axios'
import Header from '@/components/Header'
import Captcha from '@/components/Captcha'

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [captcha, setCaptcha] = useState('')

    const login = async () => {
        if (captcha == '') {
            alert('Please do Captcha :_:')
            return;
        }

        let data = (await axios.post('/api/login', { email: email, password: password, captcha: captcha })).data

        if (data.success) {
            await localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(data.data))
            router.push('/')
        }
        else {
            alert(data.error)
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
            <Header />
            <Flex height={'100%'} width={'100%'} align={'center'} direction={'column'} backgroundColor={'gray.800'} color={'white'}>
                <Flex direction={'row'} align={'center'} mt={12}>
                    <Heading mr={4}>Login</Heading>
                </Flex>
                <Flex direction={'column'} height={'100%'} mt={16} >
                    <VStack spacing={4} mb={10}>
                        <Input width={300} placeholder='MavisHub Email' onChange={handleEmail} />
                        <Input width={300} placeholder='Password' type='password' onChange={handlePassword} />
                        <Button colorScheme={'teal'} onClick={login} width={300}>Login</Button>
                    </VStack>

                    <Captcha setCaptcha={setCaptcha} />

                </Flex>
            </Flex>
        </>
    )
}