import axios from "axios"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    try {
        let { account, plotData } = req.body
        let axsData = await getAXSData(plotData, account.gameToken)
        let landData = await getLandData(plotData, account.gameToken)
        res.status(200).send({ success: true, data: { axsData, landData } })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}

async function getAXSData(plotData, gameToken) {
    const url = `https://land-api.skymavis.com/insights/earning/logs_by_day?pid=${plotData.id}&offset=0&limit=96`
    let data = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + gameToken } })).data
    return data.data
}

async function getLandData(plotData, gameToken) {
    const url = `https://land-api.skymavis.com/insights/plots/stats`
    const body = [plotData.id]
    let data = (await axios.post(url, body, { headers: { 'Authorization': 'Bearer ' + gameToken } }))
    return data.data
}