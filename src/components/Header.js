import Head from 'next/head'

export default function Header() {
    return (
        <Head>
            <title>Homeland Stats</title>
            <meta name="description" content="Homeland tracker" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}