import axios from "axios"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    try {
        let { account, plotData } = req.body
        let response = await getPlotData(plotData, account.gameToken)
        res.status(200).send({ success: true, data: response })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}

async function getPlotData(plot, gameToken) {
    const url = `https://land-api.skymavis.com/insights/earning/logs_by_day?pid=${plot.id}&offset=0&limit=96`
    let data = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + gameToken } })).data
    return data.data
}