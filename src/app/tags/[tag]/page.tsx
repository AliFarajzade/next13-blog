import PostItem from '@/components/post-item.component'
import { getPostsMeta } from '@/lib/md-parser.util'
import { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 10

interface IProps {
    params: {
        tag: string
    }
}

export async function generateStaticParams() {
    const posts = await getPostsMeta()

    if (posts === undefined) return []

    const tags = new Set(posts.map(post => post.tags).flat())

    return Array.from(tags).map(tag => ({
        tag,
    }))
}

export function generateMetadata({ params: { tag } }: IProps): Metadata {
    return {
        title: `Posts about ${tag}`,
    }
}

const Page = async ({ params: { tag } }: IProps) => {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>

    const tagPosts = posts.filter(post => post.tags.includes(tag))

    if (!tagPosts.length) {
        return (
            <div className="text-center">
                <p className="mt-10">Sorry, no posts for that keyword.</p>
                <Link href="/">Back to Home</Link>
            </div>
        )
    }

    return (
        <>
            <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
            <section className="mt-6 mx-auto max-w-2xl">
                <ul className="w-full list-none p-0">
                    {tagPosts.map(post => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Page
