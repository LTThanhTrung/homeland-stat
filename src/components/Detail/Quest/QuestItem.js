import { useState } from 'react'
import { Flex, Text, Image, Box } from '@chakra-ui/react'

import axios from 'axios'
import { PlotDetail } from '@/utils/tools'
import questData from '@/utils/moonfall_quests.json'
import QuestDetail from './QuestDetail'

export default function QuestItem({ item, account, tags, setTags }) {
    const [quests, setQuests] = useState(item.quests.data.questData)

    const resetPlotData = async () => {
        try {
            let questData = (await axios.post('/api/getQuest', { account: account, plotData: item })).data

            if (questData.success) {
                setQuests(questData.data.questData)
            }
        }
        catch (ex) {
            console.log(ex)
        }
    }

    const renderQuest = () => {
        const renderItem = quests.map((item, index) => {
            let questDetail = questData.find(x => x.quest_config_id === item.quest_id)
            return (
                <QuestDetail key={index} item={item} questDetail={questDetail} tags={tags} setTags={setTags} />
            )
        })
        return renderItem
    }

    return (
        <Flex width={"100%"} direction={'column'} align={'center'} p={5} shadow={'lg'} borderRadius={10} bg={'#13161b'} color={"#e2e4e9b3"}>
            <Flex height={24} w={64} p={4} justifyContent={'space-around'} alignItems={'center'} >
                <Flex w={"60px"} h={"60px"} borderRadius={100} bg={'lightblue'} justifyContent={'center'} align={'center'} pos={'relative'}>
                    <Image src={`/plot_${item.land_type}.png`} width={12} h={12} alt="Plot" />
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