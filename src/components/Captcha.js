import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Captcha(props) {
    const [captcha, setCapcha] = useState({ "id": "", "image": "" })
    const [degree, setDegree] = useState(0)

    useEffect(() => {
        fetchImage()
    }, [])

    const fetchImage = async () => {
        const url = 'https://x.skymavis.com/captcha-srv/check'
        await axios.post(url, { 'app_key': '5a0eb357-db13-4911-a810-c1914c17bc6f' }).then((response) => {
            setCapcha(response.data)
        })
    }

    const changeDegree = (val) => {
        setDegree(degree + val)
    }

    const reset = () => {
        setCapcha({ "id": "", "image": "" })
        setDegree(0)
        fetchImage()
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
                    alert('Captcha OK')
                    props.setCaptcha(response.data.token)
                }
                else reset();
            }
            catch {
                reset();
            }
        })
    }

    return (
        <Flex direction={'column'} align={'center'} bg={'#15181e'} p={10}>
            <Text>
                Please rotate captcha otherwise no login for you ^.^
            </Text>
            <Flex direction={'row'}>
                <Image src='spin-left.svg' onClick={() => { changeDegree(30) }} cursor={'pointer'}></Image>
                <Image ml={10} mr={10} src={`data:image/png;base64, ` + captcha.image} style={{ 'transform': `rotate(${-degree}deg)` }}></Image>
                <Image src='spin-right.svg' onClick={() => { changeDegree(-30) }} cursor={'pointer'}></Image>
            </Flex>
            <Button onClick={submit}>
                Submit
            </Button>
        </Flex>
    )
}