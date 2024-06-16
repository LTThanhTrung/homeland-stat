

  import axios from "axios"

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=1');
    try {
        let body = {"operationName":"GetAxieBriefList","variables":{"from":0,"sort":"PriceAsc","size":1,"auctionType":"Sale","criteria":{"bodyShapes":null,"breedCount":null,"classes":null,"numJapan":null,"numMystic":null,"numShiny":null,"numSummer":null,"numXmas":null,"parts":null,"ppAquatic":null,"ppBeast":null,"ppBird":null,"ppBug":null,"ppDawn":null,"ppDusk":null,"ppMech":null,"ppPlant":null,"ppReptile":null,"pureness":null,"purity":null,"stages":null,"title":["Origin"],"primaryColor":null,"level":null,"numStage2Parts":null}},"query":"query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(\n    auctionType: $auctionType\n    criteria: $criteria\n    from: $from\n    sort: $sort\n    size: $size\n    owner: $owner\n  ) {\n    total\n    results {\n      ...AxieBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  genes\n  newGenes\n  hasMysticSuit\n  axpInfo {\n    ...AxpInfo\n    __typename\n  }\n  battleInfo {\n    banned\n    __typename\n  }\n  order {\n    id\n    currentPrice\n    currentPriceUsd\n    startedAt\n    __typename\n  }\n  parts {\n    id\n    name\n    class\n    type\n    specialGenes\n    __typename\n  }\n  equipmentInstances {\n    ...EquipmentInstance\n    __typename\n  }\n  __typename\n}\n\nfragment EquipmentInstance on EquipmentInstance {\n  id: tokenId\n  tokenId\n  owner\n  equipmentId\n  alias\n  equipmentType\n  slot\n  name\n  rarity\n  collections\n  equippedBy\n  __typename\n}\n\nfragment AxpInfo on AxpInfo {\n  level\n  nextOnchainLevel\n  onchainLevel\n  shouldAscend\n  xp\n  xpToLevelUp\n  __typename\n}\n"}

        let url = 'https://graphql-gateway.axieinfinity.com/graphql'
        let data = (await axios.post(url, body)).data
        let price = data.data.axies.results[0].order.currentPrice
        res.status(200).json(price)
    } catch (error) {
        res.status(200).json({ success: false, error: error instanceof Error ? error.message : error })
    }
}