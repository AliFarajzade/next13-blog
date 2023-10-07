import { NextPage } from 'next'
import Link from 'next/link'

const NotFound: NextPage = () => {
    return (
        <main className="fixed w-full min-h-screen inset-0 bg-slate-900 text-white z-10 grid place-content-center text-2xl text-center">
            Sorry, The page you are looking for does not exist.
            <Link href="/" className="underline text-blue-600 font-semibold">
                Go back home
            </Link>
        </main>
    )
}

export default NotFound
