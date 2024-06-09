// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    let url = 'https://exchange-rate.skymavis.com/axs'
    try {
        let request = await axios.get(url)
        if (request.status == 200) {
            res.status(200).json({ success: true, data: request.data })
        }
        else {
            res.status(200).json({ success: false, error: "Something went wrong" })
        }
    }
    catch (ex) {
        if (ex.response.data.error_message != undefined) {
            res.status(200).json({ success: false, error: ex.response.data.error_message })
        }
        else {
            res.status(200).json({ success: false, error: "Something went wrong" })
        }
    }
}