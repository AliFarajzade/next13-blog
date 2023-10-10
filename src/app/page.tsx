import PostList from '@/components/post-list.component'
import { NextPage } from 'next'

const Page: NextPage = () => {
    return (
        <div className="mx-auto">
            <p className="mt-12 mb-12 text-3xl text-center text-white">
                Hello and Welcome 👋&nbsp;
                <span className="whitespace-nowrap">
                    I'm <span className="font-bold">Ali</span>.
                </span>
            </p>
            <PostList />
        </div>
    )
}

export default Page
