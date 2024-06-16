import Header from "./Header"
import Footer from "./Footer"
import { Flex } from "@chakra-ui/react"

export default function Layout({ children }) {
    return (
        <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
            <Header />
            <Flex flex={1} p={10}>
            {children}
            </Flex>
            <Footer />
        </Flex>
    )
}