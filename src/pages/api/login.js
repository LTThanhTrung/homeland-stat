// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"

export default async function handler(req, res) {
    let { email, password } = req.body
    let url = 'https://athena.skymavis.com/v2/public/auth/login'
    try {
        let request = await axios.post(url, { email, password })
        console.log(request.status)
        if (request.status == 200) {
            console.log(request.data)
            res.status(200).json({ success: true, accessToken: request.data.accessToken })
        }
        else {
            res.status(200).json({ success: false, error: "Something went wrong" })
        }
    }
    catch (ex) {
        res.status(200).json({ success: false, error: ex.message })
    }
}