import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { StorageItem } from '@/utils/tools'

export default function CallbackPage() {
    const [data, setData] = useState("")
    const router = useRouter()

    // Auto reconnect
    useEffect(() => {
        if (router.query.code) {
            fetchData()
        }
    }, [router.query])

    const fetchData = async () => {
        const code = router.query.code

        if (code != '' && code != undefined && code != null) {
            await fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify({ code: code }),
            }).then(response => response.json())
                .then((responseData) => {
                    if (responseData.success) {
                        localStorage.setItem(StorageItem.ACCESS_TOKEN, JSON.stringify(responseData.accessToken))
                        localStorage.setItem(StorageItem.USER_DATA, JSON.stringify(responseData.data))
                    }
                    setTimeout(() => {
                        router.push('/')
                    }, 1000);
                })
        }
    }

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center">
                {data == "" ? <>Loading</> :
                    <>
                        <p>{data.addr}</p>
                        <p>{data.email}</p>
                        <p>{data.iat}</p>
                        <p>{data.name}</p>
                    </>}
            </div>
        </>
    )
}
