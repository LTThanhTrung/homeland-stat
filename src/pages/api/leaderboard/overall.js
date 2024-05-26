import axios from "axios"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    try {
        let { account, offset } = req.body
        let url = `https://land-api.skymavis.com/insights/leaderboard/all?offset=${offset}&limit=100`
        let header = { 'Authorization': `Bearer ${account.gameToken}` }
        let response = (await axios.get(url, { headers: header })).data
        res.status(200).send({ success: true, data: response })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}