import { Flex, Text, Image, HStack, Box, Progress } from '@chakra-ui/react'
import { PlotDetail, formatDate } from '@/utils/tools'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { GameConfig, MoonfallConfig } from '@/utils/tools'
import { InfoIcon } from '@chakra-ui/icons'
import questData from '@/utils/moonfall_quests.json'


export default function QuestItem({ item, account }) {

    const [quests, setQuests] = useState(item.quests.data.questData)

    const resetPlotData = async () => { 
        try {
            let questData = (await axios.post('/api/getQuest', { account: account, plotData: item })).data

            if(questData.success){
                setQuests(questData.data.questData)
            }
        }
        catch (ex) {
            console.log(ex)
            setItem(prev => ({ ...prev, loaded: true }))
        }
    }

    const renderQuest = () => {
        const renderItem = quests.map((item, index) => {
            let questDetail = questData.find(x => x.quest_config_id === item.quest_id)
            return (
                <Flex key={index} w={'100%'} pos={'relative'} display={item.status == "Claimed" ? "none" : 'unset'} justify={'center'} align={'center'} mb={2}>
                    <Text fontSize={13} color={'white'} fontWeight={'bold'}>{questDetail._note.replace('{X}', questDetail.required_value)} ({item.progress}/{questDetail.required_value})</Text>
                        <Progress h={2} hasStripe value={item.progress / questDetail.required_value * 100 } w={'100%'} colorScheme={item.status == "Claimable" ? "green" : "yellow" } background={'gray.500'} />
                        <Text fontWeight={'bold'} fontSize={12} position={'absolute'} right={0} bottom={0}></Text>
                </Flex>)
        })
        return renderItem
    }

    return (
        <Flex width={400} direction={'column'} align={'center'} p={5} shadow={'lg'} borderRadius={10} bg={'#13161b'} color={"#e2e4e9b3"} >
            <Flex height={24} w={64} p={4} justifyContent={'space-around'} alignItems={'center'} >
                <Flex w={"60px"} h={"60px"} borderRadius={100} bg={'lightblue'} justifyContent={'center'} align={'center'} pos={'relative'}>
                    <Image src={`/plot_${item.land_type}.png`} width={12} h={12} alt="Plot" />
                    <Box pos={'absolute'} bottom={0} right={0}>

                    </Box>
                </Flex>
                <Flex w={24} h={'100%'} flexDirection={'column'} >
                    <Box w={40} >
                        {item.steward ?
                            <Text fontSize={12} noOfLines={1} color={now.getTime() / 1000 > item.steward.expiry_timestamp ? "red" : "#A28C76"}>{item.steward.assignee_name}</Text>
                            : <></>}
                        <Flex direction={'row'} align={'center'} textAlign={'left'} >
                            {item.land_property == 0 ?
                                <Image src='icon-flat-landproperties-normal.png' w={4} h={4} /> : item.land_property == 1 ?
                                    <Image src='icon-flat-agriculture.png' w={4} h={4} /> :
                                    <Image src='filter-building-crafting.png' w={4} h={4} />}
                            <Text ml={1} noOfLines={2} fontSize={16} fontWeight={'bold'}>
                                {item.name.length > 0 ? item.name : "No Name"}
                            </Text>
                        </Flex>
                    </Box>

                    <Flex
                        height={8}
                        justify={'center'}
                        align={'center'}
                        borderRadius={10}
                        mt={1}
                        bg={PlotDetail[item.land_type].bg}  >
                        <Text color={"white"} fontWeight={'bold'}>{item.x};{item.y}</Text>
                    </Flex>
                </Flex>
                <Flex direction={'column'} h={'100%'} justify={'space-between'} align={'center'}>
                    <Image src='icon-flat-switch.png' w={7} right={4} top={4} alt={"refresh plots"} onClick={resetPlotData} cursor={"pointer"} />
                    <Text fontSize={14} fontWeight={'extrabold'}> LV. {item.townhall_level} </Text>
                </Flex>
            </Flex>
            <Flex direction={'column'} w={'100%'}>
                {renderQuest()}
            </Flex>
        </Flex>
    )
}