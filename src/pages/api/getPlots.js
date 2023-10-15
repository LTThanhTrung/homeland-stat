import axios from "axios"
import { ethers } from 'ethers'

export default async function handler(req, res) {
    try {
        let { accessToken, userID } = req.body

        let gql = {
            "query": `query MyQuery {\n  publicProfile(id: \"${userID}\") {\n    addresses {\n      ronin\n    }\n  }\n}`,
            "operationName": "MyQuery"
        }
        

        let walletRequest = (await axios.post('https://graphql-gateway.axieinfinity.com/graphql', gql)).data
        let walletAddress = walletRequest.data.publicProfile.addresses.ronin

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
        let claimAbleAXS = await getAxs(accessToken, walletAddress)
        res.status(200).send({ success: true, plots, claimAbleAXS: claimAbleAXS })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}

async function getAxs(accessToken, walletAddress) {
    try {
        const url = 'https://distribution-reward-api.skymavis.com/public/v1/users/me/tokens/0x97a9107c1793bc407d6f527b77e7fff4d812bece'
        let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })).data
        let total_amount = response.total_amount

        const provider = new ethers.JsonRpcProvider('https://api.roninchain.com/rpc')
        const rewardDistributorABI = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    }
                ],
                "name": "getTotalClaimed",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        const rewardDistributorContract = new ethers.Contract('0x193e04a8944d9aaa57abd2586b0c5c8044d21804', rewardDistributorABI, provider)
        const claimed = await rewardDistributorContract.getTotalClaimed(walletAddress, '0x97a9107c1793bc407d6f527b77e7fff4d812bece')

        total_amount = total_amount - Number(claimed)
        return total_amount
    }
    catch (ex) {
        console.log(ex)
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