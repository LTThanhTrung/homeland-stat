import axios from "axios"

export default async function handler(req, res) {
    try {
        let { account, plots } = req.body
        let url = `https://land-api.skymavis.com/insights/leaderboard/all/me`
        let plot_ids = plots.map(function (obj) {
            return obj.id;
        });
        let header = { 'Authorization': `Bearer ${account.gameToken}` }
        let response = (await axios.post(url, { plot_ids }, { headers: header })).data
        res.status(200).send({ success: true, data: response })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}