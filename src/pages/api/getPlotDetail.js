import axios from "axios"

export default async function handler(req, res) {
    try {
        let { accessToken, plotData } = req.body
        let response = await getPlotData(plotData, accessToken)
        res.status(200).send({ success: true, data: response })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}

async function getPlotData(plot, accessToken) {
    const url = `https://land-api.skymavis.com/insights/maxs/logs_by_day?pid=${plot.id}&offset=0&limit=100`
    let data = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })).data
    return data.data
}