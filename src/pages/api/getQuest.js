import axios from "axios"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    try {
        let { account, plotData } = req.body
        let questData = await getQuestData(plotData, account)
        console.log(questData)
        res.status(200).send({ success: true, data: { questData } })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}

async function getQuestData(plotData, account) {
    try {
        if (account.steward == undefined) {
            const url = `https://land-api.skymavis.com/insights/moonfall/quest-progress?pid=${plotData.id}`
            let data = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + account.gameToken } })).data
            return data
        }
    }
    catch(ex){
        console.log(ex)
    }
}