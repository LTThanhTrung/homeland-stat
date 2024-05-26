import axios from "axios"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');

    try {
        let url = 'https://graphql-gateway.axieinfinity.com/graphql'
        let body = {
            "operationName": "GetMaterialDetail",
            "variables": {
                "tokenId": "1020847100762815390390123824494327889920"
            },
            "query": "query GetMaterialDetail($tokenId: String) {\n  erc1155Token(tokenType: Material, tokenId: $tokenId) {\n    ...Erc1155Metadata\n    minPrice\n    totalSupply: total\n    totalOwners\n    orders(from: 0, size: 1, sort: PriceAsc) {\n      totalListed: quantity\n      totalOrders: total\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment Erc1155Metadata on Erc1155Token {\n  attributes\n  description\n  imageUrl\n  name\n  tokenAddress\n  tokenId\n  tokenType\n  __typename\n}\n"
        }

        let data = (await axios.post(url, body)).data
        let price = data.data.erc1155Token.minPrice
        res.status(200).json(price)
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}