import axios from "axios"
import { formatDate, GameConfig } from "@/utils/tools"

export default async function handler(req, res) {
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

    logs.map((item) => {
        Object.keys(days).forEach(key => {
            if (item.created_at.startsWith(key)) {
                days[key][item.from_action] = (days[key][item.from_action] ? days[key][item.from_action] : 0) + item.axs_amount
                if (GameConfig.moonfall_action_id.includes(item.from_action)) {
                    days[key].moonfallAXS = days[key].moonfallAXS + item.axs_amount
                }
                else {
                    days[key].dailyAXS = days[key].dailyAXS + item.axs_amount
                }
            }
        })
    })

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
            moonfallAXS: 0
        }
    }

    return (result);
}