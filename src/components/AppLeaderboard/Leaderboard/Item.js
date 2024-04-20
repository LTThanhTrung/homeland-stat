import { Flex, Text } from '@chakra-ui/react'

export default function Item(props) {
    return (
        <>
            <Flex w={800}>
                <Flex w={100}>
                    <Text>{props.rank}</Text>
                </Flex>
                <Flex w={800}>
                    <Text>{props.owner_name}</Text>
                </Flex>
                <Flex w={100}><Text>{numberWithCommas(props.point)}</Text></Flex>
            </Flex>
        </>
    )

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}