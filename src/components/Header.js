import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    Flex,
    Heading,
    HStack,
    Text,
    Link,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import packageInfo from '../../package.json';
import Account from './Account';
import useAccount from '@/hook/useAccounts';
import Login from './Login/Login';

export default function Header() {
    const router = useRouter()
    const { accounts, logout } = useAccount()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const renderAccount = () => {
        if (accounts.length > 0) {
            let renderItems = accounts.map((account, index) => {
                return (
                    <>
                        <Account account={account} key={index} />
                    </>
                )
            })
            return renderItems
        }
    }

    return (
        <>
            <Head>
                <title>Homeland Stats</title>
                <meta name="description" content="Tracker website for Homeland" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon-axie-happy.png" />
            </Head>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'gray.800'}>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Login close={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Flex direction={'row'} align={'center'} bg={"#13161b"} w={'100%'} justify={'space-between'} padding={4} color={'white'}>
                <Heading size={'lg'} mr={4}>Homeland Stats {packageInfo.version}  </Heading>
                <Flex flex={1} justify={'center'} align={'center'}>
                    <HStack spacing={6}>
                        <Link href={"/"}>
                            <Button bg={'#282c34'} _hover={{ background: "#3c424d" }}>
                                <Text color={'white'} fontWeight={'bold'} >Summary</Text>
                            </Button>
                        </Link>
                        <Link href={"/detail"}>
                            <Button bg={'#282c34'} _hover={{ background: "#3c424d" }}>
                                <Text color={'white'} fontWeight={'bold'} >Detail</Text>
                            </Button>
                        </Link>
                        <Link href={"/leaderboard"}>
                            <Button bg={'#282c34'} _hover={{ background: "#3c424d" }}>
                                <Text color={'white'} fontWeight={'bold'} >Leaderboard</Text>
                            </Button>
                        </Link>
                        <Link href={"/"} _disabled={true}>
                            <Text fontWeight={'bold'}>??</Text>
                        </Link>
                    </HStack>
                </Flex>
                <HStack alignSelf={'flex-end'} right={12} justify={'center'} align={'center'} spacing={4}>
                    <Flex flexDirection={'row'} overflow={'auto'} whiteSpace={'nowrap'} pt={2}>
                        <Flex marginLeft={'auto'}>
                            {renderAccount()}
                        </Flex>
                    </Flex>
                    <Button
                        bg={"#ff9345"}
                        color={"white"}
                        onClick={() => {
                            onOpen()
                        }}>Login</Button>
                    <Button
                        bg={"#282c34"}
                        color={"white"}
                        onClick={() => {
                            logout()
                        }}>Log out</Button>
                </HStack>
            </Flex>
        </>
    )
}