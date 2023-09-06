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

        for(let i = 0 ; i < plots.length ; i ++){
            let plot = plots[i]
            let plotData = await getPlotData(plot, accessToken)
            console.log(plotData)
            plots[i].plotData = plotData
        }   
        res.status(200).send({ success: true, plots })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
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

async function getPlotData(plot, accessToken){
    const url = `https://land-api.skymavis.com/insights/maxs/logs_by_day?pid=${plot.id}&offset=0&limit=100`
    let data = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })).data
    return data.data
}