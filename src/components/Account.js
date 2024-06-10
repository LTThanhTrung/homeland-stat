import {
    Flex,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    Text,
    Image,
    useDisclosure
} from '@chakra-ui/react'

import { StorageItem } from '@/utils/tools'
import { useRouter } from 'next/router'

export default function Account(props) {
    const router = useRouter()
    const { onToggle, onClose, isOpen } = useDisclosure()

    const handleDelete = async () => {
        let accounts = await JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
        let newAccount = accounts.filter(item => item.userID != props.account.userID)
        await localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(newAccount))
        router.reload()
    }
    return (
        <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
                <Tooltip label={props.account.name}>
                    <Flex
                        borderRadius={100}
                        borderWidth={4}
                        borderColor={"#755CF5"}
                        justifyContent={'center'}
                        alignItems={'center'}
                        position={'relative'}
                        onClick={onToggle}
                        height={12}
                        width={12}
                    >
                        <Image src='Mask group.png' borderRadius={100}/>
                    </Flex>
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>
                    <Text fontWeight={'bold'}>
                        {props.account.name}
                    </Text>
                </PopoverHeader>
                <PopoverBody>
                    <Flex direction={'row'} alignItems={'center'} onClick={handleDelete} cursor={'pointer'}>
                        <svg viewBox="0 0 256 256" width="16" height="16" fill='red'><path d="M112 216a8 8 0 0 1-8 8H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h56a8 8 0 0 1 0 16H48v160h56a8 8 0 0 1 8 8Zm109.66-93.66-40-40A8 8 0 0 0 168 88v32h-64a8 8 0 0 0 0 16h64v32a8 8 0 0 0 13.66 5.66l40-40a8 8 0 0 0 0-11.32Z"></path>
                        </svg>
                        <Text ml={4} fontWeight={'bold'}>Log out</Text>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}