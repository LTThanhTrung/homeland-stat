import { Flex } from "@chakra-ui/react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useRef, useEffect, useState } from "react"

export default function WeeklyChart(props) {
    const [options, setOptions] = useState()

    useEffect(() => {
        if (props.data) {
            let data = {
                "name": [],
                "name": [],
                "dailyAXS": [],
                "dailyAXSPercent": [],
                "moonfall": [],
                "moonfallPercent": [],
                "1": [],
                "2": [],
                "3": [],
                "4": [],
                "91": [],
                "92": [],
                "93": [],
                "94": []
            }
            
            let keys = Object.keys(props.data)

            for (let i = 0; i < keys.length; i++) {
                data.name.push(keys[i].slice(5))
                data["1"].push(Math.round(props.data[keys[i]]["1"] / 1000 / 1000 * 1000) / 1000)
                data["2"].push(Math.round(props.data[keys[i]]["2"] / 1000 / 1000 * 1000) / 1000)
                data["3"].push(Math.round(props.data[keys[i]]["3"] / 1000 / 1000 * 1000) / 1000)
                data["4"].push(Math.round(props.data[keys[i]]["4"] / 1000 / 1000 * 1000) / 1000)
                data.dailyAXS.push(Math.round(props.data[keys[i]].dailyAXS / 1000 / 1000 * 1000) / 1000)
                data.moonfall.push(props.data[keys[i]].moonfallAXS / 1000 / 1000)
            }

            let options = {
                chart: {
                    backgroundColor: "rgba(13,14,18,.7)",
                    type: "column",
                    borderColor: "#334eff"
                },
                credits: {
                    enabled: false
                },

                title: {
                    text: undefined,
                },

                xAxis: {
                    // categories: ["Gold", "Silver", "Bronze"]
                    categories: data.name
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: undefined
                    },
                    gridLineWidth: 0.5,
                    gridLineDashStyle: "longdash",
                    labels: {
                        formatter: function () {
                            return Highcharts.numberFormat(this.value, 2);
                        }
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    }
                },
                lang: {
                    decimalPoint: ",",
                    thousandsSep: "."
                },

                tooltip: {
                    pointFormat: "{series.name}: <b>{point.y}</b><br/>" + "Total: <b>{point.stackTotal:,.2f}</b><br/>",
                },

                plotOptions: {
                    column: {
                        stacking: "normal",
                        dataLabels: {
                            enabled: false,
                            color: '#FFFFFF'
                        }
                    },
                    series: {
                        borderWidth: 0,
                    }
                },

                series: [{
                    name: "Crafting",
                    data: data["1"],
                    stack: "Regular",
                    color: "#fd7f6f"
                },
                {
                    name: "Gathering",
                    data: data["2"],
                    stack: "Regular",
                    color: "#7eb0d5"
                },
                {
                    name: "Production",
                    data: data["3"],
                    stack: "Regular",
                    color: "#b2e061"
                },
                {
                    name: "Battle",
                    data: data["4"],
                    stack: "Regular",
                    color: "#bd7ebe"
                },
                {
                    name: "Moonfall",
                    data: data.moonfall,
                    stack: "Moonfall",
                    color: "#0d88e6"
                }]
            }

            setOptions(options)
        }

    }, [props])




    const chartComponentRef = useRef(null);

    return (
        <Flex mt={4}>
            {options ?
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    ref={chartComponentRef}
                    {...props}
                /> : <></>}
        </Flex>
    )
}