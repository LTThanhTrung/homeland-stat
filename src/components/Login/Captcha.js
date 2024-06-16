import { Spinner, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { StorageItem } from '@/utils/tools'

export default function Captcha({ onClose, setError, setCaptcha, setmfaToken }) {
    const router = useRouter()
    const [captcha, setCapcha] = useState({ "id": "", "image": "" })
    const [degree, setDegree] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchImage()
    }, [])

    const fetchImage = async () => {
        const url = 'https://x.skymavis.com/captcha-srv/check'
        await axios.post(url, { 'app_key': '5a0eb357-db13-4911-a810-c1914c17bc6f' }).then((response) => {
            setCapcha(response.data)
            setLoading(false)
        })
    }

    const changeDegree = (val) => {
        setDegree(degree + val)
    }

    const submit = async () => {
        const url = 'https://x.skymavis.com/captcha-srv/submit'
        let finalDegree = degree % 360
        finalDegree = finalDegree >= 0 ? finalDegree : 360 + finalDegree
        await axios.post(url, {
            app_key: "5a0eb357-db13-4911-a810-c1914c17bc6f",
            id: captcha.id,
            result: finalDegree
        }).then((response) => {
            try {
                if (response.data.result.status == "right") {
                    setCaptcha(response.data.token)
                }
                else {
                    setError("Captcha is wrong")
                    onClose()
                }
            }
            catch (ex) {
                setError(ex.error_message)
                onClose()
            }
        })
    }

    return (
        <Flex direction={'column'} align={'center'} bg={'#15181e'} w={'100%'} p={10}>
            {loading ?
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                /> :
                <>
                    <Text color={'white'} fontWeight={'bold'}>
                        Rotate this Axie until it stands like normal with its feet on the ground.
                    </Text>
                    <Flex direction={'row'}>
                        <Image src='spin-left.svg' onClick={() => { changeDegree(30) }} cursor={'pointer'}></Image>
                        <Image ml={10} mr={10} src={`data:image/png;base64, ` + captcha.image} style={{ 'transform': `rotate(${-degree}deg)` }}></Image>
                        <Image src='spin-right.svg' onClick={() => { changeDegree(-30) }} cursor={'pointer'}></Image>
                    </Flex>
                    <Button onClick={submit} borderRadius={20}>
                        Confirm
                    </Button>
                </>}
        </Flex>
    )
}