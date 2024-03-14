import axios from "axios"
import { ethers } from 'ethers'

export default async function handler(req, res) {
    try {
        let { accessToken, gameToken, userID } = req.body.account

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
                let data = await getSelfPlots(offset, gameToken)
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
        offset = 0
        while (true) {
            try {
                let data = await getAssignedPlots(offset, gameToken)
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
        offset = 0
        while (true) {
            try {
                let data = await getDelegatedPlots(offset, gameToken)
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
        let pendingAXS = await getPendingAXS(gameToken)
        let balanceAXS = await getBalanceAXS(gameToken)

        res.status(200).send({ success: true, plots, claimAbleAXS, pendingAXS, balanceAXS })
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}

async function getAxs(accessToken, walletAddress) {
    try {
        const url = "https://distribution-reward-api.skymavis.com/public/v1/users/me/tokens/0x97a9107c1793bc407d6f527b77e7fff4d812bece?ref_service_code=land"
        let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })).data
        let total_amount = Number(response.total_amount)
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

async function getBalanceAXS(gameToken) {
    const url = `https://land-api.skymavis.com/insights/currency/balance`
    let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + gameToken } })).data
    return response.axs_amount
}

async function getPendingAXS(gameToken) {
    const url = `https://land-api.skymavis.com/insights/maxs/withdrawals`
    let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + gameToken } })).data
    let total = 0
    for (let i = 0; i < response.data.length; i++) {
        let created_at = response.data[i].created_at + "Z"
        let time = new Date(created_at).getTime() + 86400 * 4 * 1000

        if (response.data[i].status == 1 && Date.now() > time) break;
        total = total + response.data[i].axs_amount
    }

    return total
}

async function getSelfPlots(offset, gameToken) {
    const url = `https://land-api.skymavis.com/insights/plots/undelegated?order=asc&sort_by=plot_name&offset=${offset}&limit=100`
    let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + gameToken } })).data
    let hasNext = response.total > offset + 100
    let data = response.data
    let result = { hasNext: hasNext, data: data }
    return result
}

async function getAssignedPlots(offset, gameToken) {
    const url = `https://land-api.skymavis.com/insights/plots/assigned?order=asc&sort_by=plot_name&offset=${offset}&limit=100`
    let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + gameToken } })).data
    let hasNext = response.total > offset + 100
    let data = response.data
    let result = { hasNext: hasNext, data: data }
    return result
}

async function getDelegatedPlots(offset, gameToken) {
    const url = `https://land-api.skymavis.com/insights/plots/delegated?order=asc&sort_by=plot_name&offset=${offset}&limit=100`
    let response = (await axios.get(url, { headers: { 'Authorization': 'Bearer ' + gameToken } })).data
    let hasNext = response.total > offset + 100
    let data = response.data
    let result = { hasNext: hasNext, data: data }
    return result
}