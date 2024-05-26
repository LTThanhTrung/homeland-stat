export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    try {
        let { code } = JSON.parse(req.body)
        const url = 'https://athena.skymavis.com/oauth2'
        const client_id = process.env.NEXT_PUBLIC_APP_ID
        const client_secret = process.env.APP_SECRET
        const scope = 'openid'
        const userinfo_endpoint = 'https://athena.skymavis.com/userinfo'

        const tokenResponseData = await fetch(url + '/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: client_id,
                client_secret: client_secret,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: `${req.headers.origin}/oauth/callback`,
                scope: scope,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(response => response.json())

        const userResult = await fetch(userinfo_endpoint, {
            headers: {
                authorization: `Bearer ${tokenResponseData.access_token}`,
            },
        }).then(response => response.json())
        res.status(200).send({ success: true, accessToken: tokenResponseData.access_token, data: userResult })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}
