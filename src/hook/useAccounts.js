import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import { StorageItem, upsert } from '@/utils/tools'

const useAccount = () => {
    const router = useRouter()
    const [accounts, setAccounts] = useState([])

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

    useEffect(() => {
        const getItemsFromStorage = async () => {
            let accounts = JSON.parse(localStorage.getItem(StorageItem.ACCOUNTS_DATA))
            let now = new Date().getTime()

            if (accounts == "" || accounts == null || accounts == undefined || accounts.length == 0) {
                if(router.pathname != "/"){
                    router.push('/')
                }
                return
            }

            for (let i = 0; i < accounts.length; i++) {
                if (now > new Date(accounts[i].accessTokenExpiresAt).getTime()) {
                    let tokenData = await refreshToken(accounts[i].refreshToken)
                    if (tokenData) {
                        accounts = upsert(accounts, tokenData)
                        localStorage.setItem(StorageItem.ACCOUNTS_DATA, JSON.stringify(accounts))
                    }
                }
            }

            setAccounts(accounts)
        }
        getItemsFromStorage()

    }, [])

    return { accounts, logout }

}

export default useAccount

