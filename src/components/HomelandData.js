import { useEffect, useState } from "react"
import axios from 'axios';
import { Image, Text, Flex } from '@chakra-ui/react'

export default function HomelandData(props) {
    const [plots, setPlots] = useState()

    useEffect(() => {
        const fetchData = async () => {
            let accessToken = props.accessToken
            await axios.post('/api/getPlots', { accessToken }).then((response) => {
                let data = response.data
                if (data.success) {
                    setPlots(data.plots)
                }
            })
        }

        fetchData()
    }, [])

    const renderPlot = () => {
        if (plots != undefined) {
            let renderItem = plots.map((item, index) => {
                return (
                    <Flex key={index} direction={'row'} justify={'space-between'} align={'center'}>
                        <Image src={`/plot_${item.land_type}.webp`} width={16} alt="Plot" />
                        <Text ml={4}>{item.name}:</Text>
                        <Text ml={6}>{item.plotData.reduce(function(sum, item){
                            return sum + item.amount
                        }, 0) / 1000}</Text>
                        <Text> / {item.land_type == 0 ? 16 : item.land_type == 1 ? 52 : item.land_type == 2 ? 148 : item.land_type == 3 ? 328 : 6540 }</Text>
                    </Flex>
                )
            })
            return renderItem
        }

        else {
            return
        }

    }


    return (
        <>{renderPlot()}</>
    )
}