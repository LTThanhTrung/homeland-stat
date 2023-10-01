import { Flex, Tooltip, Button, Text , Box } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { StorageItem } from '@/utils/tools'
import { useRouter } from 'next/router'

export default function Account(props) {
    const router = useRouter()
    const colorMode = localStorage.getItem('chakra-ui-color-mode')

    const handleDelete = async () => {
        let accounts = await JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
        let newAccount = accounts.filter(item => item.userID != props.account.userID)
        await localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(newAccount))
        router.reload()
    }
    return (
        <Tooltip label={props.account.name}>
            <Flex
                minW={"40px"}
                minH={"40px"}
                mr={"8px"}
                bg={colorMode == 'dark' ? "blue.400" : "blue.100"}
                borderRadius={100}
                justifyContent={'center'}
                alignItems={'center'}
                position={'relative'}
            >
                <svg fill={colorMode == 'dark' ? "#ffffff" : "#000000"}
                    width="20px" height="20px" viewBox="0 0 575.616 575.616"
                >
                    <g>
                        <g>
                            <path d="M429.248,141.439C429.248,63.33,365.985,0,287.808,0c-78.109,0-141.439,63.33-141.439,141.439
			c0,78.11,63.33,141.439,141.439,141.439C365.988,282.878,429.248,219.549,429.248,141.439z M181.727,144.499
			c0,0-4.079-40.12,24.82-70.72c20.34,20.389,81.261,70.72,187.342,70.72c0,58.498-47.586,106.081-106.081,106.081
			S181.727,202.994,181.727,144.499z"/>
                            <path d="M45.049,391.68v62.559v80.919c0,22.365,18.136,40.459,40.459,40.459h404.6c22.365,0,40.459-18.097,40.459-40.459v-80.919
			V391.68c0-44.688-36.193-80.919-80.919-80.919H377.91c-5.07,0-11.46,3.422-14.271,7.639l-70.735,99.982
			c-2.812,4.22-7.372,4.22-10.184,0l-70.738-99.986c-2.812-4.22-9.202-7.638-14.272-7.638h-71.742
			C81.319,310.758,45.049,346.991,45.049,391.68z"/>
                        </g>
                    </g>
                </svg>
                <Flex
                    minW={"20px"}
                    minH={"20px"}
                    bg={"white"}
                    position={'absolute'}
                    top={"-7px"}
                    right={"-7px"}
                    align={'center'}
                    justify={'center'}
                    borderRadius={100}
                    cursor={'pointer'}
                    borderWidth={1}
                    borderColor={'red'}
                    onClick={handleDelete}>
                    <DeleteIcon width={3} color={'red'} />
                </Flex>
            </Flex>
        </Tooltip>
    )
}