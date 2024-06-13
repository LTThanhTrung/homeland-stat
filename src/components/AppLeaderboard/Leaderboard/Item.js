import { Flex, Text } from '@chakra-ui/react'

export default function Item(props) {
    return (
        <>
            <Flex w={800}>
                <Flex w={100}>
                    <Text>{props.item.rank}</Text>
                </Flex>
                <Flex w={200}>
                    <Text>{props.item.plot_id % 1024 - 512}, {Math.round(props.item.plot_id / 1024 - 512)} </Text>
                </Flex>
                <Flex w={800}>
                    <Text>{props.item.owner_name}</Text>
                </Flex>
                <Flex w={100}><Text>{numberWithCommas(props.item.point)}</Text></Flex>
            </Flex>
        </>
    )

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}