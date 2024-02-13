import { Flex } from '@chakra-ui/react'
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

export default function WeeklyChart(props) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`mAXS: ${payload[0].payload.dailyAXS / 1000}`}</p>
                    <p className="label">{`moonfall: ${payload[0].payload.moonfall / 1000}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Flex mt={4}>
            <LineChart width={730} height={150} data={props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type='linear' dataKey="dailyAXSPercent" stroke="#8884d8" name="daily mAXS" />
                <Line type="linear" dataKey="moonfallPercent" stroke="#82ca9d" name="moonfall" />
            </LineChart>
        </Flex>
    )
}