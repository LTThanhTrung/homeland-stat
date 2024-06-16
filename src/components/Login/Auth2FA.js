import { Input, Button, Flex, Text, Heading, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import { StorageItem, upsert } from '@/utils/tools'

export default function Auth2FA({ setmfaToken, mfaToken }) {
    const router = useRouter()
    const [code2FA, setCode2FA] = useState("")
    const [err, setErr] = useState("")

    const verify = async () => {
        const payload = {
            "token": mfaToken,
            "passcode": code2FA,
            "challenge": ""
        }

        await axios.post("/api/mfa", payload).then(async (response) => {
            let data = response.data
            if (data.success == false) {
                setErr(response.data.error.error_message)
            }
            if (data.success == true) {
                let storageItem = await JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
                storageItem = upsert(storageItem, data.data)
                await localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(storageItem))
                close()
                router.reload()
            }
        })
            .catch((ex) => {
                console.log(ex)
            })

    }

    const handleCode = (e) => {
        setCode2FA(e.target.value)
    }

    return (
        <Flex direction={'column'} align={'center'} w={'100%'} p={10} minW={1000}>
            <Heading mb={4}>Security verification</Heading>
            <Text color={'white'} fontWeight={'bold'} mb={4}>
                Enter your 6-digit authentication code below
            </Text>
            <VStack spacing={4} mb={10}>
                <Input width={300} placeholder='2FA code' onChange={handleCode} />
                <Button colorScheme={'teal'} width={300} onClick={() => {
                    verify()
                }}>Confirm</Button>
                {err == "" ? <></> : <Text color={'red.400'}>{err}</Text>}
            </VStack>
        </Flex>
    )
}