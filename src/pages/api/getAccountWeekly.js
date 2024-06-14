import axios from "axios"
import { formatDate, GameConfig, MoonfallConfig } from "@/utils/tools"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    try {
        let { account } = req.body
        let response = await getPlotData(account.gameToken)
        res.status(200).send({ success: true, data: response })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}

async function getPlotData(gameToken) {
    let days = Last7Days()
    let logs = []
    for (let i = 0; i < 100; i++) {
        let data = await fetchData(i, gameToken)
        logs = logs.concat(data.data)
        if (data.hasNext == false) {
            break;
        }
    }

    try {
        logs.map((item) => {
            Object.keys(days).forEach(key => {
                if (item.created_at.startsWith(key)) {
                    days[key][item.from_action] = (days[key][item.from_action] ? days[key][item.from_action] : 0) + item.axs_amount
                    if (GameConfig.moonfall_action_id.includes(item.from_action)) {
                        console.log(item.axs_amount)
                        console.log(MoonfallConfig[item.from_action].axs_amount)
                        days[key].moonfallAXS = days[key].moonfallAXS + item.axs_amount
                        days[key].moonfall[item.from_action] = days[key].moonfall[item.from_action] + item.axs_amount / MoonfallConfig[item.from_action].axs_amount / 1000
                    }
                    else {
                        days[key].dailyAXS = days[key].dailyAXS + item.axs_amount
                    }
                }
            })
        })
    }

    catch(ex){
        console.log(ex)
    }
    

    return days
}

async function fetchData(index, gameToken) {
    let url = `https://land-api.skymavis.com/insights/earning/logs_by_week?offset=${index * 100}&limit=100`
    let response = (await axios.get(url, { headers: { 'Authorization': `Bearer ${gameToken}` } })).data
    let data = response.data
    return { hasNext: data.length == 100 ? true : false, data }
}



function Last7Days() {
    var result = {};
    for (var i = 6; i >= 0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result[formatDate(d)] = {
            dailyAXS: 0,
            moonfallAXS: 0,
            moonfall: {
                '41': 0,
                '42': 0,
                '43': 0
            }
        }
    }

    return (result);
}