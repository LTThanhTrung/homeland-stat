const axios = require('axios').default

export const StorageItem = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    USER_DATA: 'USER_DATA',
    ACCOUNTS_DATA: 'ACCOUNTS_DATA',
}

export const PlotDetail = {
    "0": {
        dailyAXS: 43,
        name: "Savannah",
        bg: "#dd8a0e"
    },
    "1": {
        dailyAXS: 139,
        name: "Forest",
        bg: "#91b80f"
    },
    "2": {
        dailyAXS: 396,
        name: "Arctic",
        bg: "#87c4ed"
    },
    "3": {
        dailyAXS: 878,
        name: "Mystic",
        bg: "#4f9fb0"
    },
    "4": {
        dailyAXS: 17495,
        name: "Genesis",
        bg: "#12557a"
    }
}

export const GameConfig = {
    moonfall_action_id: [41, 42, 43, 91, 92, 93, 94],
    moonfall_amount: [20000, 5000, 1000, 6000, 6000, 6000, 6000]
}

export const MoonfallConfig = {
    "41": {
        "label": "Extra Chest",
        "icon": "/chest_extra.png",
        "axs_amount": 20000
    },
    "42": {
        "label": "Premium Chest",
        "icon": "/chest_premium.png",
        "axs_amount": 5000
    },
    "43": {
        "label": "Common Chest",
        "icon": "/chest_common.png",
        "axs_amount": 1000
    },
    "91": {
        "axs_amount": 6000
    },
    "92": {
        "axs_amount": 6000
    },
    "93": {
        "axs_amount": 6000
    },
    "94": {
        "axs_amount": 6000
    }
}

export function formatDate(date) {
    var dd = date.getUTCDate();
    var mm = date.getUTCMonth() + 1;
    var yyyy = date.getUTCFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    date = `${yyyy}-${mm}-${dd}`
    return date
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const upsert = (array, item) => {
    if (array == null) array = []
    let i = array.findIndex(_item => _item.userID == item.userID)
    if (i > -1) array[i] = item
    else array.push(item)
    return array
}

export function track(data) {
    const url = 'https://x.skymavis.com/track'
    const body = data

    const header = {
        "Authorization": "Basic OTc1YmExYjItMmEyYi00YWM4LWJkN2MtMjZhYjczZDJmMzljOg==",
        "Content-Type": "application/json"
    }

    axios.post(url, body, { headers: header })
}