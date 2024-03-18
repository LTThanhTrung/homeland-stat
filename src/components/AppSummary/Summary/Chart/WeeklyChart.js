import { Flex } from '@chakra-ui/react'
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useRef } from 'react'
import { numberWithCommas } from '@/utils/tools'

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

    console.log(props.data)
    const x = []
    // const data = props.data.forEach(item => {

    // });


    const options = {
        chart: {
            backgroundColor: 'rgba(13,14,18,.7)',
            type: 'column',
            borderColor: '#334eff'
        },
        credits: {
            enabled: false
        },

        title: {
            text: undefined,
        },

        xAxis: {
            // categories: ['Gold', 'Silver', 'Bronze']
            categories: props.data.name
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: undefined
            },
            gridLineWidth: 0.5,
            gridLineDashStyle: 'longdash',
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 2);
                }
            }
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        },

        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b><br/>' + 'Count: <b>{point.stackTotal:,.2f}</b><br/>',
            // format: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
            //     `Total: {point.stackTotal}`
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            },
            series: {
                borderWidth: 0,
            }
        },

        series: [{
            name: 'Daily AXS',
            data: props.data.dailyAXS,
        }, {
            name: 'Moonfall',
            data: props.data.moonfall,
        }]
    }

    const chartComponentRef = useRef(null);

    return (
        <Flex mt={4}>
            {/* <LineChart width={730} height={150} data={props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type='linear' dataKey="dailyAXSPercent" stroke="#8884d8" name="daily mAXS" />
                <Line type="linear" dataKey="moonfallPercent" stroke="#82ca9d" name="moonfall" />
            </LineChart> */}


            {/* {props.data.length > 0 ?
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    ref={chartComponentRef}
                    {...props}
                /> : <></>} */}

            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
                {...props}
            />
        </Flex>
    )
}