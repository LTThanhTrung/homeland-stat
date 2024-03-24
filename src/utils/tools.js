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
    moonfall_action_id: [91, 92, 93, 94],
    moonfall_amount: 6000
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