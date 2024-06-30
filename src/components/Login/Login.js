import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    Flex,
    VStack,
    Text,
    Input,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import crypto from 'crypto'
import axios from 'axios'
import { StorageItem, upsert } from '@/utils/tools'

import Captcha from './Captcha'
import Auth2FA from './Auth2FA'

export default function Login({ close }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [captcha, setCaptcha] = useState('')
    const [mfaToken, setmfaToken] = useState('')
    const [error, setError] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    useEffect(() => {
        if (captcha != "") {
            onClose()
            login()
        }
    }, [captcha])

    useEffect(() => {
        console.log(error)
    }, [error])

    const handlePassword = (e) => {
        let value = e.target.value
        let hash = crypto.createHash('sha256')
        let originalValue = hash.update(value, 'utf-8')
        let hashValue = originalValue.digest('hex')
        setPassword(hashValue)
    }

    const login = async () => {
        let data = (await axios.post('/api/login', { email: email, password: password, captcha: captcha })).data
        if (data.success) {
            let storageItem = await JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
            storageItem = upsert(storageItem, data.data)
            await localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(storageItem))
            close()
            router.reload()
        }
        else {
            if (data.error.error == 400025) { // 2FA required
                setmfaToken(data.error.error_details.mfaToken)
                onClose()
            }
            else {
                if(data.error.error_message){
                    setError(data.error.error_message)
                }
                else{
                    setError(data.error)
                }
                onClose()
            }
        }
    }

    return (
        <Flex height={'100%'} width={'100%'} align={'center'} direction={'column'} backgroundColor={'gray.800'} color={'white'}>
            <Flex direction={'column'} height={'100%'} mt={16} >
                {mfaToken == '' ?
                    <>
                        <VStack spacing={4} mb={10}>
                            <Input width={300} placeholder='MavisHub Email' onChange={handleEmail} />
                            <Input width={300} placeholder='Password' type='password' onChange={handlePassword} />
                            <Button colorScheme={'teal'} onClick={onOpen} width={300}>Login</Button>
                        </VStack>

                        {error != "" ?
                            <Text color={'red.400'}>{error}</Text> :
                            <></>
                        }

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent minW={800} bg={'#15181e'}>
                                <ModalCloseButton color={'white'} />
                                <ModalBody>
                                    <Captcha setCaptcha={setCaptcha} setmfaToken={setmfaToken} onClose={onClose} setError={setError} />
                                </ModalBody>
                            </ModalContent>
                        </Modal></> :
                    <>
                        <Auth2FA mfaToken={mfaToken} setmfaToken={setmfaToken} />
                    </>}
            </Flex>
        </Flex>
    )
}