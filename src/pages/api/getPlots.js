import axios from "axios"

export default async function handler(req, res) {
    try {
        let { accessToken } = req.body
        let plots = []
        let offset = 0
        while (true) {
            try {
                let data = await getPlots(offset, accessToken)
                plots = [...plots, ...data.data]
                if (data.hasNext) {
                    offset = offset + 100
                }
                else {
                    break;
                }
            }
            catch (ex) {
                console.log(ex)
                break;
            }
        }
        let claimAbleAXS = await getAxs(accessToken)
        res.status(200).send({ success: true, plots, claimAbleAXS : claimAbleAXS })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}

async function getAxs(accessToken){
    try {
        const url = 'https://distribution-reward-api.skymavis.com/public/v1/users/me/tokens/0x97a9107c1793bc407d6f527b77e7fff4d812bece'
        let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })).data
        let total_amount = response.total_amount
        return total_amount
    }
    catch {
        return 0
    }
}

async function getPlots(offset, accessToken) {
    const url = `https://land-api.skymavis.com/insights/plots/undelegated?order=asc&sort_by=plot_name&offset=${offset}&limit=100`
    let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })).data
    let hasNext = response.total > offset + 100
    let data = response.data
    let result = { hasNext: hasNext, data: data }
    return result
}