// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
import { headers } from "../../../next.config"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    let { token, challenge, passcode } = req.body
    let url = "https://athena.skymavis.com/v2/public/users/me/settings/2fa/verify"

    try {
        let request = await axios.post(url, { challenge, passcode }, { headers: { "Authorization": `Bearer ${token}` } })
        if (request.status == 200) {
            let data = request.data
            res.status(200).json({ success: true, data: data })
        }
        else {
            res.status(200).json({ success: false, error: "Something went wrong" })
        }
    }
    catch (ex) {
        if (ex.response.data.error_message != undefined) {
            res.status(200).json({ success: false, error: ex.response.data })
        }
        else {
            res.status(200).json({ success: false, error: "Something went wrong" })
        }
    }
}