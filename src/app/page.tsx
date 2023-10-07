import PostList from '@/components/post-list.component'
import { NextPage } from 'next'

const Page: NextPage = () => {
    return (
        <main className="px-6 mx-auto">
            <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
                Hello and Welcome 👋&nbsp;
                <span className="whitespace-nowrap">
                    I&apos;m <span className="font-bold">Ali</span>.
                </span>
            </p>
            <PostList />
        </main>
    )
}

export default Page
