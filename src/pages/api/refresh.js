// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"

export default async function handler(req, res) {
    let { refreshToken } = req.body
    console.log(refreshToken)
    let url = 'https://athena.skymavis.com/v2/public/auth/token/refresh'

    try {
        let request = await axios.post(url, { refreshToken })
        if (request.status == 200) {
            let data = request.data
            let userID = request.data.userID

            let nameData = await axios.post('https://graphql-gateway.axieinfinity.com/graphql',
                {
                    "query": `query MyQuery {\n  publicProfile(id: \"${userID}\") {\n    name\n  }\n}`,
                    "operationName": "MyQuery"
                }
            )

            data.name = nameData.data.data.publicProfile.name
            res.status(200).json({ success: true, data: data })
        }
        else {
            res.status(200).json({ success: false, error: "Something went wrong" })
        }
    }
    catch (ex) {
        console.log(ex)
        if(ex.response.data.error_message != undefined){
            res.status(200).json({ success: false, error: ex.response.data.error_message })
        }
        else{
            res.status(200).json({ success: false, error: "Something went wrong" })
        }
    }
}