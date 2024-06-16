import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import { uuid } from 'uuidv4'
import { StorageItem, upsert, track } from '@/utils/tools'

const useAccount = () => {
    const router = useRouter()
    const [accounts, setAccounts] = useState([])
    const count = useRef(0)

    const refreshToken = async (refreshToken) => {
        let data = (await axios.post('/api/refresh', { refreshToken: refreshToken })).data
        if (data.success) {
            return data.data
        }
    }

    const logout = () => {
        localStorage.clear()
        setAccounts([])
        router.reload()
    }

    const sendHeartBeats = (accountsStorage) => {
        setInterval(() => {
            count.current = count.current + 1
            try {
                for (let i = 0; i < accountsStorage.length; i++) {
                    track({
                        "events": [
                            {
                                "type": "heartbeat",
                                "data": {
                                    "uuid": uuid(),
                                    "ref": "root",
                                    "timestamp": new Date().toISOString(),
                                    "session_id": accountsStorage[i].sessionID,
                                    "user_id": accountsStorage[i].userID,
                                    "offset": count.current,
                                    "device_name": navigator.userAgent
                                }
                            }
                        ]
                    })
                }
            }
            catch (ex) {
                return
            }

        }, 60000);
    }

    useEffect(() => {
        const getItemsFromStorage = async () => {
            let accountsStorage = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
            let now = new Date().getTime()

            if (accountsStorage == "" || accountsStorage == null || accountsStorage == undefined || accountsStorage.length == 0) {
                if (router.pathname != "/") {
                    router.push('/')
                }
                return
            }

            for (let i = 0; i < accountsStorage.length; i++) {
                if (now > new Date(accountsStorage[i].accessTokenExpiresAt).getTime()) {
                    let tokenData = await refreshToken(accountsStorage[i].refreshToken)
                    if (tokenData) {
                        accountsStorage = upsert(accountsStorage, tokenData)
                        localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(accountsStorage))
                    }
                }
            }

            for (let i = 0; i < accountsStorage.length; i++) {
                accountsStorage[i].sessionID = uuid()
                track({
                    "events": [
                        {
                            "type": "identify",
                            "data": {
                                "uuid": uuid(),
                                "ref": "root",
                                "timestamp": new Date().toISOString(),
                                "session_id": accountsStorage[i].sessionID,
                                "user_id": accountsStorage[i].userID,
                                "offset": count.current,
                                "device_name": navigator.userAgent
                            }
                        }
                    ]
                })
            }
            setAccounts(accountsStorage)

            setTimeout(() => {
                sendHeartBeats(accountsStorage)
            }, 60000);
        }
        getItemsFromStorage()
    }, [])

    return { accounts, logout }
}

export default useAccount

