import { useState, useEffect } from 'react'
import { Flex, Text, Progress, ScaleFade, useDisclosure, Button, } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'


export default function QuestDetail({ item, questDetail, tags, setTags }) {
    const [flag, setFlag] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
    }, [])

    const handleTags = () => {
        setTags(questDetail.tags)
        handleOpacity()
    }


    useEffect(() => {
    }, [tags])

    const handleOpacity = () => {
        if (!questDetail.tags) questDetail.tags = []
        if (flag) return true
        if (isOpen) return true

        if (tags.length == 0) {
            return false
        }

        let set = new Set(tags)
        for (let i = 0; i < questDetail.tags.length; i++) {
            if (set.has(questDetail.tags[i])) {
                return false
            }
        }
        return true
    }

    return (
        <Flex
            w={'100%'}
            pos={'relative'}
            display={item.status == "Claimed" ? "none" : 'unset'}

            justify={'center'}
            align={'center'}
            mb={2}
            onMouseEnter={() => {
                onOpen()
            }}
            onMouseLeave={() => {
                onClose()
            }}
            cursor={'pointer'}
        >
            <Flex w={'100%'} position={'absolute'} top={0} h={'100%'} display={isOpen ? "flex" : "none"}>
                <ScaleFade initialScale={0.9} in={isOpen} style={{ height: "100%", width: "100%" }}>
                    <Flex
                        color='white'
                        w={'100%'}
                        h={'100%'}
                        justify={'flex-end'}
                        align={'center'}
                    >
                        <Button zIndex={2} size={'sm'} onClick={handleTags} opacity={'100% !important'} mr={2}>
                            Find Similar
                        </Button>
                        <Button zIndex={2} size={'sm'} onClick={() => { setTags([]) }} opacity={'100% !important'}>
                            Clear Tags
                        </Button>
                    </Flex>
                </ScaleFade>
            </Flex>
            <Flex w={'100%'} direction={'column'} opacity={handleOpacity() ? "0.1" : "unset"}
                onClick={() => { setFlag(!flag) }}
            >
                <Flex direction={'row'} align={'center'}  >
                    <StarIcon w={4} mr={2} color={'orange'} />
                    <Text fontSize={14} color={'white'} fontWeight={'bold'}>{questDetail._note.replace('{X}', questDetail.required_value)} ({item.progress}/{questDetail.required_value})</Text>
                </Flex>

                <Progress h={2} hasStripe value={item.progress / questDetail.required_value * 100} w={'100%'} colorScheme={item.status == "Claimable" ? "green" : "yellow"} background={'gray.500'} />
            </Flex>
        </Flex>)
}